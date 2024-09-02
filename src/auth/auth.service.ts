import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { access } from 'fs';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'; // Import bcrypt
import e from 'express';
import { getAllRoles } from 'src/utils/getroles';
import { DatabaseService } from 'src/database/database.service';

type SignInData = {
  id: number;
  email: string;
  agenceId: number;
  posteId: number;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user =
      (await this.userService.findUserByEmail(login)) ||
      (await this.userService.findUserByPhone(login)) ||
      (await this.userService.findUserByUsername(login));

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async authenticate(login: string, password: string): Promise<any> {
    const user = await this.validateUser(login, password);
    if (user) return this.signIn(user);
  }

  async signIn(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      agenceId: user.agenceId,
      posteId: user.posteId,
      employeeId: user.employeeId,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    const roles = await getAllRoles(
      this.databaseService,
      user.id,
      user.posteId,
    );

    return {
      accessToken,
      employeeId: user.employeeId,
      employeeName: `${user.firstName} ${user.lastName}`,
      userId: user.id,
      agenceId: user.agenceId,
      roles,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.userService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException();
      }

      const newAccessToken = await this.jwtService.signAsync({
        email: user.email,
        sub: user.id,
        agenceId: user.agenceId,
        posteId: user.posteId,
        employeeId: user.employeeId,
      });

      return { accessToken: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

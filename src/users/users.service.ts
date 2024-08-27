import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userWithHashedPassword = {
      ...createUserDto,
      username: `${createUserDto.firstName}-${createUserDto.lastName}-${createUserDto.employeeId}`,
      password: hashedPassword,
    };
    return this.databaseService.user.create({ data: userWithHashedPassword });
  }

  async findAll() {
    const users = await this.databaseService.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        isActive: true,
        posteId: true,
        agenceId: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
        companyId: true,
      },
    });

    return users;
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        isActive: true,
        posteId: true,
        agenceId: true,
        createdAt: true,
        updatedAt: true,
        createdBy: true,
        companyId: true,
        employeeId: true,
      },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({ where: { id } });
  }

  async findUserByEmail(login: string) {
    return this.databaseService.user.findUnique({
      where: { email: login },
    });
  }

  async findUserByUsername(login: string) {
    return this.databaseService.user.findUnique({
      where: { username: login },
    });
  }

  async findUserByPhone(login: string) {
    return this.databaseService.user.findUnique({
      where: { phone: login },
    });
  }
}

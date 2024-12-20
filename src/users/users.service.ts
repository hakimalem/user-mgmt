import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { CreateUserDTO } from './dto/createUserDTO';
import { UpdateUserDTO } from './dto/updateUserDTO';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDTO, request) {
    const createdBy = request.user.userId;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userWithHashedPassword = {
      ...createUserDto,
      username: `${createUserDto.firstName}-${createUserDto.lastName}-${createUserDto.employeeId}`,
      password: hashedPassword,
    };

    return this.databaseService.user.create({
      data: { ...userWithHashedPassword, createdBy },
    });
  }

  async findAll() {
    const users = await this.databaseService.user.findMany({
      select: this.getUserSelection(),
      where: { deletedAt: null },
    });

    return users;
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id, deletedAt: null },
      select: this.getUserSelection(),
    });
  }

  async update(id: number, updateUserDto: UpdateUserDTO) {
    return this.databaseService.user.update({
      where: { id, deletedAt: null },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findUserByEmail(login: string) {
    return this.databaseService.user.findUnique({
      where: { email: login, deletedAt: null },
    });
  }

  async findUserByUsername(login: string) {
    return this.databaseService.user.findUnique({
      where: { username: login, deletedAt: null },
    });
  }

  async findUserByPhone(login: string) {
    return this.databaseService.user.findUnique({
      where: { phone: login, deletedAt: null },
    });
  }

  private getUserSelection() {
    return {
      id: true,
      lastName: true,
      firstName: true,
      username: true,
      email: true,
      phone: true,
      employeeId: true,
      isActive: true,
      posteId: true,
      agenceId: true,
      createdAt: true,
      updatedAt: true,
      createdBy: true,
      companyId: true,
      deletedAt: true,
    };
  }
}

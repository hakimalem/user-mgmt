import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateRoleDTO } from './dto/createRoleDTO';
import { UpdateRoleDTO } from './dto/updateRoleDTO';

@Injectable()
export class RolesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createRoleDto: CreateRoleDTO, request) {
    const createdBy = request.user.userId;
    return this.databaseService.role.create({
      data: { ...createRoleDto, createdBy },
    });
  }

  async findAll() {
    return this.databaseService.role.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.role.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDTO) {
    return this.databaseService.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.role.delete({
      where: { id },
    });
  }
}

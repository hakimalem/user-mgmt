import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RolesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createRoleDto: Prisma.RoleCreateInput) {
    return this.databaseService.role.create({
      data: createRoleDto,
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

  async update(id: number, updateRoleDto: Prisma.RoleUpdateInput) {
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

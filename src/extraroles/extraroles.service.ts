import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ExtraUserRoleService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createExtraUserRoleDto: Prisma.ExtraUserRoleCreateInput) {
    return this.databaseService.extraUserRole.create({
      data: createExtraUserRoleDto,
    });
  }

  findAll() {
    return this.databaseService.extraUserRole.findMany();
  }

  findOne(id: number) {
    return this.databaseService.extraUserRole.findUnique({
      where: { id },
    });
  }

  update(id: number, updateExtraUserRoleDto: Prisma.ExtraUserRoleUpdateInput) {
    return this.databaseService.extraUserRole.update({
      where: { id },
      data: updateExtraUserRoleDto,
    });
  }

  remove(id: number) {
    return this.databaseService.extraUserRole.delete({
      where: { id },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateExtraUserRoleDTO } from './dto/createExtraUserRoleDTO';
import { UpdateExtraUserRoleDTO } from './dto/updateExtraUserRoleDTO';

@Injectable()
export class ExtraUserRoleService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createExtraUserRoleDTO: CreateExtraUserRoleDTO, request) {
    const createdBy = request.user.userId;

    const data = createExtraUserRoleDTO.roleId.map((roleId) => ({
      roleId,
      userId: createExtraUserRoleDTO.userId,
      createdBy,
    }));

    return this.databaseService.$transaction(async (transaction) => {
      await transaction.extraUserRole.deleteMany({
        where: { userId: createExtraUserRoleDTO.userId },
      });

      return transaction.extraUserRole.createMany({
        data,
      });
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

  update(id: number, updateExtraUserRoleDto: UpdateExtraUserRoleDTO) {
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

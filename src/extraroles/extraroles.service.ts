import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateExtraUserRoleDTO } from './dto/createExtraUserRoleDTO';
import { UpdateExtraUserRoleDTO } from './dto/updateExtraUserRoleDTO';

@Injectable()
export class ExtraUserRoleService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createExtraUserRoleDto: CreateExtraUserRoleDTO, request) {
    const createdBy = request.user.userId;
    return this.databaseService.extraUserRole.create({
      data: { ...createExtraUserRoleDto, createdBy },
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

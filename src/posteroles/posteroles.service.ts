import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreatePosteRolesDTO } from './dto/createPosteRolesDTO';
import { UpdatePosteRolesDTO } from './dto/updatePosteRolesDTO';

@Injectable()
export class PosterolesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createPosteroleDto: CreatePosteRolesDTO, request) {
    const createdBy = request.user.userId;

    const data = createPosteroleDto.roleId.map((roleId) => ({
      roleId,
      posteId: createPosteroleDto.posteId,
      createdBy,
    }));

    return this.databaseService.$transaction(async (transaction) => {
      await transaction.posteRoles.deleteMany({
        where: { posteId: createPosteroleDto.posteId },
      });

      return transaction.posteRoles.createMany({
        data,
      });
    });
  }
  findAll() {
    return this.databaseService.posteRoles.findMany();
  }

  findOne(id: number) {
    return this.databaseService.posteRoles.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePosteroleDto: UpdatePosteRolesDTO) {
    return this.databaseService.posteRoles.update({
      where: { id },
      data: updatePosteroleDto,
    });
  }

  remove(id: number) {
    return this.databaseService.posteRoles.delete({
      where: { id },
    });
  }
}

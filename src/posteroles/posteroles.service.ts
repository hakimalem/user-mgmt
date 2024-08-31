import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreatePosteRolesDTO } from './dto/createPosteRolesDTO';
import { UpdatePosteRolesDTO } from './dto/updatePosteRolesDTO';

@Injectable()
export class PosterolesService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createPosteroleDto: CreatePosteRolesDTO, request) {
    const createdBy = request.user.userId;
    return this.databaseService.posteRoles.create({
      data: { ...createPosteroleDto, createdBy },
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

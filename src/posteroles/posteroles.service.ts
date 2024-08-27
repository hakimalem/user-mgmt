import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PosterolesService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createPosteroleDto: Prisma.PosteRolesCreateInput) {
    return this.databaseService.posteRoles.create({
      data: createPosteroleDto,
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

  update(id: number, updatePosteroleDto: Prisma.PosteRolesUpdateInput) {
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

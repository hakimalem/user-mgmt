import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExtraUserRoleService } from './extraroles.service';
import { Prisma } from '@prisma/client';

@Controller('extrarole')
export class ExtraUserRoleController {
  constructor(private readonly extraUserRoleService: ExtraUserRoleService) {}

  @Post()
  create(@Body() createExtraUserRoleDto: Prisma.ExtraUserRoleCreateInput) {
    return this.extraUserRoleService.create(createExtraUserRoleDto);
  }

  @Get()
  findAll() {
    return this.extraUserRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extraUserRoleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExtraUserRoleDto: Prisma.ExtraUserRoleUpdateInput,
  ) {
    return this.extraUserRoleService.update(+id, updateExtraUserRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extraUserRoleService.remove(+id);
  }
}

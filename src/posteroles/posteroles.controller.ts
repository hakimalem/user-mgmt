import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PosterolesService } from './posteroles.service';
import { Prisma } from '@prisma/client';

@Controller('posteroles')
export class PosterolesController {
  constructor(private readonly posterolesService: PosterolesService) {}

  @Post()
  create(@Body() createPosteroleDto: Prisma.PosteRolesCreateInput) {
    return this.posterolesService.create(createPosteroleDto);
  }

  @Get()
  findAll() {
    return this.posterolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posterolesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePosteroleDto: Prisma.PosteRolesUpdateInput,
  ) {
    return this.posterolesService.update(+id, updatePosteroleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posterolesService.remove(+id);
  }
}

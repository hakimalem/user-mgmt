import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PosterolesService } from './posteroles.service';
import { Prisma } from '@prisma/client';
import { CreatePosteRolesDTO } from './dto/createPosteRolesDTO';
import { UpdatePosteRolesDTO } from './dto/updatePosteRolesDTO';
import { Request } from 'express';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { AuthGuard } from 'src/auth/guards/authentication.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { BaseController } from 'src/utils/base.controller';

@Roles(['admin', 'manager'])
@UseGuards(AuthGuard, AuthorizationGuard)
@UsePipes(ValidationPipe)
@Controller('posteroles')
export class PosterolesController extends BaseController {
  constructor(private readonly posterolesService: PosterolesService) {
    super();
  }

  @Post()
  async create(
    @Body() createPosteroleDto: CreatePosteRolesDTO,
    @Req() request: Request,
  ) {
    try {
      const result = await this.posterolesService.create(
        createPosteroleDto,
        request,
      );
      return super.sendSuccessResponse('Postrole created successfully', result);
    } catch (error) {
      if (error.code === 'P2002') {
        return super.sendErrorResponse('Postrole already exists', 400);
      }
      return super.sendErrorResponse('Failed to create postrole', 500);
    }
  }

  @Roles(['admin', 'manager'])
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Get()
  async findAll() {
    try {
      const data = await this.posterolesService.findAll();
      return super.sendSuccessResponse(
        'Postroles retrieved successfully',
        data,
      );
    } catch (error) {
      return super.sendErrorResponse(
        'Failed to retrieve postroles',
        error.message,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.posterolesService.findOne(+id);
      return super.sendSuccessResponse('Postrole retrieved successfully', data);
    } catch (error) {
      return super.sendErrorResponse(
        'Failed to retrieve postrole',
        error.message,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePosteroleDto: UpdatePosteRolesDTO,
  ) {
    try {
      const data = await this.posterolesService.update(+id, updatePosteroleDto);
      return super.sendSuccessResponse('Postrole updated successfully', data);
    } catch (error) {
      return super.sendErrorResponse('Failed to update postrole', 400);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.posterolesService.remove(+id);
      return super.sendSuccessResponse('Postrole removed successfully', data);
    } catch (error) {
      return super.sendErrorResponse('Failed to remove postrole', 400);
    }
  }
}

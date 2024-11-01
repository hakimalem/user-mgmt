import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Req,
  Put,
} from '@nestjs/common';
import { ExtraUserRoleService } from './extraroles.service';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/authentication.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { BaseController } from 'src/utils/base.controller';
import { Request } from 'express';
import { CreateExtraUserRoleDTO } from './dto/createExtraUserRoleDTO';
import { UpdateExtraUserRoleDTO } from './dto/updateExtraUserRoleDTO';

@Roles(['admin', 'manager'])
@UseGuards(AuthGuard, AuthorizationGuard)
@UsePipes(ValidationPipe)
@Controller('api/extrarole')
export class ExtraUserRoleController extends BaseController {
  constructor(private readonly extraUserRoleService: ExtraUserRoleService) {
    super();
  }

  @Post()
  async create(
    @Body() createExtraUserRoleDto: CreateExtraUserRoleDTO,
    @Req() request: Request,
  ) {
    try {
      const result = await this.extraUserRoleService.create(
        createExtraUserRoleDto,
        request,
      );
      return super.sendSuccessResponse(result);
    } catch (error) {
      if (error.code === 'P2002') {
        return super.sendErrorResponse('Extrarole already exists', 400);
      }
      return super.sendErrorResponse('Failed to create extra user role', 400);
    }
  }

  @Get()
  async findAll() {
    try {
      const extraUserRoles = await this.extraUserRoleService.findAll();
      return super.sendSuccessResponse(extraUserRoles);
    } catch (error) {
      return super.sendErrorResponse('Failed to fetch extra user roles', 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const extraUserRole = await this.extraUserRoleService.findOne(+id);
      return super.sendSuccessResponse(extraUserRole);
    } catch (error) {
      return super.sendErrorResponse('Failed to retrieve extra user role', 404);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExtraUserRoleDto: UpdateExtraUserRoleDTO,
  ) {
    try {
      const updatedExtraUserRole = await this.extraUserRoleService.update(
        +id,
        updateExtraUserRoleDto,
      );
      return super.sendSuccessResponse(updatedExtraUserRole);
    } catch (error) {
      return super.sendErrorResponse('Failed to update extra user role', 400);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.extraUserRoleService.remove(+id);
      return super.sendSuccessResponse(result);
    } catch (error) {
      return super.sendErrorResponse('Failed to remove extra user role', 400);
    }
  }
}

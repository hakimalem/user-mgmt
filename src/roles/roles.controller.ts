import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Prisma } from '@prisma/client';
import { CreateRoleDTO } from './dto/createRoleDTO';
import { UpdateRoleDTO } from './dto/updateRoleDTO';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/authentication.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { BaseController } from 'src/utils/base.controller';

@Roles(['admin', 'manager'])
@UseGuards(AuthGuard, AuthorizationGuard)
@UsePipes(ValidationPipe)
@Controller('roles')
export class RolesController extends BaseController {
  constructor(private readonly rolesService: RolesService) {
    super();
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDTO, @Req() request: Request) {
    try {
      const newRole = await this.rolesService.create(createRoleDto, request);
      return super.sendSuccessResponse(newRole);
    } catch (error) {
      console.log(error);
      if (error.code === 'P2002') {
        return super.sendErrorResponse('Role already exists', 400);
      }
      return super.sendErrorResponse('Failed to create role', 400);
    }
  }

  @Get()
  async findAll() {
    try {
      const roles = await this.rolesService.findAll();
      return super.sendSuccessResponse(roles);
    } catch (error) {
      return super.sendErrorResponse('Failed to fetch roles', 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const role = await this.rolesService.findOne(+id);
      return super.sendSuccessResponse(role);
    } catch (error) {
      return super.sendErrorResponse('Failed to retrieve role', 404);
    }
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDTO) {
    try {
      const updatedRole = await this.rolesService.update(+id, updateRoleDto);
      return super.sendSuccessResponse(updatedRole);
    } catch (error) {
      return super.sendErrorResponse('Failed to update role', 400);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.rolesService.remove(+id);
      return super.sendSuccessResponse(result);
    } catch (error) {
      return super.sendErrorResponse('Failed to remove role', 400);
    }
  }
}

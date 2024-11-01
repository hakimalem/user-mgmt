import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Inject,
  UsePipes,
  ValidationPipe,
  Req,
  Put,
} from '@nestjs/common';
import { UserService } from './users.service';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/utils/base.controller';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/authentication.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateUserDTO } from './dto/createUserDTO';
import { UpdateUserDTO } from './dto/updateUserDTO';
import { Request } from 'express';

@UsePipes(ValidationPipe)
@Roles(['admin'])
@UseGuards(AuthGuard, AuthorizationGuard)
@Controller('api/user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() createUserDto: CreateUserDTO, @Req() request: Request) {
    try {
      const data = await this.userService.create(createUserDto, request);
      return super.sendSuccessResponse(data);
    } catch (error) {
      const emailUser = await this.userService.findUserByEmail(
        createUserDto.email,
      );
      const phoneUser = await this.userService.findUserByPhone(
        createUserDto.phone,
      );
      if (emailUser) {
        return super.sendErrorResponse('Email User already exists', 400);
      }

      if (phoneUser) {
        return super.sendErrorResponse('Phone User already exists', 400);
      }
      return super.sendErrorResponse('Failed to create user', 500);
    }
  }
  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return super.sendSuccessResponse(users);
    } catch (error) {
      return super.sendErrorResponse('Failed to fetch users', 500);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(+id);
      return super.sendSuccessResponse(user);
    } catch (error) {
      return super.sendErrorResponse('Failed to retrieve user', 404);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    try {
      const updatedUser = await this.userService.update(+id, updateUserDto);
      return super.sendSuccessResponse(updatedUser);
    } catch (error) {
      return super.sendErrorResponse('Failed to update user', 400);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.userService.remove(+id);
      return super.sendSuccessResponse(result);
    } catch (error) {
      return super.sendErrorResponse('Failed to remove user', 400);
    }
  }
}

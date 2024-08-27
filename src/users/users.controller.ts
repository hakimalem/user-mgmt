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
} from '@nestjs/common';
import { UserService } from './users.service';
import { Prisma } from '@prisma/client';
import { BaseController } from 'src/utils/base.controller';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/authentication.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

// @UseInterceptors(CacheInterceptor)
// @Roles(['admin'])
// @UseGuards(AuthGuard, AuthorizationGuard)
@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  async create(@Body() createUserDto: Prisma.UserCreateInput) {
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

    return super.sendSuccessResponse(
      'User created successfully',
      await this.userService.create(createUserDto),
    );
  }

  @Get()
  async findAll() {
    // console.log('INSIDE CONTROLLER');

    return super.sendSuccessResponse(
      'Users fetched successfully',
      await this.userService.findAll(),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

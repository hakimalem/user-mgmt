import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/authentication.guard';
import { BaseController } from 'src/utils/base.controller';
import { AuthorizationGuard } from './guards/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }
  @Post('login')
  login(@Body() input: { login: string; password: string }) {
    return this.authService.authenticate(input.login, input.password);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    return request.user;
  }
}

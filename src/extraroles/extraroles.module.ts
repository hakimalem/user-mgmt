import { Module } from '@nestjs/common';
import { ExtraUserRoleService } from './extraroles.service';
import { ExtraUserRoleController } from './extraroles.controller';

@Module({
  controllers: [ExtraUserRoleController],
  providers: [ExtraUserRoleService],
  exports: [ExtraUserRoleService],
})
export class ExtraUserRoleModule {}

import { Module } from '@nestjs/common';
import { PosterolesService } from './posteroles.service';
import { PosterolesController } from './posteroles.controller';

@Module({
  controllers: [PosterolesController],
  providers: [PosterolesService],
})
export class PosterolesModule {}

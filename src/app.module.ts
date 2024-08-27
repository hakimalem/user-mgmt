import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PosterolesModule } from './posteroles/posteroles.module';
import { AuthModule } from './auth/auth.module';
import { ExtraUserRoleModule } from './extraroles/extraroles.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    RolesModule,
    PosterolesModule,
    AuthModule,
    ExtraUserRoleModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          url: process.env.REDIS_URL,
          ttl: 1000 * 3600, // Time to live for cache entries
        }),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

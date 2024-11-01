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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { RolesController } from './roles/roles.controller';
import { PosterolesController } from './posteroles/posteroles.controller';
import { ExtraUserRoleController } from './extraroles/extraroles.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'), // Adjust this to point to your build folder
      serveRoot: '/', // Serve static files at the root URL
    }),
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
  controllers: [
    // Register other controllers first
    UserController,
    AuthController,
    RolesController,
    PosterolesController,
    ExtraUserRoleController,
    // Register AppController last
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}

import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { DatabaseService } from 'src/database/database.service';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UserWithRoles } from 'src/types';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly databaseService: DatabaseService,
    @Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getClass(), context.getHandler()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { userId, employeeId } = request.user;

    const cachedUser = await this.cacheManager.get<UserWithRoles>(
      `user-${employeeId}`,
    );
    if (cachedUser) {
      return this.hasRequiredRole(cachedUser.allRoles, requiredRoles);
    }

    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
      select: this.getUserSelection(),
    });

    if (!user) {
      return false;
    }

    const allRoles = await this.getAllRoles(userId, user.posteId);

    await this.cacheManager.set(`user-${employeeId}`, { ...user, allRoles });

    return this.hasRequiredRole(allRoles, requiredRoles);
  }

  private getUserSelection() {
    return {
      id: true,
      lastName: true,
      firstName: true,
      username: true,
      email: true,
      phone: true,
      employeeId: true,
      isActive: true,
      posteId: true,
      agenceId: true,
      createdAt: true,
      updatedAt: true,
      createdBy: true,
      companyId: true,
    };
  }

  private async getAllRoles(
    userId: number,
    posteId: number,
  ): Promise<string[]> {
    const postRoles = await this.databaseService.role.findMany({
      where: { posteRoles: { some: { posteId } } },
      select: { name: true },
    });

    const extraRoles = await this.databaseService.role.findMany({
      where: { extraUsers: { some: { userId } } },
      select: { name: true },
    });

    return [...new Set([...postRoles, ...extraRoles].map((role) => role.name))];
  }

  private hasRequiredRole(
    allRoles: string[],
    requiredRoles: string[],
  ): boolean {
    return requiredRoles.some((role) => allRoles.includes(role));
  }
}

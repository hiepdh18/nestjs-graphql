import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BackendLogger } from 'common/logger/backend-logger';
import { User } from 'modules/user/schemas/user.schema';

@Injectable()
export class GqlRolesGuard implements CanActivate {
  private readonly logger = new BackendLogger(GqlRolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;
    this.logger.debug(
      `Checking that user: ${user.email} has roles: ${JSON.stringify(roles)}`,
    );

    const hasRole = () =>
      user.roles.some(
        (role) =>
          !!roles.find(
            (item) =>
              item.toLowerCase() === role.name.toLowerCase() && role.enabled,
          ),
      );

    return user && user.roles && hasRole();
  }
}

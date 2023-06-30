import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const session = request.user;
    let isIncluded: boolean;
    for (const role of roles) {
      isIncluded = Object.values(session.user.roles).includes(role);
      if (isIncluded) break;
    }

    if (!isIncluded)
      throw new ForbiddenException('You do not have access to this API');

    return isIncluded;
  }
}

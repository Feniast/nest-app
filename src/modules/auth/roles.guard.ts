import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const matchRoles = (roles: string[], rolesB: string[]) => {
  for (const r of roles) {
    if (rolesB.indexOf(r) < 0) return false;
  }
  return true;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.auth.user;
    // TODO: throw custom exception if needed
    return matchRoles(roles, user.roles.map(x => x.code));
  }
}
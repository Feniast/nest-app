import { AuthGuard } from '@nestjs/passport';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super({
      property: 'auth'
    });
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    const r = super.canActivate(context) as Promise<boolean>;
    if (isPublic) {
      return r.catch(() => true);
    }
    return r;
  }
}
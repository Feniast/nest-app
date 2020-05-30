import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IJwtPayload, IJwtValidationResult } from './types';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get('security.jwt.secret'),
    });
  }

  async validate(request: Request, payload: IJwtPayload) : Promise<IJwtValidationResult> {
    const user = await this.authService.validate(payload);
    // I think here can return nothing to trigger failure
    // https://github.com/mikenicholson/passport-jwt/blob/6b92631dfbde7143b9e046093dbf332107bce82e/lib/strategy.js#L110
    if (!user) {
      throw new UnauthorizedException('未登录');
    }
    return {
      user,
      jwtPayload: payload
    }
  }
}

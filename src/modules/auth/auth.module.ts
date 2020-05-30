import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SysAdminModule } from '../sys-admin/sys-admin.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { TokenBlacklistService } from './token-blacklist.service';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    SysAdminModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('security.jwt.secret'),
          signOptions: {
            expiresIn: configService.get('security.jwt.expires'),
          },
        };
      },
      inject: [ConfigService],
    }),
    RedisModule
  ],
  providers: [AuthService, JwtStrategy, TokenBlacklistService],
  controllers: [AuthController],
})
export class AuthModule {}

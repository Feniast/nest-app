import { Controller, Body, Post, UseGuards, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/Auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from 'src/decorators/user';
import { SysAdmin } from '../sys-admin/sys-admin.entity';
import { JwtPayload } from 'src/decorators/jwt-payload';
import { IJwtPayload } from './types';


@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const token = await this.authService.authenticate(
      authDto.username,
      authDto.password,
    );
    this.logger.debug(`user: ${authDto.username} logged in`);
    return {
      token,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@User() user: SysAdmin, @JwtPayload() payload: IJwtPayload) {
    this.logger.debug(`user: ${user.name} logged out`);
    await this.authService.logout(payload.jti);
  }
}

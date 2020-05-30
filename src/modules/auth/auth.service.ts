import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { SysAdminService } from '../sys-admin/sys-admin.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SysAdmin } from '../sys-admin/sys-admin.entity';
import { IJwtPayload } from './types';
import { nanoid } from 'nanoid';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly sysAdminService: SysAdminService,
    private readonly jwtService: JwtService,
    private readonly tokenBlackListService: TokenBlacklistService,
  ) {}

  async authenticate(username: string, password: string): Promise<string> {
    const user = await this.sysAdminService.findByName(username);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    const validatedResult = await bcrypt.compare(password, user.password);
    if (!validatedResult) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    return this.jwtService.sign({ sub: user.id, jti: nanoid() });
  }

  async validate(jwtPayload: IJwtPayload): Promise<SysAdmin | undefined> {
    const jti = jwtPayload.jti;
    if (await this.tokenBlackListService.isBlocked(jti)) {
      return;
    }
    return this.sysAdminService.findById(jwtPayload.sub);
  }

  async logout(token: string) {
    await this.tokenBlackListService.put(token);
    return true;
  }
}

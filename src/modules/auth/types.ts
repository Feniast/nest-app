import { SysAdmin } from '../sys-admin/sys-admin.entity';

export interface IJwtPayload {
  sub: number;
  jti: string;
}

export interface IJwtValidationResult {
  user: SysAdmin;
  jwtPayload: IJwtPayload;
}

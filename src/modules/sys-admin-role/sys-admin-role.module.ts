import { Module } from '@nestjs/common';
import { SysAdminRoleService } from './sys-admin-role.service';

@Module({
  providers: [SysAdminRoleService]
})
export class SysAdminRoleModule {}

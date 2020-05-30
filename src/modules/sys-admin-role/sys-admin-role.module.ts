import { Module } from '@nestjs/common';
import { SysAdminRoleService } from './sys-admin-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysAdminRoleRepository } from './sys-admin-role.repository';
import { SysAdminRoleController } from './sys-admin-role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SysAdminRoleRepository])],
  providers: [SysAdminRoleService],
  controllers: [SysAdminRoleController],
  exports: [SysAdminRoleService]
})
export class SysAdminRoleModule {}

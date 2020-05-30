import { Module } from '@nestjs/common';
import { SysAdminController } from './sys-admin.controller';
import { SysAdminService } from './sys-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysAdminRespository } from './sys-admin.repository';
import { SysAdminRoleModule } from '../sys-admin-role/sys-admin-role.module';

@Module({
  imports: [TypeOrmModule.forFeature([SysAdminRespository]), SysAdminRoleModule], // inject into current scope 
  controllers: [SysAdminController],
  providers: [SysAdminService],
  exports: [SysAdminService]
})
export class SysAdminModule {}

import { Module } from '@nestjs/common';
import { SysAdminController } from './sys-admin.controller';
import { SysAdminService } from './sys-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysAdminRespository } from './sys-admin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SysAdminRespository])], // inject into current scope 
  controllers: [SysAdminController],
  providers: [SysAdminService],
})
export class SysAdminModule {}

import { Controller, Get, Post, Body, Query, Logger } from '@nestjs/common';
import { SysAdminService } from './sys-admin.service';
import { SysAdminQueryDto } from './dto/SysAdminQuery.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SysAdmin } from './sys-admin.entity';
import { CreateSysAdminDto } from './dto/CreateSysAdmin.dto';

@Controller('sys-admin')
export class SysAdminController {
  private readonly logger = new Logger(SysAdminController.name);
  constructor(private sysAdminService: SysAdminService) {}

  @Get()
  findAll(@Query() queryDto: SysAdminQueryDto): Promise<Pagination<SysAdmin>> {
    return this.sysAdminService.findAll(queryDto);
  }

  @Post()
  create(@Body() createDto: CreateSysAdminDto): Promise<SysAdmin> {
    this.logger.debug('create sys admin api');
    return this.sysAdminService.create(createDto);
  }
}

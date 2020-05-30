import { Controller, Param, Get, UseGuards, ParseIntPipe, NotFoundException, Put, Query, Body, Post, Delete } from '@nestjs/common';
import { SysAdminRoleService } from './sys-admin-role.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleQueryDto } from './dto/RoleQuery.dto';
import { UpdateRoleDto } from './dto/UpdateRole.dto';
import { CreateRoleDto } from './dto/CreateRole.dto';
import { SysAdmin } from '../sys-admin/sys-admin.entity';
import { User } from 'src/decorators/user';

@Controller('sys-admin-role')
@UseGuards(JwtAuthGuard)
export class SysAdminRoleController {
  constructor(private readonly sysAdminRoleService: SysAdminRoleService) {}

  @Get(':id')
  async getOne(@Param('id', new ParseIntPipe()) id: number) {
    const result = await this.sysAdminRoleService.findById(id);
    if (!result) {
      throw new NotFoundException('角色不存在');
    }
    return result;
  }

  @Get()
  async getList(@Query() queryDto: RoleQueryDto) {
    return this.sysAdminRoleService.findAll(queryDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDto: UpdateRoleDto,
  ) {
    return this.sysAdminRoleService.update(id, updateDto);
  }

  @Post()
  async create(@User() admin: SysAdmin, @Body() createDto: CreateRoleDto) {
    return this.sysAdminRoleService.create(admin, createDto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.sysAdminRoleService.delete(id);
  }
}

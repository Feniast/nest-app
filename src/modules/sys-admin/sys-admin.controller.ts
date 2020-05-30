import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Logger,
  UseGuards,
  Param,
  ParseIntPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { SysAdminService } from './sys-admin.service';
import { SysAdminQueryDto } from './dto/SysAdminQuery.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SysAdmin } from './sys-admin.entity';
import { CreateSysAdminDto } from './dto/CreateSysAdmin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChangePasswordDto } from './dto/ChangePassword.dto';
import { User } from 'src/decorators/user';
import { Auth } from 'src/decorators/auth';
import { UpdateSysAdminDto } from './dto/UpdateSysAdmin.dto';

@Controller('sys-admin')
export class SysAdminController {
  private readonly logger = new Logger(SysAdminController.name);
  constructor(private sysAdminService: SysAdminService) {}

  @Get()
  @Auth('admin')
  findAll(@Query() queryDto: SysAdminQueryDto): Promise<Pagination<SysAdmin>> {
    return this.sysAdminService.findAll(queryDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id', new ParseIntPipe()) id: number) {
    const result = await this.sysAdminService.findById(id);
    if (!result) {
      throw new NotFoundException('用户不存在');
    }
    return result;
  }

  @Post()
  @Auth('admin')
  create(@Body() createDto: CreateSysAdminDto): Promise<SysAdmin> {
    return this.sysAdminService.create(createDto);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  changePassword(
    @User() admin: SysAdmin,
    @Body() changePasswdDto: ChangePasswordDto,
  ) {
    return this.sysAdminService.changePassword(
      admin,
      admin.id,
      changePasswdDto.password,
    );
  }

  @Put(':id')
  @Auth('admin')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSysAdminDto: UpdateSysAdminDto,
  ) {
    return this.sysAdminService.update(id, updateSysAdminDto);
  }
}

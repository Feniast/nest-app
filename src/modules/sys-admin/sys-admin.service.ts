import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { SysAdminRespository } from './sys-admin.repository';
import { SysAdmin } from './sys-admin.entity';
import { SysAdminQueryDto } from './dto/SysAdminQuery.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateSysAdminDto } from './dto/CreateSysAdmin.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SysAdminService {
  private readonly logger = new Logger(SysAdminService.name);

  constructor(
    private readonly sysAdminRepository: SysAdminRespository,
    private readonly configService: ConfigService
  ) {}

  async findAll(sysAdminQueryDto: SysAdminQueryDto): Promise<Pagination<SysAdmin>> {
    return this.sysAdminRepository.findAll(sysAdminQueryDto);
  }

  async create(createDto: CreateSysAdminDto) : Promise<SysAdmin> {
    const existedAdmin = await this.sysAdminRepository.findByName(createDto.name);
    if (existedAdmin) {
      throw new BadRequestException("用户名已存在，不能创建该用户");
    }
    const newSysAdmin = this.sysAdminRepository.create();
    newSysAdmin.name = createDto.name;
    const hashedPassword = await bcrypt.hash(createDto.password, this.configService.get('security.saltRounds'));
    newSysAdmin.password = hashedPassword;
    newSysAdmin.mobile = createDto.mobile;
    return this.sysAdminRepository.save(newSysAdmin);
  }
}

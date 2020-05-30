import {
  Injectable,
  Logger,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { SysAdminRespository } from './sys-admin.repository';
import { SysAdmin } from './sys-admin.entity';
import { SysAdminQueryDto } from './dto/SysAdminQuery.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateSysAdminDto } from './dto/CreateSysAdmin.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { SysAdminRoleService } from '../sys-admin-role/sys-admin-role.service';
import { UpdateSysAdminDto } from './dto/UpdateSysAdmin.dto';

@Injectable()
export class SysAdminService {
  private readonly logger = new Logger(SysAdminService.name);

  constructor(
    private readonly sysAdminRepository: SysAdminRespository,
    private readonly configService: ConfigService,
    private readonly sysAdminRoleService: SysAdminRoleService,
  ) {}

  async findAll(
    sysAdminQueryDto: SysAdminQueryDto,
  ): Promise<Pagination<SysAdmin>> {
    return this.sysAdminRepository.findAll(sysAdminQueryDto);
  }

  async create(createDto: CreateSysAdminDto): Promise<SysAdmin> {
    const existedAdmin = await this.sysAdminRepository.findByName(
      createDto.name,
    );
    if (existedAdmin) {
      throw new BadRequestException('用户名已存在，不能创建该用户');
    }
    const newSysAdmin = this.sysAdminRepository.create();
    newSysAdmin.name = createDto.name;
    const hashedPassword = await bcrypt.hash(
      createDto.password,
      this.configService.get('security.saltRounds'),
    );
    newSysAdmin.password = hashedPassword;
    newSysAdmin.mobile = createDto.mobile;
    if (createDto.roles && createDto.roles.length > 0) {
      const roles = await this.sysAdminRoleService.findByIds(createDto.roles);
      newSysAdmin.roles = roles;
    }
    return this.sysAdminRepository.save(newSysAdmin);
  }

  async update(id: number, updateDto: UpdateSysAdminDto): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    // Not to use update for Many-to-Many https://github.com/typeorm/typeorm/issues/2821
    if (updateDto.roles && updateDto.roles.length > 0) {
      const roles = await this.sysAdminRoleService.findByIds(updateDto.roles);
      user.roles = roles;
    }
    await this.sysAdminRepository.save(user);
    return true;
  }

  async findByName(name: string): Promise<SysAdmin | undefined> {
    return this.sysAdminRepository.findByName(name);
  }

  async findById(id: number): Promise<SysAdmin | undefined> {
    return this.sysAdminRepository.findOne({ id });
  }

  async changePassword(
    admin: SysAdmin,
    id: number,
    password: string,
  ): Promise<boolean> {
    if (admin.id !== id) {
      throw new ForbiddenException('没有权限修改此用户密码');
    }
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const equal = await bcrypt.compare(password, user.password);
    if (equal) {
      throw new BadRequestException('旧密码与新密码相同，请重新修改密码');
    }
    const newPassword = await bcrypt.hash(
      password,
      this.configService.get('security.saltRounds'),
    );

    await this.sysAdminRepository.update(id, { password: newPassword });
    return true;
  }
}

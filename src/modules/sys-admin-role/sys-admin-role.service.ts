import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/CreateRole.dto';
import { SysAdminRoleRepository } from './sys-admin-role.repository';
import { RoleQueryDto } from './dto/RoleQuery.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SysAdminRole } from './sys-admin-role.entity';
import { UpdateRoleDto } from './dto/UpdateRole.dto';
import { Connection } from 'typeorm';
import { SysAdmin } from '../sys-admin/sys-admin.entity';

@Injectable()
export class SysAdminRoleService {
  constructor(
    private readonly repository: SysAdminRoleRepository,
    private readonly connection: Connection,
  ) {}

  async findAll(queryDto: RoleQueryDto): Promise<Pagination<SysAdminRole>> {
    return this.repository.findAll(queryDto);
  }

  async findById(id: number): Promise<SysAdminRole | undefined> {
    return this.repository.findById(id);
  }

  async findByIds(ids: number[]) : Promise<SysAdminRole[]> {
    return this.repository.findByIds(ids);
  }

  async create(admin: SysAdmin, createDto: CreateRoleDto): Promise<SysAdminRole> {
    return this.connection.transaction(async entityManager => {
      const repository = entityManager.getCustomRepository(
        SysAdminRoleRepository,
      );

      const existed = await repository.findByCode(createDto.code);
      if (existed) {
        throw new BadRequestException('角色代码已存在，请修改角色代码');
      }
      const entity = repository.create(createDto);
      entity.createdBy = admin.id;
      return await repository.save(entity);
    });
  }

  async update(id: number, updateDto: UpdateRoleDto): Promise<boolean> {
    return this.connection.transaction(async entityManager => {
      const repository = entityManager.getCustomRepository(
        SysAdminRoleRepository,
      );
      const existed = await repository.findById(id);
      if (!existed) {
        throw new NotFoundException('角色不存在');
      }
      return (await repository.update(id, updateDto)).affected > 0;
    });
  }

  async delete(id: number): Promise<boolean> {
    return this.connection.transaction(async entityManager => {
      const repository = entityManager.getCustomRepository(
        SysAdminRoleRepository,
      );
      const used = repository.isRoleUsed(id);
      if (used) {
        throw new BadRequestException('角色已被绑定，不能删除');
      }
      return (await repository.delete({ id })).affected > 0;
    });
  }
}

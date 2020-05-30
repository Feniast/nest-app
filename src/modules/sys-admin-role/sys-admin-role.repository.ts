import { Repository, EntityRepository, FindConditions, Like } from 'typeorm';
import { SysAdminRole } from './sys-admin-role.entity';
import { RoleQueryDto } from './dto/RoleQuery.dto';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@EntityRepository(SysAdminRole)
export class SysAdminRoleRepository extends Repository<SysAdminRole> {
  async findAll(queryDto: RoleQueryDto): Promise<Pagination<SysAdminRole>> {
    const whereObj: FindConditions<SysAdminRole> = {};
    if (queryDto.name) {
      whereObj.name = Like(`%${queryDto.name}%`);
    }
    if (queryDto.code) {
      whereObj.code = Like(`%${queryDto.code}%`);
    }
    return paginate(this, queryDto, {
      where: whereObj,
    });
  }

  async findById(id: number): Promise<SysAdminRole | undefined> {
    return this.findOne({
      where: {
        id,
      },
    });
  }

  async findByCode(code: string): Promise<SysAdminRole | undefined> {
    return this.findOne({
      where: {
        code,
      },
    });
  }

  async isRoleUsed(id: number): Promise<boolean> {
    const result = (await this.query(
      'select count(1) from sys_admin_role_relation where sys_admin_role_id = ?',
      [id],
    )) as number;
    return result > 0;
  }
}

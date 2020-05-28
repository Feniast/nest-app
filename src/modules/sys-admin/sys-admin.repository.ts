import { Repository, EntityRepository, Like, FindConditions } from "typeorm";
import { SysAdmin } from "./sys-admin.entity";
import { SysAdminQueryDto } from "./dto/SysAdminQuery.dto";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@EntityRepository(SysAdmin)
export class SysAdminRespository extends Repository<SysAdmin> {
  findAll(queryDto: SysAdminQueryDto): Promise<Pagination<SysAdmin>> {
    const whereObj: FindConditions<SysAdmin> = {};
    if (queryDto.name) {
      whereObj.name = Like(`%${queryDto.name}%`);
    }
    if (queryDto.status) {
      whereObj.status = queryDto.status;
    }
    return paginate(this, queryDto, {
      where: whereObj,
    });
  }

  findByName(name: string): Promise<SysAdmin | undefined> {
    const admin = this.findOne({
      where: {
        name
      }
    });
    return admin;
  }
}
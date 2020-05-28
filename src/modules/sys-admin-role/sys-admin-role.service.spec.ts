import { Test, TestingModule } from '@nestjs/testing';
import { SysAdminRoleService } from './sys-admin-role.service';

describe('SysAdminRoleService', () => {
  let service: SysAdminRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysAdminRoleService],
    }).compile();

    service = module.get<SysAdminRoleService>(SysAdminRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

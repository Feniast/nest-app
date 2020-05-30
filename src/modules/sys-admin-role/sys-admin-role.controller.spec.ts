import { Test, TestingModule } from '@nestjs/testing';
import { SysAdminRoleController } from './sys-admin-role.controller';

describe('SysAdminRole Controller', () => {
  let controller: SysAdminRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysAdminRoleController],
    }).compile();

    controller = module.get<SysAdminRoleController>(SysAdminRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

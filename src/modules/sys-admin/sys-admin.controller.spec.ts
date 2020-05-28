import { Test, TestingModule } from '@nestjs/testing';
import { SysAdminController } from './sys-admin.controller';

describe('SysAdmin Controller', () => {
  let controller: SysAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysAdminController],
    }).compile();

    controller = module.get<SysAdminController>(SysAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

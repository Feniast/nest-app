import { Test, TestingModule } from '@nestjs/testing';
import { SysAdminService } from './sys-admin.service';

describe('SysAdminService', () => {
  let service: SysAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SysAdminService],
    }).compile();

    service = module.get<SysAdminService>(SysAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

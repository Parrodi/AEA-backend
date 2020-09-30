import { Test, TestingModule } from '@nestjs/testing';
import { HearingService } from './hearing.service';

describe('HearingService', () => {
  let service: HearingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HearingService],
    }).compile();

    service = module.get<HearingService>(HearingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HearingController } from './hearing.controller';

describe('HearingController', () => {
  let controller: HearingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HearingController],
    }).compile();

    controller = module.get<HearingController>(HearingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

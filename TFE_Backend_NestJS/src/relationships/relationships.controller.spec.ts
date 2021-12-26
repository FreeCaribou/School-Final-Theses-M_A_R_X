import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipsController } from './relationships.controller';

describe('Relationships Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RelationshipsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: RelationshipsController = module.get<RelationshipsController>(RelationshipsController);
    expect(controller).toBeDefined();
  });
});

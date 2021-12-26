import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipTypesController } from './relationship-types.controller';

describe('RelationshipTypes Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RelationshipTypesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: RelationshipTypesController = module.get<RelationshipTypesController>(RelationshipTypesController);
    expect(controller).toBeDefined();
  });
});

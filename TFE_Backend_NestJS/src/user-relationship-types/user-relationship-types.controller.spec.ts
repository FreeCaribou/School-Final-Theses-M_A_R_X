import { Test, TestingModule } from '@nestjs/testing';
import { UserRelationshipTypesController } from './user-relationship-types.controller';

describe('UserRelationshipTypes Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserRelationshipTypesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: UserRelationshipTypesController = module.get<UserRelationshipTypesController>(UserRelationshipTypesController);
    expect(controller).toBeDefined();
  });
});

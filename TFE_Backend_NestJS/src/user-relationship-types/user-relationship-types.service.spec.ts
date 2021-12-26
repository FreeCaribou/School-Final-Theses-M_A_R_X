import { Test, TestingModule } from '@nestjs/testing';
import { UserRelationshipTypesService } from './user-relationship-types.service';

describe('UserRelationshipTypesService', () => {
  let service: UserRelationshipTypesService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRelationshipTypesService],
    }).compile();
    service = module.get<UserRelationshipTypesService>(UserRelationshipTypesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

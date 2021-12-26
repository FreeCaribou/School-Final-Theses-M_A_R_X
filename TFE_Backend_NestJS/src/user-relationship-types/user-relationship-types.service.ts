import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRelationshipTypes } from './user-relationship-types.entity';
import { Repository } from 'typeorm';
import { CreateUserRelationshipTypeDto } from './dto/create-user-relationship-type.dto';
import { Users } from 'src/users/users.entity';
import { RelationshipTypes } from 'src/relationship-types/relationship-types.entity';

@Injectable()
export class UserRelationshipTypesService {
  constructor(
    @InjectRepository(UserRelationshipTypes)
    private readonly repository: Repository<UserRelationshipTypes>,
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
    @InjectRepository(RelationshipTypes)
    private readonly relationshipTypesRepo: Repository<RelationshipTypes>,
  ) {}

  async findAll(): Promise<UserRelationshipTypes[]> {
    return this.repository.find({ relations: ['user', 'relationshipType'] });
  }

  async create(
    createUserRelationshipTypeDto: CreateUserRelationshipTypeDto,
  ): Promise<UserRelationshipTypes> {
    const user = await this.usersRepo.findOne(
      createUserRelationshipTypeDto.userId,
    );
    const relationshipType = await this.relationshipTypesRepo.findOne(
      createUserRelationshipTypeDto.relationshipTypeId,
    );

    if(user == null) {
      throw new ConflictException("User not present");
    }
    if(relationshipType == null) {
      throw new ConflictException("Relationship type not present not present");
    }

    const userRelationshipType = new UserRelationshipTypes();
    userRelationshipType.user = user;
    userRelationshipType.relationshipType = relationshipType;
    return this.repository.save(userRelationshipType);
  }

  async findAllByUser(id: number): Promise<UserRelationshipTypes[]> {
    return this.repository.find({
      relations: ['user', 'relationshipType'],
      where: { user: {id: id} },
    });
  }
}

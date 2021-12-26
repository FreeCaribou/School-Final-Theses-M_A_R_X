import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRelationshipTypeDto } from './dto/create-relationship-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationshipTypes } from './relationship-types.entity';
import { UserRelationshipTypes } from 'src/user-relationship-types/user-relationship-types.entity';
import { Users } from 'src/users/users.entity';

@Injectable()
export class RelationshipTypesService {
  constructor(
    @InjectRepository(RelationshipTypes)
    private readonly repo: Repository<RelationshipTypes>,
    @InjectRepository(Users)
    private readonly usersRepo: Repository<UserRelationshipTypes>,
    @InjectRepository(UserRelationshipTypes)
    private readonly usersRelationshipTypesRepo: Repository<
      UserRelationshipTypes
    >,
  ) {}

  async findAll(): Promise<RelationshipTypes[]> {
    return this.repo.find();
  }

  async createFromUser(
    createRelationshipTypeDto: CreateRelationshipTypeDto,
  ): Promise<UserRelationshipTypes> {
    const user = await this.usersRepo.findOne(
      createRelationshipTypeDto.tokenUserId,
    );
    if (user == null) {
      throw new ConflictException('User not present');
    }
    let relationshipType = await this.repo.findOne({
      where: { name: createRelationshipTypeDto.name },
    });
    if (relationshipType == null) {
      relationshipType = await this.repo.save(createRelationshipTypeDto);
    }
    let userRelationshipType: any = new UserRelationshipTypes();
    userRelationshipType.user = user;
    userRelationshipType.relationshipType = relationshipType;
    let tmp = await this.usersRelationshipTypesRepo.findOne({where : {user : user, relationshipType : relationshipType}});
    if(tmp != null) {
      throw new ConflictException('You already have this relationship type');
    }
    return this.usersRelationshipTypesRepo.save(userRelationshipType);
  }

  create(
    createRelationshipTypeDto: CreateRelationshipTypeDto,
  ): Promise<RelationshipTypes> {
    return this.repo.save(createRelationshipTypeDto);
  }
}

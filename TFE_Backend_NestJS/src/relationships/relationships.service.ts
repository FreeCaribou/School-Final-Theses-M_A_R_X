import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Relationships } from './relationships.entity';
import { Users } from 'src/users/users.entity';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UserRelationshipTypes } from 'src/user-relationship-types/user-relationship-types.entity';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(Relationships)
    private readonly repo: Repository<Relationships>,
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
    @InjectRepository(UserRelationshipTypes)
    private readonly userRelationshipTypesRepo: Repository<
      UserRelationshipTypes
    >,
  ) { }

  async findOne(id: number): Promise<Relationships> {
    return this.repo.findOneOrFail(id, { relations: ['userRelationshipType', 'userRelationshipType.user', 'userRelationshipType.relationshipType'] });
  }

  async findAllByUser(id: number): Promise<Relationships[]> {
    // TODO do that with real ORM

    // return this.repo.find({
    //   relations: [
    //     'userRelationshipType',
    //     'userRelationshipType.user',
    //     'userRelationshipType.relationshipType',
    //   ],
    //   join: {
    //     alias: "relationship",
    //     innerJoinAndSelect: {
    //       userRelationshipType: "relationship.userRelationshipType",
    //       user: "userRelationshipType.user",
    //       relationshipType: "userRelationshipType.relationshipType"
    //     }
    //   },
    //   where: {
    //     userRelationshipType: {
    //       user: { id: id },
    //     },
    //   },
    // });

    return this.repo
      .createQueryBuilder('relationship')
      .innerJoinAndSelect(
        'relationship.userRelationshipType',
        'userRelationshipType',
      )
      .innerJoinAndSelect(
        'userRelationshipType.user',
        'user',
        'user.id = :id',
        { id: id },
      )
      .innerJoinAndSelect(
        'userRelationshipType.relationshipType',
        'relationshipType',
      )
      .getMany();
  }

  async create(
    createRelationshipDto: CreateRelationshipDto,
  ): Promise<Relationships> {
    const userRelationshipType = await this.userRelationshipTypesRepo.findOne(
      createRelationshipDto.userRelationshipTypeId,
      {
        where: { user: { id: createRelationshipDto.tokenUserId } },
      },
    );
    if (userRelationshipType == null) {
      throw new ConflictException("This relationship type don't exist");
    }
    const relationship = new Relationships();
    relationship.name = createRelationshipDto.name;
    relationship.userRelationshipType = userRelationshipType;
    return this.repo.save(relationship);
  }
}

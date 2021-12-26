import { Module } from '@nestjs/common';
import { UserRelationshipTypesController } from './user-relationship-types.controller';
import { UserRelationshipTypesService } from './user-relationship-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRelationshipTypes } from './user-relationship-types.entity';
import { Users } from 'src/users/users.entity';
import { RelationshipTypes } from 'src/relationship-types/relationship-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRelationshipTypes, Users, RelationshipTypes])],
  controllers: [UserRelationshipTypesController],
  providers: [UserRelationshipTypesService]
})
export class UserRelationshipTypesModule {}

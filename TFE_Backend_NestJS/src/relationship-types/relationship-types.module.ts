import { Module } from '@nestjs/common';
import { RelationshipTypesController } from './relationship-types.controller';
import { RelationshipTypesService } from './relationship-types.service';
import { TypeOrmModule, InjectRepository } from '@nestjs/typeorm';
import { RelationshipTypes } from './relationship-types.entity';
import { Users } from 'src/users/users.entity';
import { UserRelationshipTypes } from 'src/user-relationship-types/user-relationship-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelationshipTypes, Users, UserRelationshipTypes])],
  controllers: [RelationshipTypesController],
  providers: [RelationshipTypesService],
})
export class RelationshipTypesModule {}

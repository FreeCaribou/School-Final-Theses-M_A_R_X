import { Module } from '@nestjs/common';
import { RelationshipsController } from './relationships.controller';
import { RelationshipsService } from './relationships.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relationships } from './relationships.entity';
import { Users } from 'src/users/users.entity';
import { UserRelationshipTypes } from 'src/user-relationship-types/user-relationship-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Relationships, Users, UserRelationshipTypes])],
  controllers: [RelationshipsController],
  providers: [RelationshipsService]
})
export class RelationshipsModule {}

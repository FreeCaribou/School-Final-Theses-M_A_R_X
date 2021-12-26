import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRelationshipTypes } from 'src/user-relationship-types/user-relationship-types.entity';

@Entity()
export class RelationshipTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(type => UserRelationshipTypes, userRelationshipType => userRelationshipType.relationshipType)
  userRelationshipTypes: UserRelationshipTypes[];
}

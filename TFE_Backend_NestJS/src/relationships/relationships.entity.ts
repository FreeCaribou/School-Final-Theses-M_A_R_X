import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserRelationshipTypes } from 'src/user-relationship-types/user-relationship-types.entity';

@Entity()
export class Relationships {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToOne(
    type => UserRelationshipTypes,
    userRelationshipType => userRelationshipType.relationships,
  )
  userRelationshipType: UserRelationshipTypes;
}

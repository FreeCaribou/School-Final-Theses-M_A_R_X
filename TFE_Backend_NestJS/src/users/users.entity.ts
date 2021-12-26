import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserRelationshipTypes } from 'src/user-relationship-types/user-relationship-types.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idAuth: string;

  @Column({ length: 50 })
  username: string;

  @Column()
  mail: string;

  @OneToMany(type => UserRelationshipTypes, userRelationshipType => userRelationshipType.relationshipType)
  userRelationshipTypes: UserRelationshipTypes[];
}

import { RelationshipType } from './RelationshipType';
import { User } from './User';
export class UserRelationshipType {
    id: number;
    relationshipType: RelationshipType;
    user: User;
    reminderDate: number;
}

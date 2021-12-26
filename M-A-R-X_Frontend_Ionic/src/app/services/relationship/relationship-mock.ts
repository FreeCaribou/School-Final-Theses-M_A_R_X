import { UserRelationshipType } from './../../models/UserRelationshipType';
import { MOCK_GET_ONE_USER } from '../user/user-mock';
import { Relationship } from 'src/app/models/Relationship';
import { RelationshipType } from 'src/app/models/RelationshipType';
export const MOCK_ONE_USER_RELATIONSHIP_TYPE: UserRelationshipType = {
    id: 1,
    relationshipType: {
        id: 1,
        name: 'Friend'
    },
    reminderDate: 0,
    user: MOCK_GET_ONE_USER
};

export const MOCK_ALL_USER_RELATIONSHIP_TYPE: UserRelationshipType[] = [
    {
        id: 1,
        relationshipType: {
            id: 1,
            name: 'Friend'
        },
        reminderDate: 0,
        user: MOCK_GET_ONE_USER
    },
    {
        id: 2,
        relationshipType: {
            id: 2,
            name: 'Familly'
        },
        reminderDate: 5,
        user: MOCK_GET_ONE_USER
    },
    {
        id: 3,
        relationshipType: {
            id: 3,
            name: 'Other'
        },
        reminderDate: 1,
        user: MOCK_GET_ONE_USER
    }
];

export const MOCK_ONE_RELATIONSHIP: Relationship = {
    id: 1,
    name: 'Thibault',
    userRelationshipType: MOCK_ONE_USER_RELATIONSHIP_TYPE
};

export const MOCK_ALL_RELATIONSHIP: Relationship[] = [
    MOCK_ONE_RELATIONSHIP,
    {
        id: 2,
        name: 'Samy',
        userRelationshipType: MOCK_ONE_USER_RELATIONSHIP_TYPE
    }
];

export const MOCK_ALL_RELATIONSHIP_TYPE: RelationshipType[] = [
    { id: 1, name: 'Friend' },
    { id: 2, name: 'Familly' },
    { id: 3, name: 'Other' }
];

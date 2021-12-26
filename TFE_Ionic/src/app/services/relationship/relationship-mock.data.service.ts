import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IRelationshipService } from './relationship-service.interface';
import {
    MOCK_ONE_USER_RELATIONSHIP_TYPE,
    MOCK_ONE_RELATIONSHIP,
    MOCK_ALL_RELATIONSHIP,
    MOCK_ALL_USER_RELATIONSHIP_TYPE
} from './relationship-mock';

@Injectable({
    providedIn: 'root'
})
export class RelationshipMockDataService implements IRelationshipService {

    getAllRelationshipType(): Observable<any> {
        return of(MOCK_ALL_USER_RELATIONSHIP_TYPE);
    }

    getAllRelationship(): Observable<any> {
        return of(MOCK_ALL_RELATIONSHIP);
    }

    postRelationship(relationship: any): Observable<any> {
        return of(MOCK_ONE_RELATIONSHIP);
    }

    getOneRelationship(id: number): Observable<any> {
        return of(MOCK_ONE_RELATIONSHIP);
    }

    changeReminderDelayRelationshipType(idUserRelationshipType: number, reminderDate: number) {
        return of(MOCK_ONE_RELATIONSHIP);
    }

    deleteOneRelationship(id): Observable<any> {
        return of(MOCK_ONE_RELATIONSHIP);
    }

}

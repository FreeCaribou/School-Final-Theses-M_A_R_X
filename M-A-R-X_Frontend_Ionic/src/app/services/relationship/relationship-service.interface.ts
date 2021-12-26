import { Observable } from 'rxjs';

export interface IRelationshipService {
    getAllRelationshipType(): Observable<any>;
    getAllRelationship(): Observable<any>;
    postRelationship(relationship): Observable<any>;
    getOneRelationship(id: number): Observable<any>;
    changeReminderDelayRelationshipType(idUserRelationshipType: number, reminderDate: number);
    deleteOneRelationship(id): Observable<any>;
}

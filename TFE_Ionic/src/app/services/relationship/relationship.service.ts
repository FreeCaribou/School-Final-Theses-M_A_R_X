import { Injectable } from '@angular/core';
import { RelationshipDataService } from './relationship.data.service';
import { IRelationshipService } from './relationship-service.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService implements IRelationshipService {

  constructor(private service: RelationshipDataService) { }

  getAllRelationshipType(): Observable<any> {
    return this.service.getAllRelationshipType();
  }

  getAllRelationship(): Observable<any> {
    return this.service.getAllRelationship();
  }

  postRelationship(relationship: any): Observable<any> {
    return this.service.postRelationship(relationship);
  }

  getOneRelationship(id: number): Observable<any> {
    return this.service.getOneRelationship(id);
  }

  changeReminderDelayRelationshipType(idUserRelationshipType: number, reminderDate: number) {
    return this.service.changeReminderDelayRelationshipType(idUserRelationshipType, reminderDate);
  }

  deleteOneRelationship(id): Observable<any> {
    return this.service.deleteOneRelationship(id);
  }

}

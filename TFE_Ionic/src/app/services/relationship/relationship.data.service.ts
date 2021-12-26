import { BaseService } from './../base.service';
import { Injectable } from '@angular/core';
import { IRelationshipService } from './relationship-service.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelationshipDataService implements IRelationshipService {
  baseUrl = 'relationship';

  constructor(private baseService: BaseService) { }

  getAllRelationshipType(): Observable<any> {
    return this.baseService.get(this.baseUrl + '/relationshipType');
  }

  getAllRelationship(): Observable<any> {
    return this.baseService.get(this.baseUrl);
  }

  postRelationship(relationship: any): Observable<any> {
    return this.baseService.post(this.baseUrl, relationship);
  }

  getOneRelationship(id: number): Observable<any> {
    return this.baseService.get(this.baseUrl + '/' + id);
  }

  changeReminderDelayRelationshipType(idUserRelationshipType: number, reminderDate: number) {
    return this.baseService.put(this.baseUrl + '/userRelationshipTypeDelay/' + idUserRelationshipType, { reminderDate });
  }

  deleteOneRelationship(id): Observable<any> {
    return this.baseService.delete(this.baseUrl + '/' + id);
  }

}

import { BaseService } from './../base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentService } from './payment-service.interface';
import { Payment } from 'src/app/models/Payment';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PaymentDataService implements IPaymentService {
    baseUrl = 'payment';

    constructor(private baseService: BaseService) { }

    getAllPayment(refunded: boolean, numberRow: number, relationshipId: number, type?: string): Observable<any> {
        let params = new HttpParams();
        if (refunded != null) {
            params = params.append('refunded', refunded.toString());
        }
        if (numberRow) {
            params = params.append('number_row', numberRow.toString());
        }
        if (relationshipId) {
            params = params.append('relationship_id', relationshipId.toString());
        }
        if (type) {
            params = params.append('type', type.toString());
        }
        return this.baseService.get(this.baseUrl + '?' + params.toString());
    }

    getOnePayement(id: number): Observable<any> {
        return this.baseService.get(this.baseUrl + '/' + id);
    }

    // TODO must change the json to correspond to the BackEnd
    create(payment: Payment): Observable<any> {
        return this.baseService.post(this.baseUrl, payment);
    }

    refunded(id: number): Observable<any> {
        return this.baseService.put(this.baseUrl + '/refunded/' + id, null);
    }

    getSuggestedCurrencies(): Observable<any> {
        return this.baseService.get(this.baseUrl + '/suggestedCurrencies');
    }

    addReminderDate(reminderDate): Observable<any> {
        return this.baseService.post(this.baseUrl + '/reminderDate', reminderDate);
    }

    deleteOnePayment(id): Observable<any> {
        return this.baseService.delete(this.baseUrl + '/' + id);
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentService } from './payment-service.interface';
import { PaymentDataService } from './payment.data.service';
import { Payment } from 'src/app/models/Payment';

@Injectable({
    providedIn: 'root'
})
export class PaymentService implements IPaymentService {

    constructor(private service: PaymentDataService) { }

    getAllPayment(refunded: boolean, numberRow: number, relationshipId: number, type?: string): Observable<any> {
        return this.service.getAllPayment(refunded, numberRow, relationshipId, type);
    }

    getOnePayement(id: number): Observable<any> {
        return this.service.getOnePayement(id);
    }

    create(payment: Payment): Observable<any> {
        return this.service.create(payment);
    }

    refunded(id: number): Observable<any> {
        return this.service.refunded(id);
    }

    getSuggestedCurrencies(): Observable<any> {
        return this.service.getSuggestedCurrencies();
    }

    addReminderDate(reminderDate): Observable<any> {
        return this.service.addReminderDate(reminderDate);
    }

    deleteOnePayment(id): Observable<any> {
        return this.service.deleteOnePayment(id);
    }
}

import { MOCK_ALL_PAYMENT, MOCK_ONE_PAYMENT, MOCK_SUGGESTED_CURRENCIES } from './payment-mock';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPaymentService } from './payment-service.interface';
import { Payment } from 'src/app/models/Payment';


@Injectable({
    providedIn: 'root'
})
export class PaymentMockDataService implements IPaymentService {

    // Maybe TODO have more precise Mock?

    getAllPayment(refunded: boolean, numberRow: number, relationshipId: number, type: string): Observable<any> {
        return of(MOCK_ALL_PAYMENT);
    }

    getOnePayement(id: number): Observable<any> {
        return of(MOCK_ONE_PAYMENT);
    }

    create(payment: Payment): Observable<any> {
        return of(MOCK_ONE_PAYMENT);
    }

    refunded(id: number): Observable<any> {
        return of(MOCK_ONE_PAYMENT);
    }

    getSuggestedCurrencies(): Observable<any> {
        return of(MOCK_SUGGESTED_CURRENCIES);
    }

    addReminderDate(reminderDate): Observable<any> {
        return of(MOCK_ONE_PAYMENT);
    }

    deleteOnePayment(id): Observable<any> {
        return of(MOCK_ONE_PAYMENT);
    }
}

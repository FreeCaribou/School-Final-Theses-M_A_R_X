import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/Payment';

export interface IPaymentService {
    // type is deb or cre
    getAllPayment(refunded: boolean, numberRow: number, relationshipId: number, type?: string): Observable<any>;
    getOnePayement(id: number): Observable<any>;
    create(payment: Payment): Observable<any>;
    refunded(id: number): Observable<any>;
    getSuggestedCurrencies(): Observable<any>;
    addReminderDate(reminderDate): Observable<any>;
    deleteOnePayment(id): Observable<any>;
}

import { Relationship } from './Relationship';

export class Payment {
    id: number;
    relationship: Relationship;
    currency: string;
    title: string;
    detail: string;
    amount: number;
    date: Date;
    type: string; // deb or cre
    refunded: boolean;
    refundedDate: Date;
}

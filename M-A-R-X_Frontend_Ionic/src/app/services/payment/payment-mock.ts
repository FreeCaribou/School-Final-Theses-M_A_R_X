import { Payment } from './../../models/Payment';
import { MOCK_ONE_RELATIONSHIP } from '../relationship/relationship-mock';
import { ReminderDate } from 'src/app/models/ReminderDate';

export const MOCK_ONE_PAYMENT: Payment = {
    id: 1,
    relationship: MOCK_ONE_RELATIONSHIP,
    date: new Date(),
    currency: 'Euro',
    title: 'Restaurant',
    detail: 'Italian restaurant, two pizzas',
    amount: 22.75,
    type: 'deb',
    refunded: false,
    refundedDate: null,
    reminderDate: null
};

export const MOCK_ALL_PAYMENT: Payment[] = [
    MOCK_ONE_PAYMENT,
    {
        id: 2,
        relationship: MOCK_ONE_RELATIONSHIP,
        date: new Date(),
        currency: 'Euro',
        title: 'Jeux',
        detail: 'Europa Universalis',
        amount: 45.5,
        type: 'cre',
        refunded: true,
        refundedDate: new Date(),
        reminderDate: null
    }
];

// TODO better date
export const MOCK_ONE_REMINDER_DATE: ReminderDate = {
    id: 1,
    payment: MOCK_ONE_PAYMENT,
    date: new Date()
};

export const MOCK_SUGGESTED_CURRENCIES: string[] = [
    'Euro',
    'Dollar',
    'Yen',
    'Gold',
    'Ecu',
    'PokeDollar',
    'Other'
];

import { Bank } from './bank';

export interface PaymentMethod {
    type: string;
    card: string;
    bank: Bank;
    paymentMethodToken: string;
}
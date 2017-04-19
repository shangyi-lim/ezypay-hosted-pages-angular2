import { PaymentMethod } from './payment-method';
import { PaymentFormError } from './payment-form-error';

export interface PaymentFormResponse{
    data: PaymentMethod;
    error: PaymentFormError;
    isCancelled: boolean;
}
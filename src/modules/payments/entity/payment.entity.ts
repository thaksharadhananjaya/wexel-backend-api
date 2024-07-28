import { AutoMap } from '@automapper/classes';

export class PaymentEntity {
    @AutoMap()
    id: string;

    @AutoMap()
    appointmentId: string;

    @AutoMap()
    amount: number;

    @AutoMap()
    paymentType: PaymentType;

    @AutoMap()
    status: Status;
}

export const STATUS: {
    SUCCESS: 'SUCCESS';
    FAILED: 'FAILED';
} = {
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
};

export const PAYMENT_TYPE: {
    CARD: 'CARD';
} = {
    CARD: 'CARD',
};

export type Status = (typeof STATUS)[keyof typeof STATUS];
export type PaymentType = (typeof PAYMENT_TYPE)[keyof typeof PAYMENT_TYPE];

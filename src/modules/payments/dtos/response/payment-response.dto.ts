import { PaymentType, Status } from '../../entity/payment.entity';
import { AutoMap } from '@automapper/classes';

export class PaymentResponseDto {
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

    @AutoMap()
    createdAt: Date;
    @AutoMap()
    updatedAt: Date;
}

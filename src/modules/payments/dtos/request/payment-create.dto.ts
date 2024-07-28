import { PaymentType, Status } from '../../entity/payment.entity';
import { AutoMap } from '@automapper/classes';

export class PaymentCreateDto {
    @AutoMap()
    amount: number;
    @AutoMap()
    paymentType: PaymentType;
    @AutoMap()
    status: Status;
}

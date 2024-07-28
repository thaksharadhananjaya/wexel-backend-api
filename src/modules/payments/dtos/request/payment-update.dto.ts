import { PaymentType, Status } from '../../entity/payment.entity';
import { AutoMap } from '@automapper/classes';

export class PaymentUpdateDto {
    @AutoMap()
    amount?: number;
    @AutoMap()
    paymentType?: PaymentType;
    @AutoMap()
    status?: Status;
}

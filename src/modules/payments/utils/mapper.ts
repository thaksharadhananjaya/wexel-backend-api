import { PaymentCreateDto } from '../dtos/request/payment-create.dto';
import { PaymentUpdateDto } from '../dtos/request/payment-update.dto';
import { PaymentResponseDto } from '../dtos/response/payment-response.dto';
import { PaymentEntity } from '../entity/payment.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';

// Create and export the mapper
export const mapper = createMapper({
    strategyInitializer: classes(),
});

createMap(mapper, PaymentEntity, PaymentResponseDto);
createMap(mapper, PaymentCreateDto, PaymentEntity);
createMap(mapper, PaymentUpdateDto, PaymentEntity);

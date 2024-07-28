import { UseCreateDto } from '../dtos/request/appointment-create.dto';
import { AppointmentUpdateDto } from '../dtos/request/appointment-update.dto';
import { AppointmentResponseDto } from '../dtos/response/appointment-response.dto';
import { AppointmentEntity } from '../entity/appointment.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';

// Create and export the mapper
export const mapper = createMapper({
    strategyInitializer: classes(),
});

createMap(mapper, AppointmentEntity, AppointmentResponseDto);
createMap(mapper, UseCreateDto, AppointmentEntity);
createMap(mapper, AppointmentUpdateDto, AppointmentEntity);

import { DoctorDetailsCreateDto } from '../dtos/request/doctor-details-create.dto';
import { DoctorDetailsUpdateDto } from '../dtos/request/doctor-details-update.dto';
import { DoctorDetailsResponseDto } from '../dtos/response/doctor-details-response.dto';
import { DoctorDetailsEntity } from '../entity/doctor-details.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';

// Create and export the mapper
export const mapper = createMapper({
    strategyInitializer: classes(),
});

createMap(mapper, DoctorDetailsEntity, DoctorDetailsResponseDto);
createMap(mapper, DoctorDetailsCreateDto, DoctorDetailsEntity);
createMap(mapper, DoctorDetailsUpdateDto, DoctorDetailsEntity);

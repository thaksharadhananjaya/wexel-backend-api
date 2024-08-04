import { RoleCreateDto } from '../dtos/request/role-create.dto';
import { RoleUpdateDto } from '../dtos/request/role-update.dto';
import { RoleResponseDto } from '../dtos/response/role-response.dto';
import { RoleEntity } from '../entity/role.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper } from '@automapper/core';

// Create and export the mapper
export const mapper = createMapper({
    strategyInitializer: classes(),
});

createMap(mapper, RoleEntity, RoleResponseDto);
createMap(mapper, RoleCreateDto, RoleEntity);
createMap(mapper, RoleUpdateDto, RoleEntity);

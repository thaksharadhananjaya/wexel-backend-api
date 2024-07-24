import { UseCreateDto } from '../dtos/request/user-create.dto';
import { UserUpdateDto } from '../dtos/request/user-update.dto';
import { UserResponseDto } from '../dtos/response/user-response.dto';
import { UserEntity } from '../entity/user.entity';
import { classes } from '@automapper/classes';
import { createMap, createMapper, forMember, mapFrom } from '@automapper/core';

// Create and export the mapper
export const mapper = createMapper({
    strategyInitializer: classes(),
});

createMap(
    mapper,
    UserEntity,
    UserResponseDto,
    forMember(
        (destination) => destination.roles,
        mapFrom((source) =>
            source.rolesOnUser?.map((roleOnUser) => roleOnUser?.role.name)
        )
    )
);
createMap(mapper, UseCreateDto, UserEntity);
createMap(mapper, UserUpdateDto, UserEntity);

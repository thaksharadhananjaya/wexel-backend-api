import { RoleEntity } from '../../roles/entity/role.entity';
import { AutoMap } from '@automapper/classes';

export class UserEntity {
    @AutoMap()
    id: string;
    @AutoMap()
    name: string;
    @AutoMap()
    email: string;
    @AutoMap()
    username: string;
    @AutoMap()
    profilePictureUrl?: string;
    @AutoMap()
    birthDay: Date;
    @AutoMap()
    gender: Gender;
    @AutoMap()
    rolesOnUser?: RoleOnUser[];

    @AutoMap()
    createdAt: Date;
    @AutoMap()
    updatedAt?: Date;
}

interface RoleOnUser {
    userId: string;
    roleId: string;
    role: RoleEntity;

    createdAt: Date;
    updatedAt?: Date;
}

export const GENDER: {
    MALE: 'MALE';
    FEMALE: 'FEMALE';
} = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
};

export type Gender = (typeof GENDER)[keyof typeof GENDER];

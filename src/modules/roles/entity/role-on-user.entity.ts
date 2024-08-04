import { AutoMap } from '@automapper/classes';

export class RoleOnUserEntity {
    @AutoMap()
    userId: string;
    @AutoMap()
    roleId: string;

    @AutoMap()
    createdAt: Date;
    @AutoMap()
    updatedAt?: Date;
}

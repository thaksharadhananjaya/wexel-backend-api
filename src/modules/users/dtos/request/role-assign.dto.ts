import { AutoMap } from '@automapper/classes';

export class RoleAssignDto {
    @AutoMap()
    roleName: string;
}

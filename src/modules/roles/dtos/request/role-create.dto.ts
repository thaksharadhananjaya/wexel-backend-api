import { AutoMap } from '@automapper/classes';

export class RoleCreateDto {
    @AutoMap()
    name: string;
}

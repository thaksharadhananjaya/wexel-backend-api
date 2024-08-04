import { AutoMap } from '@automapper/classes';

export class RoleUpdateDto {
    @AutoMap()
    name?: string;
}

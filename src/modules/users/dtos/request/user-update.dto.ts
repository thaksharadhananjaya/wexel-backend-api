import { AutoMap } from "@automapper/classes";

export class UserUpdateDto {
  @AutoMap()
  name: string;
  @AutoMap()
  address: string;
}

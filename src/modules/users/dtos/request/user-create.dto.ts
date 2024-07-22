import { AutoMap } from "@automapper/classes";

export class UseCreateDto {
  @AutoMap()
  name: string;
  @AutoMap()
  address: string;
}

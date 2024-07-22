import { AutoMap } from "@automapper/classes";

export class UserResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  address: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}

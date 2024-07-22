import { AutoMap } from "@automapper/classes";
import { Gender } from "../../entity/user.entity";

export class UserResponseDto {
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
  createdAt: Date;
  @AutoMap()
  updatedAt: Date;
}

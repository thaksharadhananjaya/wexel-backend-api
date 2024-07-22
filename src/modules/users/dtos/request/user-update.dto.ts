import { AutoMap } from "@automapper/classes";
import { Gender } from "../../entity/user.entity";

export class UserUpdateDto {
  @AutoMap()
  name?: string;
  @AutoMap()
  email?: string;
  @AutoMap()
  username?: string;
  @AutoMap()
  profilePictureUrl?: string;
  @AutoMap()
  birthDay?: Date;
  @AutoMap()
  gender?: Gender;
}

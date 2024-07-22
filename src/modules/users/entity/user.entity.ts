import { AutoMap } from "@automapper/classes";

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
  createdAt: Date;
  @AutoMap()
  updatedAt?: Date;
}

export const GENDER: {
  MALE: "MALE";
  FEMALE: "FEMALE";
} = {
  MALE: "MALE",
  FEMALE: "FEMALE",
};

export type Gender = (typeof GENDER)[keyof typeof GENDER];

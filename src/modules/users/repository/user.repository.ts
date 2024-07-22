/**
 * @fileOverview - user domain data access layer implementation
 */

import { UserEntity } from "../entity/user.entity";

let users: UserEntity[] = [
  {
    id: "0001",
    name: "Test Name",
    address: "Sample Address",
    createdAt: new Date("2024-07-22T10:20:30Z"),
  },
  {
    id: "0002",
    name: "Test Name",
    address: "Sample Address",
    createdAt: new Date("2024-07-22T10:20:30Z"),
  },
];

export class UserRepository {
  create(user: UserEntity): UserEntity {
    users.push(user);
    return user;
  }

  findAll(): UserEntity[] {
    return users;
  }

  findOne(id: string): UserEntity {
    return users.find((e) => e.id === id);
  }

  update(id: string, user: UserEntity): UserEntity {
    users = users.filter((e) => e.id !== id);
    users.push(user);
    return user;
  }

  delete(id: string): UserEntity {
    const user = this.findOne(id)
    users = users.filter((e) => e.id !== id);
    return user;
  }
}

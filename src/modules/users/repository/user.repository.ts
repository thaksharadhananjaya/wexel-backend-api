/**
 * @fileOverview - user domain data access layer implementation
 */

import prisma from "../../../config/prisma-client";
import { UserEntity } from "../entity/user.entity";

let users: UserEntity[] = [];

export class UserRepository {
  async create(user: UserEntity): Promise<UserEntity> {
    return prisma.user.create({ data: user });
  }

  async findAll(): Promise<UserEntity[]> {
    return prisma.user.findMany();
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, user: UserEntity): Promise<UserEntity> {
    await prisma.user.update({
      where: { id },
      data: user,
    });

    return this.findOne(id);
  }

  async delete(id: string): Promise<UserEntity> {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

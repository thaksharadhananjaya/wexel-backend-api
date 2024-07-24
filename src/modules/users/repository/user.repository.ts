/**
 * @fileOverview - user domain data access layer implementation
 */
import prisma from '../../../config/prisma-client';
import { IPaginatedResults } from '../../../interfaces/paginated-results.interface';
import { UserEntity } from '../entity/user.entity';

export class UserRepository {
    async create(user: UserEntity): Promise<UserEntity> {
        return prisma.user.create({
            data: { ...user, rolesOnUser: undefined },
        });
    }

    async findAll(
        filters: { role?: string },
        options: {
            page: number;
            limit: number;
        }
    ): Promise<IPaginatedResults<UserEntity>> {
        // set default values
        if (isNaN(options.page)) options.page = 1;
        if (isNaN(options.limit)) options.limit = 100;

        options.page = +options.page;
        options.limit = +options.limit;

        const params = {
            skip: (options.page - 1) * options.limit,
            take: options.limit,
            include: {
                rolesOnUser: {
                    include: {
                        role: true,
                    },
                },
            },
            ...(filters.role && {
                where: {
                    rolesOnUser: {
                        some: {
                            role: {
                                name: filters.role,
                            },
                        },
                    },
                },
            }),
        };

        const queryResults: [number, UserEntity[]] = await prisma.$transaction([
            prisma.user.count({
                where: {
                    deletedAt: null,
                    ...params.where,
                },
            }),
            prisma.user.findMany(params),
        ]);

        return {
            results: queryResults[1],
            page: options.page,
            limit: options.limit,
            totalPages: Math.ceil(queryResults[0] / options.limit),
            totalResults: queryResults[0],
        };
    }

    async findOne(id: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                rolesOnUser: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        return user;
    }

    async update(id: string, user: UserEntity): Promise<UserEntity> {
        await prisma.user.update({
            where: { id },
            data: { ...user, rolesOnUser: undefined },
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

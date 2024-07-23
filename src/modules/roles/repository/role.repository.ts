/**
 * @fileOverview - role domain data access layer implementation
 */
import prisma from '../../../config/prisma-client';
import { IPaginatedResults } from '../../../interfaces/paginated-results.interface';
import { RoleEntity } from '../entity/role.entity';

let roles: RoleEntity[] = [];

export class RoleRepository {
    async create(role: RoleEntity): Promise<RoleEntity> {
        return prisma.role.create({ data: role });
    }

    async findAll(options: {
        page: number;
        limit: number;
    }): Promise<IPaginatedResults<RoleEntity>> {
        // set default values
        if (isNaN(options.page)) options.page = 1;
        if (isNaN(options.limit)) options.limit = 100;

        options.page = +options.page;
        options.limit = +options.limit;

        const params = {
            skip: (options.page - 1) * options.limit,
            take: options.limit,
        };

        const queryResults: [number, RoleEntity[]] = await prisma.$transaction([
            prisma.role.count({
                where: {
                    deletedAt: null,
                },
            }),
            prisma.role.findMany(params),
        ]);

        return {
            results: queryResults[1],
            page: options.page,
            limit: options.limit,
            totalPages: Math.ceil(queryResults[0] / options.limit),
            totalResults: queryResults[0],
        };
    }

    async findOne(id: string): Promise<RoleEntity | null> {
        return prisma.role.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: string, role: RoleEntity): Promise<RoleEntity> {
        await prisma.role.update({
            where: { id },
            data: role,
        });

        return this.findOne(id);
    }

    async delete(id: string): Promise<RoleEntity> {
        return prisma.role.delete({
            where: {
                id,
            },
        });
    }

    async findByName(name: string): Promise<RoleEntity | null> {
        return prisma.role.findFirst({
            where: {
                name,
            },
        });
    }
}

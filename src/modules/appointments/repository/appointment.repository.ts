/**
 * @fileOverview - appointment domain data access layer implementation
 */
import prisma from '../../../config/prisma-client';
import { IPaginatedResults } from '../../../interfaces/paginated-results.interface';
import { AppointmentEntity } from '../entity/appointment.entity';

export class AppointmentRepository {
    async create(appointment: AppointmentEntity): Promise<AppointmentEntity> {
        return prisma.appointment.create({ data: appointment });
    }

    async findAllByUserId(
        userId: string,
        options: {
            page: number;
            limit: number;
        }
    ): Promise<IPaginatedResults<AppointmentEntity>> {
        // set default values
        if (isNaN(options.page)) options.page = 1;
        if (isNaN(options.limit)) options.limit = 100;

        options.page = +options.page;
        options.limit = +options.limit;

        const params = {
            skip: (options.page - 1) * options.limit,
            take: options.limit,
            where: { userId },
        };

        const queryResults: [number, AppointmentEntity[]] =
            await prisma.$transaction([
                prisma.appointment.count({
                    where: {
                        deletedAt: null,
                        ...params.where,
                    },
                }),
                prisma.appointment.findMany(params),
            ]);

        return {
            results: queryResults[1],
            page: options.page,
            limit: options.limit,
            totalPages: Math.ceil(queryResults[0] / options.limit),
            totalResults: queryResults[0],
        };
    }

    async findOne(
        userId: string,
        id: string
    ): Promise<AppointmentEntity | null> {
        const appointment = await prisma.appointment.findUnique({
            where: {
                userId,
                id,
            },
        });

        return appointment;
    }

    async update(
        userId: string,
        id: string,
        appointment: AppointmentEntity
    ): Promise<AppointmentEntity> {
        await prisma.appointment.update({
            where: { userId, id },
            data: appointment,
        });

        return this.findOne(userId, id);
    }

    async delete(userId: string, id: string): Promise<AppointmentEntity> {
        return prisma.appointment.delete({
            where: {
                userId,
                id,
            },
        });
    }

    async findAll(
        filters: { doctorDetailId?: string },
        options: {
            page: number;
            limit: number;
        }
    ): Promise<IPaginatedResults<AppointmentEntity>> {
        // set default values
        if (isNaN(options.page)) options.page = 1;
        if (isNaN(options.limit)) options.limit = 100;

        options.page = +options.page;
        options.limit = +options.limit;

        const params = {
            skip: (options.page - 1) * options.limit,
            take: options.limit,
            where: filters,
        };

        const queryResults: [number, AppointmentEntity[]] =
            await prisma.$transaction([
                prisma.appointment.count({
                    where: {
                        deletedAt: null,
                        ...params.where,
                    },
                }),
                prisma.appointment.findMany(params),
            ]);

        return {
            results: queryResults[1],
            page: options.page,
            limit: options.limit,
            totalPages: Math.ceil(queryResults[0] / options.limit),
            totalResults: queryResults[0],
        };
    }
}

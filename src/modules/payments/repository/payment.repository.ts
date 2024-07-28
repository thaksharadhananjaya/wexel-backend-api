/**
 * @fileOverview - payment domain data access layer implementation
 */
import prisma from '../../../config/prisma-client';
import { IPaginatedResults } from '../../../interfaces/paginated-results.interface';
import { PaymentEntity } from '../entity/payment.entity';

export class PaymentRepository {
    async create(payment: PaymentEntity): Promise<PaymentEntity> {
        return prisma.payment.create({ data: payment });
    }

    async findAllByAppointmentId(
        appointmentId: string
    ): Promise<PaymentEntity | null> {
        return prisma.payment.findUnique({ where: { appointmentId } });
    }

    async findOne(
        appointmentId: string,
        id: string
    ): Promise<PaymentEntity | null> {
        const payment = await prisma.payment.findUnique({
            where: {
                appointmentId,
                id,
            },
        });

        return payment;
    }

    async update(
        appointmentId: string,
        id: string,
        payment: PaymentEntity
    ): Promise<PaymentEntity> {
        await prisma.payment.update({
            where: { appointmentId, id },
            data: payment,
        });

        return this.findOne(appointmentId, id);
    }

    async delete(appointmentId: string, id: string): Promise<PaymentEntity> {
        return prisma.payment.delete({
            where: {
                appointmentId,
                id,
            },
        });
    }

    async findAll(
        filters: { userId?: string },
        options: {
            page: number;
            limit: number;
        }
    ): Promise<IPaginatedResults<PaymentEntity>> {
        // set default values
        if (isNaN(options.page)) options.page = 1;
        if (isNaN(options.limit)) options.limit = 100;

        options.page = +options.page;
        options.limit = +options.limit;

        const params = {
            skip: (options.page - 1) * options.limit,
            take: options.limit,
            ...(filters?.userId && {
                where: { appointment: { userId: filters?.userId } },
            }),
        };
console.log(params);

        const queryResults: [number, PaymentEntity[]] =
            await prisma.$transaction([
                prisma.payment.count({
                    where: {
                        deletedAt: null,
                        ...params.where,
                    },
                }),
                prisma.payment.findMany(params),
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

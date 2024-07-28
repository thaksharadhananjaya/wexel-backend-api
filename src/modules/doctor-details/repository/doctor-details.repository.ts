/**
 * @fileOverview - Doctor Detail domain data access layer implementation
 */
import prisma from '../../../config/prisma-client';
import { DoctorDetailsEntity } from '../entity/doctor-details.entity';

export class DoctorDetailsRepository {
    async create(
        doctorDetail: DoctorDetailsEntity
    ): Promise<DoctorDetailsEntity> {
        return prisma.doctorDetail.create({ data: doctorDetail });
    }

    async findByUserId(userId: string): Promise<DoctorDetailsEntity | null> {
        return prisma.doctorDetail.findUnique({
            where: {
                userId,
            },
        });
    }

    async findById(id: string): Promise<DoctorDetailsEntity | null> {
        return prisma.doctorDetail.findUnique({
            where: {
                id,
            },
        });
    }

    async update(
        userId: string,
        doctorDetail: DoctorDetailsEntity
    ): Promise<DoctorDetailsEntity> {
        await prisma.doctorDetail.update({
            where: { userId },
            data: doctorDetail,
        });

        return this.findByUserId(userId);
    }
}

import { AutoMap } from '@automapper/classes';

export class AppointmentEntity {
    @AutoMap()
    id: string;

    @AutoMap()
    userId: string;

    @AutoMap()
    doctorDetailId: string;

    @AutoMap()
    videoCallUrl: string;

    @AutoMap()
    note?: string;

    @AutoMap()
    appointmentTime: Date;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    updatedAt?: Date;
}

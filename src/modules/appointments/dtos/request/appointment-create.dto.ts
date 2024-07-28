
import { AutoMap } from '@automapper/classes';

export class AppointmentCreateDto {
    @AutoMap()
    doctorDetailId: string;
    @AutoMap()
    videoCallUrl: string;
    @AutoMap()
    note?: string;
    @AutoMap()
    appointmentTime: Date;
}

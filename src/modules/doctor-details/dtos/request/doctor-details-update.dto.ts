import { AutoMap } from '@automapper/classes';

export class DoctorDetailsUpdateDto {
    @AutoMap()
    specialty?: string;
    @AutoMap()
    description?: string;
    @AutoMap()
    hourlyRate: number;
}

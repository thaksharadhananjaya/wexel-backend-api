import { AutoMap } from '@automapper/classes';

export class DoctorDetailsCreateDto {
    @AutoMap()
    specialty: string;
    @AutoMap()
    description: string;
    @AutoMap()
    hourlyRate: number;
}

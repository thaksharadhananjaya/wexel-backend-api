import { AutoMap } from '@automapper/classes';

export class DoctorDetailsEntity {
    @AutoMap()
    id: string;
    @AutoMap()
    userId: string;
    @AutoMap()
    specialty: string;
    @AutoMap()
    description: string;
    @AutoMap()
    createdAt: Date;
    @AutoMap()
    updatedAt?: Date;
}

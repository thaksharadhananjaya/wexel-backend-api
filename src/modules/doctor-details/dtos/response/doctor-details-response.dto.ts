import { AutoMap } from '@automapper/classes';

export class DoctorDetailsResponseDto {
    @AutoMap()
    id: string;
    @AutoMap()
    userId: string;
    @AutoMap()
    specialty: string;
    @AutoMap()
    description: string;
    @AutoMap()
    hourlyRate: number;

    @AutoMap()
    createdAt: Date;
    @AutoMap()
    updatedAt: Date;
}

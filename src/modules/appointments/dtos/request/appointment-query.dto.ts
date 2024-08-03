import { Query } from 'tsoa';
import { QueryDto } from '../../../../dtos';

export class AppointmentQueryDto extends QueryDto{
    @Query()
    doctorDetailId?: string;
}

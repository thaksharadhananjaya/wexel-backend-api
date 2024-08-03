/**
 * @fileOverview - appointment domain REST controller layer implementation
 */
import { IPaginatedResults } from '../../interfaces/paginated-results.interface';
import { AppointmentCreateDto } from './dtos/request/appointment-create.dto';
import { AppointmentUpdateDto } from './dtos/request/appointment-update.dto';
import { AppointmentResponseDto } from './dtos/response/appointment-response.dto';
import { AppointmentService } from './service/appointment.service';
import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags } from 'tsoa';

@Route()
@Tags('Appointments')
export class AppointmentController {
    private appointmentService: AppointmentService;
    constructor() {
        this.appointmentService = new AppointmentService();
    }

    @Post('users/{userId}/appointments')
    public async create(
        @Path() userId: string,
        @Body() appointmentCreateDto: AppointmentCreateDto
    ): Promise<AppointmentResponseDto> {
        return this.appointmentService.create(userId, appointmentCreateDto);
    }

    @Get('users/{userId}/appointments')
    public async findAllByUserId(
        @Path() userId: string,
        @Query() doctorDetailId?: string,
        @Query() page?: number,
        @Query() limit?: number
    ): Promise<IPaginatedResults<AppointmentResponseDto>> {
        return this.appointmentService.findAllByUserId(userId, {
            doctorDetailId,
            page,
            limit,
        });
    }

    @Get('users/{userId}/appointments/{id}')
    public async findOne(
        @Path() userId: string,
        @Path() id: string
    ): Promise<AppointmentResponseDto> {
        return this.appointmentService.findOne(userId, id);
    }

    @Patch('users/{userId}/appointments/{id}')
    public async update(
        @Path() userId: string,
        @Path() id: string,
        @Body() appointmentUpdateDto: AppointmentUpdateDto
    ): Promise<AppointmentResponseDto> {
        return this.appointmentService.update(userId, id, appointmentUpdateDto);
    }

    @Delete('users/{userId}/appointments/{id}')
    public async delete(
        @Path() userId: string,
        @Path() id: string
    ): Promise<AppointmentResponseDto> {
        return this.appointmentService.delete(userId, id);
    }

    @Get('appointments')
    public async findAll(
        @Query() doctorDetailId?: string,
        @Query() page?: number,
        @Query() limit?: number
    ): Promise<IPaginatedResults<AppointmentResponseDto>> {
        return this.appointmentService.findAll({
            doctorDetailId,
            page,
            limit,
        });
    }
}

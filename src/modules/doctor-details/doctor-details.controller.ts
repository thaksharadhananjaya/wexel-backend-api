/**
 * @fileOverview - Doctor Details domain REST controller layer implementation
 */
import { DoctorDetailsCreateDto } from './dtos/request/doctor-details-create.dto';
import { DoctorDetailsUpdateDto } from './dtos/request/doctor-details-update.dto';
import { DoctorDetailsResponseDto } from './dtos/response/doctor-details-response.dto';
import { DoctorDetailsService } from './service/doctor-details.service';
import { Body, Get, Patch, Path, Post, Route, Tags } from 'tsoa';

@Route('users/{userId}/doctor-details')
@Tags('Doctor Details')
export class DoctorDetailsController {
    private doctorDetailsService: DoctorDetailsService;
    constructor() {
        this.doctorDetailsService = new DoctorDetailsService();
    }

    @Post()
    public async create(
        @Path() userId: string,
        @Body() doctorDetailsCreateDto: DoctorDetailsCreateDto
    ): Promise<DoctorDetailsResponseDto> {
        return this.doctorDetailsService.create(userId, doctorDetailsCreateDto);
    }

    @Get()
    public async findOne(
        @Path() userId: string
    ): Promise<DoctorDetailsResponseDto> {
        return this.doctorDetailsService.findByUserId(userId);
    }

    @Patch()
    public async update(
        @Path() userId: string,
        @Body() doctorDetailsUpdateDto: DoctorDetailsUpdateDto
    ): Promise<DoctorDetailsResponseDto> {
        return this.doctorDetailsService.update(userId, doctorDetailsUpdateDto);
    }
}

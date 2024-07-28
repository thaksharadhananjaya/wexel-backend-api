/**
 * @fileOverview - appointment domain service layer implementation
 */
import { NotFoundException } from '../../../exceptions/not-found-exception';
import { IPaginatedResults } from '../../../interfaces/paginated-results.interface';
import objectPicker from '../../../utils/object-picker';
import { DoctorDetailsService } from '../../doctor-details/service/doctor-details.service';
import { UserService } from '../../users/service/user.service';
import { AppointmentCreateDto } from '../dtos/request/appointment-create.dto';
import { AppointmentQueryDto } from '../dtos/request/appointment-query.dto';
import { AppointmentUpdateDto } from '../dtos/request/appointment-update.dto';
import { AppointmentResponseDto } from '../dtos/response/appointment-response.dto';
import { AppointmentEntity } from '../entity/appointment.entity';
import { AppointmentRepository } from '../repository/appointment.repository';
import { mapper } from '../utils/mapper';

export class AppointmentService {
    private appointmentRepository: AppointmentRepository;
    private userService: UserService;
    private doctorDetailService: DoctorDetailsService;
    constructor() {
        this.appointmentRepository = new AppointmentRepository();
        this.userService = new UserService();
        this.doctorDetailService = new DoctorDetailsService();
    }

    /**
     * Creates a new appointment.
     * 
     * @param {string} userId - The user ID 
     * @param {AppointmentCreateDto} appointmentCreateDto - The DTO containing the data to create a new appointment.
     * @returns {AppointmentResponseDto} The created appointment.
     */
    create = async (
        userId: string,
        appointmentCreateDto: AppointmentCreateDto
    ): Promise<AppointmentResponseDto> => {
        // validate user id
        await this.userService.findOne(userId);
        // validate doctor detail id
        await this.doctorDetailService.findById(
            appointmentCreateDto.doctorDetailId
        );

        const appointment = mapper.map(
            appointmentCreateDto,
            AppointmentCreateDto,
            AppointmentEntity
        );

        appointment.userId = userId;

        const createdAppointment =
            await this.appointmentRepository.create(appointment);

        const appointmentDto = mapper.map(
            createdAppointment,
            AppointmentEntity,
            AppointmentResponseDto
        );

        return appointmentDto;
    };

    /**
     * Retrieves all appointments by user id.
     *
     * @param {string} userId - The user ID of the appointment to retrieve.
     * @returns {AppointmentResponseDto[]} An array of appointment DTOs.
     */
    findAllByUserId = async (
        userId: string,
        appointmentQueryDto: AppointmentQueryDto
    ): Promise<IPaginatedResults<AppointmentResponseDto>> => {
        const options = objectPicker(appointmentQueryDto, ['page', 'limit']);

        // validate user id
        await this.userService.findOne(userId);

        const paginateData = await this.appointmentRepository.findAllByUserId(
            userId,
            options
        );
        const results = mapper.mapArray(
            paginateData.results,
            AppointmentEntity,
            AppointmentResponseDto
        );

        return { ...paginateData, results };
    };

    /**
     * Retrieves a appointment by ID.
     *
     * @param {string} userId - The user ID of the appointment to retrieve.
     * @param {string} id - The ID of the appointment to retrieve.
     * @returns {AppointmentResponseDto} The appointment DTO.
     */
    findOne = async (
        userId: string,
        id: string
    ): Promise<AppointmentResponseDto> => {
        // validate user id
        await this.userService.findOne(userId);

        const appointment = await this.appointmentRepository.findOne(
            userId,
            id
        );

        if (!appointment) {
            throw new NotFoundException(`Appointment not found given id ${id}`);
        }
        const appointmentDto = mapper.map(
            appointment,
            AppointmentEntity,
            AppointmentResponseDto
        );

        return appointmentDto;
    };

    /**
     * Updates an existing appointment.
     *
     * @param {string} userId - The user ID of the appointment to retrieve.
     * @param {string} id - The ID of the appointment to update.
     * @param {AppointmentUpdateDto} appointmentUpdateDto - The DTO containing the data to update the appointment.
     * @returns {AppointmentResponseDto} The updated appointment DTO.
     */
    update = async (
        userId: string,
        id: string,
        appointmentUpdateDto: AppointmentUpdateDto
    ): Promise<AppointmentResponseDto> => {
        // validate user id & appointment id
        await this.findOne(userId, id);

        if (appointmentUpdateDto.doctorDetailId) {
            // validate doctor detail id
            await this.doctorDetailService.findById(
                appointmentUpdateDto.doctorDetailId
            );
        }

        const appointment = mapper.map(
            appointmentUpdateDto,
            AppointmentUpdateDto,
            AppointmentEntity
        );

        const updatedAppointment = await this.appointmentRepository.update(
            userId,
            id,
            appointment
        );
        const appointmentDto = mapper.map(
            updatedAppointment,
            AppointmentEntity,
            AppointmentResponseDto
        );

        return appointmentDto;
    };

    /**
     * Deletes a appointment by ID.
     *
     * @param {string} userId - The user ID of the appointment to retrieve.
     * @param {string} id - The ID of the appointment to delete.
     * @returns {AppointmentResponseDto} The deleted appointment DTO.
     */
    delete = async (
        userId: string,
        id: string
    ): Promise<AppointmentResponseDto> => {
        // validate user id & appointment id
        await this.findOne(userId, id);

        const deletedAppointment = await this.appointmentRepository.delete(
            userId,
            id
        );
        const appointmentDto = mapper.map(
            deletedAppointment,
            AppointmentEntity,
            AppointmentResponseDto
        );

        return appointmentDto;
    };

    /**
     * Retrieves all appointments.
     *
     * @returns {AppointmentResponseDto[]} An array of appointment DTOs.
     */
    findAll = async (
        appointmentQueryDto: AppointmentQueryDto
    ): Promise<IPaginatedResults<AppointmentResponseDto>> => {
        const filters = objectPicker(appointmentQueryDto, ['doctorDetailId']);
        const options = objectPicker(appointmentQueryDto, ['page', 'limit']);

        const paginateData = await this.appointmentRepository.findAll(
            filters,
            options
        );
        const results = mapper.mapArray(
            paginateData.results,
            AppointmentEntity,
            AppointmentResponseDto
        );

        return { ...paginateData, results };
    };
}

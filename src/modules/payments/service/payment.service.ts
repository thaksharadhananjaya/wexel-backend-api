/**
 * @fileOverview - payment domain service layer implementation
 */
import { NotFoundException } from '../../../exceptions/not-found-exception';
import { IPaginatedResults } from '../../../interfaces/paginated-results.interface';
import objectPicker from '../../../utils/object-picker';
import { AppointmentService } from '../../appointments/service/appointment.service';
import { PaymentCreateDto } from '../dtos/request/payment-create.dto';
import { PaymentQueryDto } from '../dtos/request/payment-query.dto';
import { PaymentUpdateDto } from '../dtos/request/payment-update.dto';
import { PaymentResponseDto } from '../dtos/response/payment-response.dto';
import { PaymentEntity } from '../entity/payment.entity';
import { PaymentRepository } from '../repository/payment.repository';
import { mapper } from '../utils/mapper';

export class PaymentService {
    private paymentRepository: PaymentRepository;
    private appointmentService: AppointmentService;
    constructor() {
        this.paymentRepository = new PaymentRepository();
        this.appointmentService = new AppointmentService();
    }

    /**
     * Creates a new payment.
     * 
     * @param {string} userId - The user ID 
     * @param {string} appointmentId - The appointment ID
     * @param {PaymentCreateDto} paymentCreateDto - The DTO containing the data to create a new payment.
     * @returns {PaymentResponseDto} The created payment.
     */
    create = async (
        userId: string,
        appointmentId: string,
        paymentCreateDto: PaymentCreateDto
    ): Promise<PaymentResponseDto> => {
        // validate user id and appointment id
        await this.appointmentService.findOne(userId, appointmentId);

        const payment = mapper.map(
            paymentCreateDto,
            PaymentCreateDto,
            PaymentEntity
        );

        payment.appointmentId = appointmentId;

        const createdPayment = await this.paymentRepository.create(payment);

        const paymentDto = mapper.map(
            createdPayment,
            PaymentEntity,
            PaymentResponseDto
        );

        return paymentDto;
    };

    /**
     * Retrieves all payments by user id and appointment id.
     *
     * @param {string} userId - The user ID of the payment to retrieve.
     * @param {string} appointmentId - The appointment ID of the payment to retrieve.
     * @param {string} id - The ID of the payment to retrieve.
     * @returns {PaymentResponseDto[]} An array of payment DTOs.
     */
    findAllByUserId = async (
        userId: string,
        appointmentId: string
    ): Promise<PaymentResponseDto> => {
        // validate user id and appointment id
        await this.appointmentService.findOne(userId, appointmentId);

        const payment =
            await this.paymentRepository.findAllByAppointmentId(appointmentId);

        if (!payment) {
            throw new NotFoundException(
                `Payment not found given user id ${userId} & appointment id ${appointmentId}`
            );
        }

        const paymentDto = mapper.map(
            payment,
            PaymentEntity,
            PaymentResponseDto
        );

        return paymentDto;
    };

    /**
     * Retrieves a payment by user id, appointment id & payment id.
     *
     * @param {string} userId - The user ID of the payment to retrieve.
     * @param {string} appointmentId - The appointment ID of the payment to retrieve.
     * @param {string} id - The ID of the payment to retrieve.
     * @returns {PaymentResponseDto} The payment DTO.
     */
    findOne = async (
        userId: string,
        appointmentId: string,
        id: string
    ): Promise<PaymentResponseDto> => {
        // validate user id and appointment id
        await this.appointmentService.findOne(userId, appointmentId);

        const payment = await this.paymentRepository.findOne(appointmentId, id);

        if (!payment) {
            throw new NotFoundException(`Payment not found given id '${id}'`);
        }
        const paymentDto = mapper.map(
            payment,
            PaymentEntity,
            PaymentResponseDto
        );

        return paymentDto;
    };

    /**
     * Updates an existing payment by user id, appointment id & payment id.
     *
     * @param {string} userId - The user ID of the payment to retrieve.
     * @param {string} appointmentId - The appointment ID of the payment to retrieve.
     * @param {string} id - The ID of the payment to retrieve.
     * @param {PaymentUpdateDto} paymentUpdateDto - The DTO containing the data to update the payment.
     * @returns {PaymentResponseDto} The updated payment DTO.
     */
    update = async (
        userId: string,
        appointmentId: string,
        id: string,
        paymentUpdateDto: PaymentUpdateDto
    ): Promise<PaymentResponseDto> => {
        // validate user id, appointment id and payment id
        await this.findOne(userId, appointmentId, id);

        const payment = mapper.map(
            paymentUpdateDto,
            PaymentUpdateDto,
            PaymentEntity
        );

        const updatedPayment = await this.paymentRepository.update(
            appointmentId,
            id,
            payment
        );
        const paymentDto = mapper.map(
            updatedPayment,
            PaymentEntity,
            PaymentResponseDto
        );

        return paymentDto;
    };

    /**
     * Delete a payment by user id, appointment id & payment id.
     *
     * @param {string} userId - The user ID of the payment to retrieve.
     * @param {string} appointmentId - The appointment ID of the payment to retrieve.
     * @param {string} id - The ID of the payment to retrieve.
     * @returns {PaymentResponseDto} The deleted payment DTO.
     */
    delete = async (
        userId: string,
        appointmentId: string,
        id: string
    ): Promise<PaymentResponseDto> => {
        // validate user id, appointment id and payment id
        await this.findOne(userId, appointmentId, id);

        const deletedPayment = await this.paymentRepository.delete(
            appointmentId,
            id
        );
        const paymentDto = mapper.map(
            deletedPayment,
            PaymentEntity,
            PaymentResponseDto
        );

        return paymentDto;
    };

    /**
     * Retrieves all payments.
     *
     * @param {PaymentQueryDto} paymentQueryDto - Payment related query params
     * @returns {PaymentResponseDto[]} An array of payment DTOs.
     */
    findAll = async (
        paymentQueryDto: PaymentQueryDto
    ): Promise<IPaginatedResults<PaymentResponseDto>> => {
        const filters = objectPicker(paymentQueryDto, ['userId']);
        const options = objectPicker(paymentQueryDto, ['page', 'limit']);

        const paginateData = await this.paymentRepository.findAll(
            filters,
            options
        );
        const results = mapper.mapArray(
            paginateData.results,
            PaymentEntity,
            PaymentResponseDto
        );

        return { ...paginateData, results };
    };
}

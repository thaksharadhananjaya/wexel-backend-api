/**
 * @fileOverview - payment domain REST controller layer implementation
 */
import { IPaginatedResults } from '../../interfaces/paginated-results.interface';
import { PaymentCreateDto } from './dtos/request/payment-create.dto';
import { PaymentUpdateDto } from './dtos/request/payment-update.dto';
import { PaymentResponseDto } from './dtos/response/payment-response.dto';
import { PaymentService } from './service/payment.service';
import { Body, Get, Patch, Path, Post, Query, Route, Tags } from 'tsoa';

@Route()
@Tags('Payments')
export class PaymentController {
    private paymentService: PaymentService;
    constructor() {
        this.paymentService = new PaymentService();
    }

    @Post('users/{userId}/appointments/{appointmentId}/payments')
    public async create(
        @Path() userId: string,
        @Path() appointmentId: string,
        @Body() paymentCreateDto: PaymentCreateDto
    ): Promise<PaymentResponseDto> {
        return this.paymentService.create(
            userId,
            appointmentId,
            paymentCreateDto
        );
    }

    @Get('users/{userId}/appointments/{appointmentId}/payments')
    public async findAllByUserId(
        @Path() userId: string,
        @Path() appointmentId: string
    ): Promise<PaymentResponseDto> {
        return this.paymentService.findByUserId(userId, appointmentId);
    }

    @Get('users/{userId}/appointments/{appointmentId}/payments/{id}')
    public async findOne(
        @Path() userId: string,
        @Path() appointmentId: string,
        @Path() id: string
    ): Promise<PaymentResponseDto> {
        return this.paymentService.findOne(userId, appointmentId, id);
    }

    @Patch('users/{userId}/appointments/{appointmentId}/payments/{id}')
    public async update(
        @Path() userId: string,
        @Path() appointmentId: string,
        @Path() id: string,
        @Body() paymentUpdateDto: PaymentUpdateDto
    ): Promise<PaymentResponseDto> {
        return this.paymentService.update(
            userId,
            appointmentId,
            id,
            paymentUpdateDto
        );
    }

    @Get('payments')
    public async findAll(
        @Query() doctorDetailId?: string,
        @Query() page?: number,
        @Query() limit?: number
    ): Promise<IPaginatedResults<PaymentResponseDto>> {
        return this.paymentService.findAll({
            doctorDetailId,
            page,
            limit,
        });
    }
}

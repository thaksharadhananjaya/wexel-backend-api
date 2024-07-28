/**
 * @fileOverview - payment domain REST controller layer implementation
 */
import { PaymentService } from './service/payment.service';
import { NextFunction, Request, Response } from 'express';

export class PaymentController {
    private paymentService: PaymentService;
    constructor() {
        this.paymentService = new PaymentService();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).send(
                await this.paymentService.create(
                    req.params?.userId,
                    req.params?.appointmentId,
                    req.body
                )
            );
        } catch (error) {
            next(error);
        }
    };

    findAllByUserId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            res.status(200).json(
                await this.paymentService.findAllByUserId(
                    req.params?.userId,
                    req.params?.appointmentId
                )
            );
        } catch (error) {
            next(error);
        }
    };

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.paymentService.findOne(
                    req.params?.userId,
                    req.params?.appointmentId,
                    req.params?.id
                )
            );
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.paymentService.update(
                    req.params?.userId,
                    req.params?.appointmentId,
                    req.params?.id,
                    req.body
                )
            );
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.paymentService.delete(
                    req.params?.userId,
                    req.params?.appointmentId,
                    req.params?.id
                )
            );
        } catch (error) {
            next(error);
        }
    };

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(await this.paymentService.findAll(req.query));
        } catch (error) {
            next(error);
        }
    };
}

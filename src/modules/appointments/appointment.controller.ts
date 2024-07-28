/**
 * @fileOverview - appointment domain REST controller layer implementation
 */
import { AppointmentService } from './service/appointment.service';
import { NextFunction, Request, Response } from 'express';

export class AppointmentController {
    private appointmentService: AppointmentService;
    constructor() {
        this.appointmentService = new AppointmentService();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).send(
                await this.appointmentService.create(
                    req.params?.userId,
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
                await this.appointmentService.findAllByUserId(
                    req.params?.userId,
                    req.query
                )
            );
        } catch (error) {
            next(error);
        }
    };

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.appointmentService.findOne(
                    req.params?.userId,
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
                await this.appointmentService.update(
                    req.params?.userId,
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
                await this.appointmentService.delete(
                    req.params?.userId,
                    req.params?.id
                )
            );
        } catch (error) {
            next(error);
        }
    };

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.appointmentService.findAll(req.query)
            );
        } catch (error) {
            next(error);
        }
    };
}

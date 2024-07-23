/**
 * @fileOverview - Doctor Details domain REST controller layer implementation
 */
import { DoctorDetailsService } from './service/doctor-details.service';
import { NextFunction, Request, Response } from 'express';

export class DoctorDetailsController {
    private doctorDetailsService: DoctorDetailsService;
    constructor() {
        this.doctorDetailsService = new DoctorDetailsService();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).send(
                await this.doctorDetailsService.create(
                    req.params.userId,
                    req.body
                )
            );
        } catch (error) {
            next(error);
        }
    };

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.doctorDetailsService.findByUserId(req.params?.userId)
            );
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.doctorDetailsService.update(
                    req.params?.userId,
                    req.body
                )
            );
        } catch (error) {
            next(error);
        }
    };
}

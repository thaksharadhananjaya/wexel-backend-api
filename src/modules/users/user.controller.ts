/**
 * @fileOverview - user domain REST controller layer implementation
 */
import { UserService } from './service/user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).send(await this.userService.create(req.body));
        } catch (error) {
            next(error);
        }
    };

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(await this.userService.findAll(req.query));
        } catch (error) {
            next(error);
        }
    };

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.userService.findOne(req.params?.id)
            );
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.userService.update(req.params?.id, req.body)
            );
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(await this.userService.delete(req.params?.id));
        } catch (error) {
            next(error);
        }
    };

    assignRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.userService.assignRoleToUser(req.params?.id, req.body)
            );
        } catch (error) {
            next(error);
        }
    };
}

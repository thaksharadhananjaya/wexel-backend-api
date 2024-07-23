/**
 * @fileOverview - role domain REST controller layer implementation
 */
import { RoleService } from './service/role.service';
import { NextFunction, Request, Response } from 'express';

export class RoleController {
    private roleService: RoleService;
    constructor() {
        this.roleService = new RoleService();
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).send(await this.roleService.create(req.body));
        } catch (error) {
            next(error);
        }
    };

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(await this.roleService.findAll(req.query));
        } catch (error) {
            next(error);
        }
    };

    findOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.roleService.findOne(req.params?.id)
            );
        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(
                await this.roleService.update(req.params?.id, req.body)
            );
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(await this.roleService.delete(req.params?.id));
        } catch (error) {
            next(error);
        }
    };
}

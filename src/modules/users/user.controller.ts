/**
 * @fileOverview - user domain REST controller layer implementation
 */

import { NextFunction, Request, Response } from "express";
import { UserService } from "./service/user.service";

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(await this.userService.create(req.body));
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(await this.userService.findAll());
    } catch (error) {
      next(error);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(await this.userService.findOne(req.params?.id));
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(await this.userService.update(req.params?.id, req.body));
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(await this.userService.delete(req.params?.id));
    } catch (error) {
      next(error);
    }
  };
}

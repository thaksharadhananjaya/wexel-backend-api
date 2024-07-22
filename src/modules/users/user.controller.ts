/**
 * @fileOverview - user domain REST controller layer implementation
 */

import { Request, Response } from "express";
import { UserService } from "./service/user.service";

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  create = (req: Request, res: Response) => {
    res.send(this.userService.create(req.body));
  };

  findAll = (req: Request, res: Response) => {
    res.send(this.userService.findAll());
  };

  findOne = (req: Request, res: Response) => {
    res.send(this.userService.findOne(req.params?.id));
  };

  update = (req: Request, res: Response) => {
    res.send(this.userService.update(req.params?.id, req.body));
  };

  delete = (req: Request, res: Response) => {
    res.send(this.userService.delete(req.params?.id));
  };
}

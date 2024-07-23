import { UserController } from './modules/users/user.controller';
import { Router } from 'express';

export class Routes {
    static get routes(): Router {
        const router = Router();
        const userController = new UserController();

        // User routes
        router.get('/users', userController.findAll);
        router.get('/users/:id', userController.findOne);
        router.post('/users', userController.create);
        router.patch('/users/:id', userController.update);
        router.delete('/users/:id', userController.delete);

        return router;
    }
}

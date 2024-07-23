import { DoctorDetailsController } from './modules/doctor-deatils/doctor-details.controller';
import { UserController } from './modules/users/user.controller';
import { Router } from 'express';

export class Routes {
    static get routes(): Router {
        const router = Router();
        const userController = new UserController();
        const doctorDetailController = new DoctorDetailsController();

        // User routes
        router.get('/users', userController.findAll);
        router.get('/users/:id', userController.findOne);
        router.post('/users', userController.create);
        router.patch('/users/:id', userController.update);
        router.delete('/users/:id', userController.delete);

        // Doctor Details routes
        router.get('/users/:userId/doctor-details', doctorDetailController.findOne);
        router.post('/users/:userId/doctor-details', doctorDetailController.create);
        router.patch('/users/:userId/doctor-details', doctorDetailController.update);

        return router;
    }
}

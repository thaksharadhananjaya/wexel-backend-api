import { AppointmentController } from '../modules/appointments/appointment.controller';
import { DoctorDetailsController } from '../modules/doctor-details/doctor-details.controller';
import { PaymentController } from '../modules/payments/payment.controller';
import { RoleController } from '../modules/roles/role.controller';
import { UserController } from '../modules/users/user.controller';
import { Router } from 'express';

export class Routes {
    static get routes(): Router {
        const router = Router();
        const userController = new UserController();
        const doctorDetailController = new DoctorDetailsController();
        const roleController = new RoleController();
        const appointmentController = new AppointmentController();
        const paymentController = new PaymentController();


        router.get('/users', userController.findAll);
        router.get('/users/:id', userController.findOne);
        router.post('/users', userController.create);
        router.patch('/users/:id', userController.update);
        router.delete('/users/:id', userController.delete);
        router.post('/users/:id/assign-role', userController.assignRole);

        // Role routes
        router.get('/roles', roleController.findAll);
        router.get('/roles/:id', roleController.findOne);
        router.post('/roles', roleController.create);
        router.patch('/roles/:id', roleController.update);
        router.delete('/roles/:id', roleController.delete);

        // Doctor Details routes
        router.get(
            '/users/:userId/doctor-details',
            doctorDetailController.findOne
        );
        router.post(
            '/users/:userId/doctor-details',
            doctorDetailController.create
        );
        router.patch(
            '/users/:userId/doctor-details',
            doctorDetailController.update
        );

        // Appointment routes
        router.get('/users/:userId/appointments', appointmentController.findAllByUserId);
        router.get('/users/:userId/appointments/:id', appointmentController.findOne);
        router.post('/users/:userId/appointments', appointmentController.create);
        router.patch('/users/:userId/appointments/:id', appointmentController.update);
        router.delete('/users/:userId/appointments/:id', appointmentController.delete);
        router.get('/appointments', appointmentController.findAll);

        // Payment routes
        router.get('/users/:userId/appointments/:appointmentId/payments', paymentController.findAllByUserId);
        router.get('/users/:userId/appointments/:appointmentId/payments/:id', paymentController.findOne);
        router.post('/users/:userId/appointments/:appointmentId/payments', paymentController.create);
        router.patch('/users/:userId/appointments/:appointmentId/payments/:id', paymentController.update);
        router.delete('/users/:userId/appointments/:appointmentId/payments/:id', paymentController.delete);
        router.get('/payments', paymentController.findAll);

        return router;
    }
}

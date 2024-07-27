import { DoctorDetailsController } from '../modules/doctor-details/doctor-details.controller';
import { RoleController } from '../modules/roles/role.controller';
import { UserController } from '../modules/users/user.controller';
import { Router } from 'express';

export class Routes {
    static get routes(): Router {
        const router = Router();
        const userController = new UserController();
        const doctorDetailController = new DoctorDetailsController();
        const roleController = new RoleController();

  
        /**
         * @swagger
         * /api/v1/users:
         *   get:
         *     summary: Retrieve a list of users
         *     responses:
         *       200:
         *         description: A list of users
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 type: object
         *                 properties:
         *                   id:
         *                     type: integer
         *                     example: 1
         *                   name:
         *                     type: string
         *                     example: John Doe
         */
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

        return router;
    }
}

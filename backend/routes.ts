import { Router } from 'express';
import {CarController} from './src/controller/car.controller';
import { DriverController } from './src/controller/driver.controller';
import { TripsController } from './src/controller/trips.controller';
import { UserController } from './src/controller/user.controller';

export function getRouter() {
    const router = Router();

    const carController = new CarController();
    const driverController = new DriverController();
    const tripsController = new TripsController();
    const userController = new UserController();

    router.get('/car', carController.getAll);
    router.post('/car', carController.create);
    router.delete('/car/:id',carController.delete);
    router.put('/car',carController.update);
    router.get('/car/:id',carController.getOne);

    router.get('/driver', driverController.getAll);
    router.post('/driver', driverController.create);
    router.put('/driver',driverController.update);
    router.get('/driver/:id',driverController.getOne);
    router.get('/driver_okLicense',driverController.getAllWithOkLicense);

    router.get('/trips', tripsController.getAll);
    router.post('/trips', tripsController.create);
    router.put('/trips',tripsController.update);
    router.get('/trips/:id',tripsController.getOne);
    router.get('/trips_filter',tripsController.getAllFiltered);
    router.get('/trips_specific_trip',tripsController.getAllSpecifiedTrip);
    router.get('/trips_lowerDate_trip',tripsController.getAllWhereDateLowerThan);
    router.get('/trips_greaterDate_trip',tripsController.getAllWhereDateGreaterThan);

    router.get('/users', userController.getAll);
    router.get('/user?:search', userController.getUserRole);
    router.post('/users', userController.create);
    router.put('/users', userController.update);
    router.delete('/users/:id',userController.delete);
    router.get('/users/:id',userController.getOne);



    return router;
}
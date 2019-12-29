import { Router } from 'express';
import multer from 'multer';
import configMulter from './config/multer';
import auth from './middleweres/auth';

import UserController from './app/core/user/controller';
import SessionController from './app/core/session/controller';
import FileController from './app/core/file/controller';
import ProviderController from './app/core/provider/controller';
import AppointmentController from './app/core/appointment/controller';
import ScheduleController from './app/core/schedule/controller';
import NotificationController from './app/core/notification/controller';

const routes = new Router();
const upload = multer(configMulter);

// Routes without authentication
routes.post('/users', UserController.store);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/session', SessionController.store);

routes.use(auth);

// Routes with authentication
routes.get('/providers', ProviderController.index);

routes.put('/users', UserController.update);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedules', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

export default routes;

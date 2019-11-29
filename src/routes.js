import { Router } from 'express';
import multer from 'multer';
import configMulter from './config/multer';
import actionFilter from './middleweres/actionfilter';
import auth from './middleweres/auth';

import UserController from './app/core/user/controller';
import SessionController from './app/core/session/controller';
import FileController from './app/core/file/controller';
import ProviderController from './app/core/provider/controller';
import AppointmentController from './app/core/appointment/controller';

const routes = new Router();
const upload = multer(configMulter);

// Routes without authentication
routes.post('/users', actionFilter(UserController.store));

routes.post('/files', upload.single('file'), actionFilter(FileController.store));

routes.post('/session', actionFilter(SessionController.store));

routes.use(auth);

// Routes with authentication
routes.get('/providers', actionFilter(ProviderController.index));

routes.put('/users', actionFilter(UserController.update));

routes.post('/appointments', actionFilter(AppointmentController.store));

export default routes;

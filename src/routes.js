import { Router } from 'express';
import actionFilter from './middleweres/actionfilter';
import auth from './middleweres/auth';

import UserController from './core/user/controller';
import SessionController from './core/session/controller';

const routes = new Router();

// Routes without authentication
routes.post('/users', actionFilter(UserController.store));
routes.post('/session', actionFilter(SessionController.store));

routes.use(auth);

// Routes with authentication
routes.put('/users', actionFilter(UserController.update));

export default routes;

import { Router } from 'express';
import actionFilter from './middleweres/actionfilter';

import UserController from './core/user/controller';

const routes = new Router();

routes.post('/users', actionFilter(UserController.store));

export default routes;

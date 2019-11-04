import { Router } from 'express';
import multer from 'multer';
import configMulter from './config/multer';
import actionFilter from './middleweres/actionfilter';
import auth from './middleweres/auth';

import UserController from './core/user/controller';
import SessionController from './core/session/controller';

const routes = new Router();
const upload = multer(configMulter);

// Routes without authentication
routes.post('/users', actionFilter(UserController.store));
routes.post('/session', actionFilter(SessionController.store));
routes.post('/file', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

routes.use(auth);

// Routes with authentication
routes.put('/users', actionFilter(UserController.update));

export default routes;

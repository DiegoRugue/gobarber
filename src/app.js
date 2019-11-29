import express from 'express';
import { resolve } from 'path';
import routes from './routes';
import response from './middleweres/response';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(response);
    this.server.use('/files', express.static(resolve(process.cwd(), 'temp', 'uploads')));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

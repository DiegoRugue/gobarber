import 'express-async-errors';
import express from 'express';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import { resolve } from 'path';
import routes from './routes';
import configSentry from './config/sentry';
import response from './middleweres/response';
import Queue from './lib/Queue';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(configSentry);

    this.middlewares();
    this.routes();
    this.exceptionHandler();

    Queue.processQueue();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(response);
    this.server.use('/files', express.static(resolve(process.cwd(), 'temp', 'uploads')));
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err.code && err.message) return res.error(err.code, err.message);

      const error = await new Youch(err, req).toJSON();

      return res.error(500, error);
    });
  }
}

export default new App().server;

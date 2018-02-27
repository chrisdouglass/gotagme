import * as express from 'express';
import {ResponseError} from '../../common/response_error';

const setupErrorHandlers = (app: express.Application) => {
  // Development Error Handler - Prints Stacktrace
  if (app.get('env') === 'development') {
    app.use((err: ResponseError, _: express.Request, res: express.Response) => {
      res.status(err.status || 500);
      res.json({error: err.message, status: res.status, stack: err.stack});
    });
  }

  // Production Error Handler - No Stacktrace
  app.use((err: ResponseError, _: express.Request, res: express.Response) => {
    res.status(err.status || 500);
    res.json({error: err.message, status: res.status});
  });
};

module.exports = setupErrorHandlers;

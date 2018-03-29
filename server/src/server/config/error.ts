import {Application, Request, Response} from 'express';

import {ResponseError} from '../../common/types';

export function setupErrorHandlers(app: Application): void {
  const env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    // Development Error Handler - Prints Stacktrace
    app.use((err: ResponseError, {}: Request, res: Response) => {
      res.status(err.status || 500)
          .json({error: err.message, status: res.status, stack: err.stack});
    });
  } else {
    // Production Error Handler - No Stacktrace
    app.use((err: ResponseError, {}: Request, res: Response) => {
      res.status(err.status || 500)
          .json({error: err.message, status: res.status});
    });
  }
}

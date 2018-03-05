import {Application, Request, Response} from 'express';

import {ResponseError} from '../../common/types';

export function setupErrorHandlers(app: Application): void {
  // Development Error Handler - Prints Stacktrace
  const env = process.env.NODE_ENV || 'development';
  if (env === 'development') {
    app.use((err: ResponseError, _: Request, res: Response) => {
      res.status(err.status || 500);
      res.json({error: err.message, status: res.status, stack: err.stack});
    });
  }

  // Production Error Handler - No Stacktrace
  app.use((err: ResponseError, _: Request, res: Response) => {
    res.status(err.status || 500)
        .json({error: err.message, status: res.status});
  });
}

import {Application, Response, NextFunction} from 'express';

export function setupCORS(app: Application): void {
  app.use(({}, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

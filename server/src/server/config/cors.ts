import {Application, Response} from 'express';

export function setupCORS(app: Application): void {
  app.options('/*', ({}, res: Response) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });
}

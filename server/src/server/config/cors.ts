import {Application} from 'express';

export function setupCORS(app: Application): void {
  app.use(require('cors')());
}

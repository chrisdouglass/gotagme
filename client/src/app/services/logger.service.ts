import {Injectable} from '@angular/core';

@Injectable()
export class Logger {
  logs: string[] = [];  // TODO: Send logs somewhere.

  log(message: string) {
    this.logs.push(message);
    console.log(message);
  }
}

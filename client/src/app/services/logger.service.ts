import {Injectable} from '@angular/core';

@Injectable()
export class Logger {
  logs: LogMessage[] = [];  // TODO: Send logs somewhere.
  errors: LogMessage[] = [];  // TODO: Send logs somewhere.

  log(message: string) {
    this.logs.push({message, date: new Date()});
    console.log(message);
  }

  error(message: string) {
    this.errors.push({message, date: new Date()});
    console.error(message);
  }
}

export interface LogMessage {
  message: string;
  date: Date;
}

import { BaseRequestOptions } from '@angular/http';

export class DefaultRequestOptions extends BaseRequestOptions {
  public token: string;
  constructor (customOptions?: any) {
    super();
    let jwt = localStorage.getItem('jwt');
    this.token = jwt;
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.token);
  }
}

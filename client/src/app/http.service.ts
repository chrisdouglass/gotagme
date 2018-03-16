import { Injectable } from '@angular/core';

import { Http, RequestOptions, RequestOptionsArgs, Response, Request, Headers, XHRBackend } from '@angular/http';

import { parse as parseUrl, Url } from 'url';
import { DefaultRequestOptions } from './default.requestoptions';
import { Logger } from './logger.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService extends Http {

  public token: string;
  private logger: Logger;
  private apiUrl: string = 'http://localhost:3000/api/';

  constructor(
      backend: XHRBackend,
      defaultOptions: DefaultRequestOptions) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.get(this.getFullUrl(url), this.requestOptions(options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return super.post(this.getFullUrl(url), body, this.requestOptions(options));
  }

  private getFullUrl(url: string): string {
    return this.apiUrl + url;
  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new DefaultRequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    return options;
  }
}

export function httpServiceFactory(backend: XHRBackend, options: DefaultRequestOptions) {
  return new HttpService(backend, options);
}

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {parse as parseUrl, Url} from 'url';

import {Logger} from '../services';

@Injectable()
export class HttpService {
  private logger: Logger;
  private apiUrl = 'http://localhost:4200/api/';

  constructor(
      private _client: HttpClient,
  ) {}

  // tslint:disable-next-line: no-any
  get(url: string, options?: HttpRequestOptions): Observable<any> {
    return this._client.get(this.getFullUrl(url), options);
  }

  // tslint:disable-next-line: no-any
  post(url: string, body: any, options?: HttpRequestOptions): Observable<any> {
    return this._client.post(this.getFullUrl(url), body, options);
  }

  private getFullUrl(url: string): string {
    return this.apiUrl + url;
  }
}

export interface HttpRequestOptions {
  headers?: HttpHeaders|{
    [header: string]: string|string[];
  };
  observe: 'events';
  params?: HttpParams|{
    [param: string]: string|string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

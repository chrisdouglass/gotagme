import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {parse as parseUrl, Url} from 'url';
import { TokenService, Token } from './token.service';
import { Logger } from './logger.service';

@Injectable()
export class ApiService {
  private apiUrl = 'http://localhost:4200/api/';

  constructor(
      private _logger: Logger,
      private _client: HttpClient,
      private _tokenService: TokenService,
  ) {}

  // tslint:disable-next-line: no-any
  get(url: string, options?: HttpRequestOptions): Observable<any> {
    return this._client.get(this.getFullUrl(url), options);
  }

  // tslint:disable-next-line: no-any
  getWithAuth(url: string, options?: HttpRequestOptions): Observable<any> {
    if (!options) {
      options = {} as HttpRequestOptions;
    }
    return this._tokenService.token().flatMap((jwt: Token) => {
      options.headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
      return this.get(url, options);
    });
  }

  // tslint:disable-next-line: no-any
  post(url: string, body: any, options?: HttpRequestOptions): Observable<any> {
    return this._client.post(this.getFullUrl(url), body, options);
  }

  // tslint:disable-next-line: no-any
  postWithAuth(url: string, body: any, options?: HttpRequestOptions): Observable<any> {
    if (!options) {
      options = {} as HttpRequestOptions;
    }
    return this._tokenService.token().flatMap((jwt: Token) => {
      options.headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
      return this.post(url, body, options);
    });
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
  params?: {
    [param: string]: string|string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

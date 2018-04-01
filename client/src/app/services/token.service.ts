import 'rxjs/add/operator/do';

import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs/Rx';

import {HttpRequestOptions} from './api.service';
import {Logger} from './logger.service';

@Injectable()
export class TokenService {
  static JWT_QUERY_PARAM = 'a';
  static REFRESH_QUERY_PARAM = 'b';

  private static JWT_KEY = 'jwt';
  private static REFRESH_KEY = 'refresh';

  constructor(
      private _client: HttpClient,
      private _logger: Logger,
  ) {}

  token(): Observable<Token> {
    const jwtHelperService = new JwtHelperService();
    if (this.localToken && !jwtHelperService.isTokenExpired(this.localToken)) {
      this._logger.log('Reusing existing JWT.');
      return Observable.create(observer => {
        observer.next(this.localToken);
      });
    }

    const options: HttpRequestOptions = {
      withCredentials: false,
    } as HttpRequestOptions;
    options.params = {
      jwt: this.localToken,
      token: this.refreshToken,
    };
    return this._client.get<Token>('api/login/token', options)
        .do((res: any) => {  // tslint:disable-line: no-any
          this.localToken = res;
          this._logger.log(`Updated JWT ${this.localToken}`);
        });
  }

  get localToken() {
    return localStorage.getItem(TokenService.JWT_KEY);
  }

  set localToken(newToken: Token) {
    if (!newToken) {
      localStorage.removeItem(TokenService.JWT_KEY);
      return;
    }
    localStorage.setItem(TokenService.JWT_KEY, newToken);
  }

  get refreshToken(): Token {
    return localStorage.getItem(TokenService.REFRESH_KEY);
  }

  set refreshToken(newToken: Token) {
    if (!newToken) {
      localStorage.removeItem(TokenService.REFRESH_KEY);
      return;
    }
    localStorage.setItem(TokenService.REFRESH_KEY, newToken);
  }
}

export type Token = string;

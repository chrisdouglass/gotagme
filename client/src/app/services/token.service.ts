import {Injectable} from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Logger } from './logger.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpRequestOptions } from './api.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenService {
  static JWT_KEY: Token = 'jwt';
  static REFRESH_KEY: Token = 'refresh';
  private _jwtHelper: JwtHelperService;

  constructor(
    private _client: HttpClient,
    private _logger: Logger,
  ) {
    this._jwtHelper = new JwtHelperService();
  }

  token(): Observable<Token> {
    if (this.localToken && !this._jwtHelper.isTokenExpired(this.localToken)) {
      this._logger.log('using existing jwt ' + this.localToken);
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

    return this._client.get<Token>('api/login/token', options).do((res: any) => {
      this.localToken = res;
      this._logger.log('received new jwt ' + this.localToken);
    });
  }

  get localToken() {
    return localStorage.getItem(TokenService.JWT_KEY);
  }

  set localToken(newToken: Token) {
    localStorage.setItem(TokenService.JWT_KEY, newToken);
  }

  get refreshToken(): Token {
    return localStorage.getItem(TokenService.REFRESH_KEY);
  }

  set refreshToken(newToken: Token) {
    localStorage.setItem(TokenService.REFRESH_KEY, newToken);
  }
}

export type Token = string;

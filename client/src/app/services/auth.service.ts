import {Injectable} from '@angular/core';
import { Logger } from './logger.service';
import { TokenService, Token } from './token.service';
import { User } from '../models';
import { Url, parse as parseUrl } from 'url';
import { ApiService, TwitterLoginTokenResponse } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private static CURRENT_USER_KEY = 'CURRENT_USER_KEY';
  private _jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(
    private _apiService: ApiService,
    private _tokenService: TokenService,
    private _logger: Logger,
  ) {}

  /**
   * Returns if the user is considered currently logged in.
   */
  get isLoggedIn(): boolean {
    return this._tokenService.localToken !== null;
  }

  loginWith(jwt: Token, refresh: Token) {
    this._tokenService.localToken = jwt;
    this._tokenService.refreshToken = refresh;
    this.currentUser = {
      userID: this._jwtHelperService.decodeToken(jwt).id,
    } as User;
  }

  /**
   * Returns the currently logged in user if there is one.
   */
  get currentUser(): User|undefined {
    return JSON.parse(localStorage.getItem(AuthService.CURRENT_USER_KEY));
  }

  set currentUser(user: User|undefined) {
    if (!user) {
      localStorage.removeItem(AuthService.CURRENT_USER_KEY);
      return;
    }
    localStorage.setItem(AuthService.CURRENT_USER_KEY, JSON.stringify(user));
  }

  async twitterLoginUrl(): Promise<Url> {
    const response: TwitterLoginTokenResponse = await this._apiService.get('login').toPromise();
    return parseUrl(response.url.href);
  }

  async signOut(): Promise<void> {
    this._tokenService.localToken = undefined;
    this._tokenService.refreshToken = undefined;
    this.currentUser = undefined;
  }
}

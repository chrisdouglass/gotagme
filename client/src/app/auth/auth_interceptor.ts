import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, NavigationStart, RouterEvent, Params } from "@angular/router";
import { TokenService, Logger } from '../services';
import { Token } from "../services/token.service";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _logger: Logger,
  ) {}

  registerForEvents() {
    this._router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        const params: Params = this._router.parseUrl(event.url).queryParams;
        const jwt: Token|undefined = params[TokenService.JWT_QUERY_PARAM];
        const refresh: Token|undefined = params[TokenService.REFRESH_QUERY_PARAM];

        if (!jwt || !refresh) {
          this._logger.error(`Both tokens must be provided: jwt ${jwt} refresh ${refresh}`);
          return;
        }

        this._logger.log(`Persisting tokens: jwt ${jwt} refresh ${refresh}`);
        this._authService.loginWith(jwt, refresh);

        this._router.navigate([]);
      }
    });
  }
}

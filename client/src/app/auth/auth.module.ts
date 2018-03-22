import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200/api/'],
        blacklistedRoutes: ['localhost:4200/api/login/']
      }
    } as JwtModuleOptions),
  ],
  providers: [
    HttpClientModule,
  ],
})
export class AuthModule {}

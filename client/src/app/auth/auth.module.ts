import {NgModule} from '@angular/core';
import { TokenService } from '../services';
import { AuthService } from '../services/auth.service';
import { AuthInterceptor } from './auth_interceptor';

@NgModule({
  providers: [
    AuthInterceptor,
    AuthService,
    TokenService,
  ],
})
export class AuthModule {}

import {NgModule} from '@angular/core';
import { TokenService } from '../services';

@NgModule({
  providers: [
    TokenService,
  ],
})
export class AuthModule {}

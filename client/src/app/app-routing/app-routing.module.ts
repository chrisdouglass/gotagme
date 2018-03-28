import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthModule} from '../auth/auth.module';
import {AuthInterceptor} from '../auth/auth_interceptor';
import {BrowseComponent} from '../browse/browse.component';
import {FaqComponent} from '../faq/faq.component';
import {HomeComponent} from '../home/home.component';
import {PhotoComponent} from '../photo/photo.component';
import {ReviewComponent} from '../review/review.component';
import {SubmitComponent} from '../submit/submit.component';
import { ProfileComponent } from '../profile/profile.component';
import { CostumeListComponent } from '../costume-list/costume-list.component';

const appRoutes: Routes = [
  {
    path: 'submit',
    component: SubmitComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'photo/:id',
    component: PhotoComponent,
  },
  {
    path: 'review',
    component: ReviewComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile/characters',
    component: CostumeListComponent,
  }
];

@NgModule({
  imports: [
    AuthModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
  constructor(
      private _authInterceptor: AuthInterceptor,
  ) {
    _authInterceptor.registerForEvents();
  }
}

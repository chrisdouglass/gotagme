import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';  // this is needed!
import {Router} from '@angular/router';
import {TagInputModule} from 'ngx-chips';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {BrowseComponent} from './browse/browse.component';
import {CostumeListComponent} from './costume-list/costume-list.component';
import {FaqComponent} from './faq/faq.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PhotoComponent} from './photo/photo.component';
import {ProfileComponent} from './profile/profile.component';
import {ReviewComponent} from './review/review.component';
import {SearchbarComponent} from './searchbar/searchbar.component';
import {PhotoService} from './services';
import {Logger} from './services';
import {ApiService} from './services';
import {SearchService} from './services';
import {TagService} from './services';
import {CostumeService} from './services/costume.service';
import {SubmitComponent} from './submit/submit.component';
import {NgxMasonryModule} from './third_party/ngx-masonry';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SearchbarComponent,
    PhotoComponent,
    SubmitComponent,
    BrowseComponent,
    FaqComponent,
    ReviewComponent,
    ProfileComponent,
    CostumeListComponent,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    FormsModule,
    NgxMasonryModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    Logger,
    ApiService,
    CostumeService,
    PhotoService,
    SearchService,
    TagService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(
      private _logger: Logger,
      router: Router,
  ) {
    this._logger.log('Routes: ' + JSON.stringify(router.config, undefined, 2));
  }
}

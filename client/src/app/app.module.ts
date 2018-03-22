import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';  // this is needed!
import {Router} from '@angular/router';
import {TagInputModule} from 'ngx-chips';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {BrowseComponent} from './browse/browse.component';
import {FaqComponent} from './faq/faq.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {PhotoComponent} from './photo/photo.component';
import {ReviewComponent} from './review/review.component';
import {SearchbarComponent} from './searchbar/searchbar.component';
import {PhotoService} from './services';
import {Logger} from './services';
import {HttpService} from './services';
import {SearchService} from './services';
import {TagService} from './services';
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
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxMasonryModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    Logger,
    HttpService,
    PhotoService,
    SearchService,
    TagService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}

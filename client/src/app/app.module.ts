import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMasonryModule } from './third_party/ngx-masonry'
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { PhotoComponent } from './photo/photo.component'
import {PhotoService} from './photo.service';
import {Logger} from './logger.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { Router } from '@angular/router';
import { SubmitComponent } from './submit/submit.component';
import { BrowseComponent } from './browse/browse.component';
import { FaqComponent } from './faq/faq.component';
import { HttpService, httpServiceFactory } from './http.service';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { SearchService } from './search.service';

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
  ],
  imports: [
    AppRoutingModule,
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
    PhotoService,
    SearchService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}

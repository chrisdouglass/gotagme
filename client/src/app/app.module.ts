import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { PhotoComponent } from './photo/photo.component'
import {PhotoService} from './photo.service';
import {Logger} from './logger.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SearchbarComponent,
    PhotoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxMasonryModule,
  ],
  providers: [
    Logger,
    PhotoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

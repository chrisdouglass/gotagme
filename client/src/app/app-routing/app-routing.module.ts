import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BrowseComponent } from '../browse/browse.component';
import { SubmitComponent } from '../submit/submit.component';
import { FaqComponent } from '../faq/faq.component';
import { PhotoComponent } from '../photo/photo.component';

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
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }

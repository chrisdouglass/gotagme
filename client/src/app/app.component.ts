import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <app-navbar></app-navbar>
    <app-home></app-home>
  `
})
export class AppComponent {
  title = 'app';
}

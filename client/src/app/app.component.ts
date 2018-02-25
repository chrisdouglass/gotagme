import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <app-navbar></app-navbar>
    <app-photo></app-photo>
  `
})
export class AppComponent {
  title = 'app';
}

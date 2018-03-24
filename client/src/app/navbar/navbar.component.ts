import {Component, OnInit} from '@angular/core';

import {Tag, User} from '../models';
import {TagService, Logger} from '../services';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Url } from 'url';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _tags: Tag[];

  constructor(
      private _authService: AuthService,
      private _tagService: TagService,
      private _logger: Logger,
      private _router: Router,
  ) {}

  ngOnInit() {
    this._tagService.reviewTags().subscribe((tags: Tag[]) => {
      this._tags = tags;
      this._logger.log('Tags loaded.');
    });
  }

  loggedIn(): boolean {
    return !!this._authService.currentUser;
  }

  displayName(): string|undefined {
    return this._authService.currentUser && this._authService.currentUser.displayName;
  }

  hasTags(): boolean {
    return this._tags.length > 0;
  }

  reviewCount(): number {
    return this._tags.length;
  }

  doLogin() {
    this._logger.log('Logging into Twitter');
    this._authService.twitterLoginUrl().then((url: Url) => {
      this._logger.log('Redirecting to ' + url.href);
      window.location.href = url.href;
    })
  }

  signOut() {
    this._authService.signOut().then(() => {
      this._router.navigate([]);
    });
  }
}

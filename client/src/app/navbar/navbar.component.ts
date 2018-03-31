import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Url} from 'url';

import {Costume, Tag, User} from '../models';
import {Logger, TagService} from '../services';
import {AuthService} from '../services/auth.service';
import {CostumeService} from '../services/costume.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _tags: Tag[];
  private _costumes: Costume[];

  constructor(
      private _authService: AuthService,
      private _costumeService: CostumeService,
      private _tagService: TagService,
      private _logger: Logger,
      private _router: Router,
  ) {
    this._tags = [];
  }

  ngOnInit() {
    this._tagService.reviewTags().subscribe((tags: Tag[]) => {
      this._tags = tags;
      this._logger.log('Tags loaded.');
    });
    this._costumeService.costumesForCurrentUser().subscribe(
        (costumes: Costume[]) => {
          this._costumes = costumes;
        });
  }

  /**
   * User state.
   */

  get loggedIn(): boolean {
    return !!this._authService.currentUser;
  }

  get userID(): string|undefined {
    return this._authService.currentID;
  }

  get displayName(): string|undefined {
    return this._authService.currentUser &&
        this._authService.currentUser.displayName;
  }

  get hasTags(): boolean {
    return this._tags.length > 0;
  }

  get reviewCount(): number {
    return this._tags.length;
  }

  get characters(): Costume[] {
    return this._costumes;
  }

  /**
   * Actions.
   */

  doLogin() {
    this._logger.log('Logging into Twitter');
    this._authService.twitterLoginUrl().then((url: Url) => {
      this._logger.log('Redirecting to ' + url.href);
      window.location.href = url.href;
    });
  }

  signOut() {
    this._authService.signOut().then(() => {
      this._router.navigate([]);
    });
  }
}

import {Component, OnInit} from '@angular/core';

import {Tag} from '../models';
import {TagService} from '../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private _tags: Tag[];
  constructor(
      private _tagService: TagService,
  ) {}

  ngOnInit() {
    this._tagService.reviewTags().subscribe((tags: Tag[]) => {
      this._tags = tags;
    });
  }
}

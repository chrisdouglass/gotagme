import { Component, OnInit } from '@angular/core';
import { TagService, Tag } from '../tag.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  private _tags?: Tag[];
  private _tagService: TagService;

  constructor(tagService: TagService) {
    this._tagService = tagService;
  }

  ngOnInit() {
    this._tagService.reviewTags().subscribe((value: Tag[]) => {
      this._tags = value;
    });
  }

}

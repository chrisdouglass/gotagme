import {Component, OnInit} from '@angular/core';
import {Costume} from '../models';
import {huskysoft} from '../protos/protos';
import {TagService} from '../services';
import {CostumeService} from '../services/costume.service';

@Component({
  selector: 'app-costume-list',
  templateUrl: './costume-list.component.html',
  styleUrls: ['./costume-list.component.css']
})
export class CostumeListComponent implements OnInit {
  private _costumes: Costume[];
  private _countMap: huskysoft.gotagme.tag.GetTagCountResponse[];

  constructor(
      private _costumeService: CostumeService,
      private _tagService: TagService,
  ) {
    this._countMap = [];
  }

  /**
   * Lifecycle.
   */

  ngOnInit() {
    this._costumeService.costumesForCurrentUser().subscribe(
        (costumes: Costume[]) => {
          this.costumes = costumes;
        });
  }

  /**
   * Template accessors.
   */

  get costumes(): Costume[] {
    return this._costumes;
  }

  tagCountForCostume(costume: Costume): number {
    const count: number|undefined = this._countMap[costume.id];
    return count ? count : 0;
  }

  /**
   * Private.
   */

  set costumes(costumes: Costume[]) {
    this._costumes = costumes;
    this._tagService.tagCountsForCostumes(costumes).subscribe(
        (responses: huskysoft.gotagme.tag.GetTagCountResponse[]) => {
          this._countMap = responses;
        });
  }
}

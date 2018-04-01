import {Component, OnInit} from '@angular/core';

import {Costume} from '../models';
import {huskysoft} from '../protos/protos';
import {Logger, TagService} from '../services';
import {CostumeService} from '../services/costume.service';

type CountMap = {
  [_: string]: number
};

@Component({
  selector: 'app-costume-list',
  templateUrl: './costume-list.component.html',
  styleUrls: ['./costume-list.component.css']
})
export class CostumeListComponent implements OnInit {
  private _costumes: Costume[];
  private _countMap: CountMap;

  private _nameInput: string;
  private _keywordInput: string;

  constructor(
      private _costumeService: CostumeService,
      private _tagService: TagService,
      private _logger: Logger,
  ) {
    this._countMap = {} as CountMap;
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

  /** UI Actions */

  createTapped() {
    if (this._nameInput.length === 0) {
      return;
    }
    this._costumeService.createCostume(this._nameInput)
        .subscribe((costume: Costume) => {
          this.costumes.push(costume);
          this.hide();
        });
  }

  private _visible = false;
  private _visibleAnimate = false;

  show(): void {
    this._visible = true;
    setTimeout(() => this._visibleAnimate = true, 100);
  }

  hide(): void {
    this._visibleAnimate = false;
    setTimeout(() => this._visible = false, 300);
  }

  onBackgroundClicked(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.hide();
    }
  }

  /**
   * Private.
   */

  set costumes(costumes: Costume[]) {
    this._costumes = costumes;
    this._tagService.tagCountsForCostumes(costumes).subscribe(
        (responses: huskysoft.gotagme.tag.GetTagCountResponse[]) => {
          this._countMap = responses.reduce(
              (map: CountMap,
               currentValue: huskysoft.gotagme.tag.GetTagCountResponse) => {
                map[currentValue.id] = currentValue.count;
                return map;
              },
              {} as CountMap);
        });
  }
}

import {Component, OnDestroy, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';

import {Photo, Tag} from '../models';
import {PhotoService, SearchService, TagService} from '../services';
import {TagAutocompleteResult} from '../services/search.service';
import {untilComponentDestroyed} from "ng2-rx-componentdestroyed";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, OnDestroy {
  private _photo: Photo = {} as Photo;

  private _tagsInput: Tag[];
  private _capturedByInput: Tag;

  private paramsSub: Subscription;


  @ViewChild('addTagModalCloseButton') _addTagModalCloseButton: ElementRef;

  constructor(
    private _photoService: PhotoService,
    private _searchService: SearchService,
    private _tagService: TagService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.loadPhotoWithID(this._route.snapshot.params['id']);
  }

  ngOnDestroy() {}

  private loadPhotoWithID(photoID: string) {
    this._photoService.getPhoto(photoID).pipe(untilComponentDestroyed(this)).subscribe((photo: Photo) => {
      this._photo = photo;
    });
  }

  submitTags() {
    this._tagService.addTagsToPhoto(this._photo, this._tagsInput, this._capturedByInput).subscribe(() => {
      this.hide();
    });
  }

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

  requestAutocompleteItems =
      (text: string): Observable<TagAutocompleteResult[]> => {
        return this._searchService.searchTags(text);
      };
}

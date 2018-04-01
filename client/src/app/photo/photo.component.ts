import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {untilComponentDestroyed} from 'ng2-rx-componentdestroyed';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';

import {Photo, Tag, User} from '../models';
import {huskysoft} from '../protos/protos';
import {PhotoService, SearchService, TagService} from '../services';
import {TagAutocompleteResult} from '../services/search.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, OnDestroy {
  private _photo: Photo = {} as Photo;
  private _capturedBy: User;

  private _tags: Tag[];
  private _tagsInput: Tag[];

  private paramsSub: Subscription;

  private _requestAutocompleteObservable:
      (text: string) => Observable<TagAutocompleteResult[]>;

  @ViewChild('capturedByInput') capturedByInput: ElementRef;
  @ViewChild('addTagModalCloseButton') addTagModalCloseButton: ElementRef;

  constructor(
      private _photoService: PhotoService,
      private _searchService: SearchService,
      private _tagService: TagService,
      private _route: ActivatedRoute,
      private _router: Router,
  ) {
    this._requestAutocompleteObservable =
        (text: string): Observable<TagAutocompleteResult[]> => {
          return this._searchService.searchTags(text);
        };
  }

  ngOnInit() {
    this.loadPhotoWithID(this._route.snapshot.params['id']);
  }

  ngOnDestroy() {}

  /** State Updates */

  private async loadPhotoWithID(photoID: string) {
    this._photoService.getPhoto(photoID)
        .pipe(untilComponentDestroyed(this))
        .subscribe((photo: Photo) => {
          this._photo = photo;
          this.updateTagsWithPhoto(this._photo);
        });
  }

  private async updateTagsWithPhoto(photo: Photo) {
    this._tagService.tagsForPhoto(photo)
        .pipe(untilComponentDestroyed(this))
        .subscribe((tags: Tag[]) => {
          this._tags = tags;
          this._tagsInput = tags;
          this.updateCapturedByField();
        });
  }

  private updateCapturedByField() {
    this._capturedBy = this._photo.capturedBy &&
        huskysoft.gotagme.user.User.fromObject(this._photo.capturedBy);
  }

  /** UI Accessors */

  get requestAutocompleteObservable():
      (text: string) => Observable<TagAutocompleteResult[]> {
    return this._requestAutocompleteObservable;
  }

  get photographerIsTagged(): boolean {
    return !!this._photo.capturedBy;
  }

  get capturedByDisplayName(): string {
    return this._capturedBy ? this._capturedBy.displayName : '';
  }

  get showsAlsoPictured(): boolean {
    return true;
  }

  /** UI Actions */

  submitTags() {
    const capturedByInput =
        this.capturedByInput as any;  // tslint:disable-line: no-any
    const capturedByTag: Tag = capturedByInput && capturedByInput.tags.first &&
        capturedByInput.tags.first.model;
    this._tagService.addTagsToPhoto(this._photo, this._tagsInput, capturedByTag)
        .subscribe(() => {
          this.updateTagsWithPhoto(this._photo);
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
}

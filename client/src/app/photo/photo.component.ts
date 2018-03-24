import {Component, OnDestroy, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';

import {Photo} from '../models';
import {PhotoService, SearchService} from '../services';
import {TagAutocompleteResult} from '../services/search.service';
import {untilComponentDestroyed} from "ng2-rx-componentdestroyed";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit, OnDestroy {
  private _photo: Photo = {} as Photo;

  private _tagsInput: string;
  private _capturedByInput: string;

  private paramsSub: Subscription;

  constructor(
      private photoService: PhotoService,
      private searchService: SearchService,
      private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadPhotoWithID(this.route.snapshot.params['id']);
  }

  ngOnDestroy() {}

  private loadPhotoWithID(photoID: string) {
    this.photoService.getPhoto(photoID).pipe(untilComponentDestroyed(this)).subscribe((photo: Photo) => {
      this._photo = photo;
    });
  }

  requestAutocompleteItems =
      (text: string): Observable<TagAutocompleteResult[]> => {
        return this.searchService.searchTags(text);
      };
}

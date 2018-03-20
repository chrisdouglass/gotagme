import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo';
import { Subscription } from 'rxjs/Subscription';
import { PhotoService } from '../photo.service';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { SearchService, TagAutocompleteResult } from '../search.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  private _photo: Photo = {} as Photo;

  private _tagsInput: string;
  private _capturedByInput: string;

  private paramsSub: Subscription;

  constructor(
    private photoService: PhotoService,
    private searchService: SearchService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadPhotoWithID(this.route.snapshot.params['id']);
  }

  private async loadPhotoWithID(photoID: string) {
    const response: Response = await this.photoService.getPhoto(photoID).toPromise();
    this._photo = await response.json();
  }

  public requestAutocompleteItems = (text: string): Observable<TagAutocompleteResult[]> => {
    return this.searchService.searchTags(text).map((data: Response) => {
      const results: TagAutocompleteResult[] = data.json();
      return results;
    });
  };
}

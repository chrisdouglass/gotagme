import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {InsertPhotoRequest, Photo} from '../models';

import {ApiService} from './api.service';

@Injectable()
export class PhotoService {
  constructor(private _apiService: ApiService) {}

  getAllPhotos(): Observable<Photo[]> {
    return this._apiService.get('photo') as Observable<Photo[]>;
  }

  getPhoto(photoID: string): Observable<Photo> {
    return this._apiService.get('photo/' + photoID) as Observable<Photo>;
  }

  insertPhotos(requests: InsertPhotoRequest[]): Observable<Photo[]> {
    const request = {
      flickrUrls: requests.map((req: InsertPhotoRequest) => req.flickrUrl),
    };
    return this._apiService.postWithAuth('photo/', request) as Observable<Photo[]>;
  }

  // updatePhoto(photo: Photo): Observable<void> {
  //   return this._apiService.put('photo/' + photo.photoID, photo);
  // }

  // deletePhoto(photoID: string): Observable<Response> {
  //   return this._apiService.delete('photo/' + photoID);
  // }
}

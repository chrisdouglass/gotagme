import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {InsertPhotoRequest, Photo} from '../models';

import {HttpService} from './http.service';

@Injectable()
export class PhotoService {
  constructor(private _httpService: HttpService) {}

  getAllPhotos(): Observable<Photo[]> {
    return this._httpService.get('photo') as Observable<Photo[]>;
  }

  getPhoto(photoID: string): Observable<Photo> {
    return this._httpService.get('photo/' + photoID) as Observable<Photo>;
  }

  insertPhotos(requests: InsertPhotoRequest[]): Observable<Photo[]> {
    const request = {
      flickrUrls: requests.map((req: InsertPhotoRequest) => req.flickrUrl),
    };
    return this._httpService.post('photo/', request) as Observable<Photo[]>;
  }

  // updatePhoto(photo: Photo): Observable<void> {
  //   return this._httpService.put('photo/' + photo.photoID, photo);
  // }

  // deletePhoto(photoID: string): Observable<Response> {
  //   return this._httpService.delete('photo/' + photoID);
  // }
}

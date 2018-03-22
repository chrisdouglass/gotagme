import { Injectable } from '@angular/core';
import {Photo} from './photo';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
export interface InsertPhotoRequest {
  flickrUrl: string;
}

@Injectable()
export class PhotoService {
  private _apiUrl: string = 'http://localhost:4200/api/';

  constructor(private authHttp: AuthHttp) {}

  getAllPhotos(): Observable<Response> {
    return this.authHttp.get(this._apiUrl + 'photo');
  }

  getPhoto(photoID: string): Observable<Response> {
    return this.authHttp.get(this._apiUrl + 'photo/' + photoID);
  }

  insertPhotos(requests: InsertPhotoRequest[]): Observable<Response> {
    const request = {
      flickrUrls: requests.map((req: InsertPhotoRequest) => req.flickrUrl),
    }
    return this.authHttp.post(this._apiUrl + 'photo/', request);
  }

  // updatePhoto(photo: Photo): Observable<void> {
  //   return this.authHttp.put(this._apiUrl + 'photo/' + photo.photoID, photo);
  // }

  deletePhoto(photoID: string): Observable<Response> {
    return this.authHttp.delete(this._apiUrl + 'photo/' + photoID);
  }
}

import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {InsertPhotoRequest, Photo, InsertPhotosRequest} from '../models';

import {ApiService} from './api.service';
import { huskysoft } from '../protos/protos';

@Injectable()
export class PhotoService {
  constructor(private _apiService: ApiService) {}

  getAllPhotos(): Observable<Photo[]> {
    return this._apiService.get('photo') as Observable<Photo[]>;
  }

  getPhoto(photoID: string): Observable<Photo> {
    return this._apiService.get('photo/' + photoID) as Observable<Photo>;
  }

  insertPhotosByStrings(urlStrings: string[]): Observable<Photo[]> {
    return this.insertPhotos(
      urlStrings.map((flickrUrl) => new huskysoft.gotagme.photo.InsertPhotoRequest({
        flickrUrl,
      }))
    );
  }

  insertPhotos(requests: InsertPhotoRequest[]): Observable<Photo[]> {
    const request: InsertPhotosRequest = new huskysoft.gotagme.photo.InsertPhotosRequest({
      requests,
    });
    return this._apiService.postWithAuth('photo/', request) as Observable<Photo[]>;
  }

  // updatePhoto(photo: Photo): Observable<void> {
  //   return this._apiService.put('photo/' + photo.photoID, photo);
  // }

  // deletePhoto(photoID: string): Observable<Response> {
  //   return this._apiService.delete('photo/' + photoID);
  // }
}

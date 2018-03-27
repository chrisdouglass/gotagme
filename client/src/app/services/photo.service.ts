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
    return this._apiService.get('photo')
      .map<huskysoft.gotagme.photo.IGetPhotoResponse, huskysoft.gotagme.photo.GetPhotoResponse>
          ((response: huskysoft.gotagme.photo.IGetPhotoResponse) => huskysoft.gotagme.photo.GetPhotoResponse.fromObject(response))
      .map<huskysoft.gotagme.photo.GetPhotoResponse, huskysoft.gotagme.photo.IPhoto[]>
          ((response: huskysoft.gotagme.photo.GetPhotoResponse) => response.photos)
      .map<huskysoft.gotagme.photo.IPhoto[], Photo[]>
          ((photos: huskysoft.gotagme.photo.IPhoto[]) => photos.map((photo) => huskysoft.gotagme.photo.Photo.fromObject(photo)));
  }

  getPhoto(photoID: string): Observable<Photo|null> {
    return this._apiService.get('photo/' + photoID).map<huskysoft.gotagme.photo.GetPhotoResponse, huskysoft.gotagme.photo.Photo>((response) => {
      return response.photos && response.photos[0] && new huskysoft.gotagme.photo.Photo(response.photos[0]);
    });
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

import { Injectable } from '@angular/core';
import {Photo} from './photo';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { Response } from '@angular/http';
export interface InsertPhotoRequest {
  flickrUrl: string;
}

@Injectable()
export class PhotoService {
  constructor(private http: HttpService) {}

  getAllPhotos(): Observable<Response> {
    return this.http.get('photo');
  }

  getPhoto(photoID: string): Observable<Response> {
    return this.http.get('photo/' + photoID);
  }

  // insertPhoto(request: InsertPhotoRequest): Observable<Photo> {
  //   // return this.http.post('photo/', request).do<Photo>((res) => res.json());
  // }

  insertPhotos(requests: InsertPhotoRequest[]): Observable<Response> {
    const request = {
      flickrUrls: requests.map((req: InsertPhotoRequest) => req.flickrUrl),
    }
    console.log(request);
    return this.http.post('photo/', request);
  }

  // updatePhoto(photo: Photo): Observable<void> {
  //   return this.http.put('photo/' + photo.photoID, photo);
  // }

  deletePhoto(photoID: string): Observable<Response> {
    return this.http.delete('photo/' + photoID);
  }
}

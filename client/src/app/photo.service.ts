import { Injectable } from '@angular/core';
import {Photo} from './photo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PhotoService {
  constructor(private http: HttpClient) {}

  getAllPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('http://localhost:3000/api/photo');
  }

  getPhoto(photoID: string): Observable<Photo> {
    return this.http.get<Photo>('http://localhost:3000/api/photo/' + photoID);
  }

  insertPhoto(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>('http://localhost:3000/api/photo/', photo);
  }

  updatePhoto(photo: Photo): Observable<void> {
    return this.http.put<void>('http://localhost:3000/api/photo/' + photo.id, photo);
  }

  deletePhoto(photoID: string) {
    return this.http.delete('http://localhost:3000/api/photo/' + photoID);
  }
}

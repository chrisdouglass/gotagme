import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {parse as parseUrl} from 'url';
import {Tag, User, Photo} from '../models';
import { ApiService } from './api.service';
import { huskysoft } from '../protos/protos';

@Injectable()
export class TagService {
  constructor(
    private _apiService: ApiService,
  ) {}


  reviewTags(): Observable<Tag[]> {
    return this.currentUserTags(huskysoft.gotagme.ApprovalState.NEW);
  }

  currentUserTags(filterState: huskysoft.gotagme.ApprovalState): Observable<Tag[]> {
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric'
    };
    const language: string = window.navigator.language;

    return this._apiService.getWithAuth('profile/tags').map((tags: Tag[]) => {
      tags.forEach((tag: Tag) => {
        tag['localizedDateString'] =
            (new Date()).toLocaleDateString(language, options);
      });
      return tags;
    });
  }

  addTagsToPhoto(photo: Photo, tags?: Tag[], capturedBy?: Tag): Observable<Tag[]> {
    const request: huskysoft.gotagme.IAddTagsToPhotoRequest = {
      tags: tags,
      capturedBy: capturedBy,
    }
    return this._apiService.postWithAuth('photo/' + photo.id + '/tag/', new huskysoft.gotagme.AddTagsToPhotoRequest(request));
  }
}

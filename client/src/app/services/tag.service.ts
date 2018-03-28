import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {parse as parseUrl} from 'url';

import {Photo, Tag, User} from '../models';
import {huskysoft} from '../protos/protos';

import {ApiService} from './api.service';

@Injectable()
export class TagService {
  constructor(
      private _apiService: ApiService,
  ) {}


  reviewTags(): Observable<Tag[]> {
    return this.currentUserTags(huskysoft.gotagme.approval.ApprovalState.NEW);
  }

  currentUserTags(filterState: huskysoft.gotagme.approval.ApprovalState):
      Observable<Tag[]> {
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

  addTagsToPhoto(photo: Photo, tags?: Tag[], capturedBy?: Tag):
      Observable<huskysoft.gotagme.tag.GetTagsResponse> {
    return this._apiService.postWithAuth(
        'photo/' + photo.id + '/tag/',
        new huskysoft.gotagme.tag.AddTagsToPhotoRequest({
          tags,
          capturedBy,
        }));
  }

  tagsForPhoto(photo: Photo): Observable<Tag[]> {
    return this._apiService.getWithAuth('photo/' + photo.id + '/tag/')
        .map<
            huskysoft.gotagme.tag.GetTagsResponse,
            huskysoft.gotagme.tag.ITag[]>(
            (response) =>
                huskysoft.gotagme.tag.GetTagsResponse.fromObject(response).tags)
        .map<huskysoft.gotagme.tag.ITag[], Tag[]>(
            (interfaces) =>
                interfaces.map(huskysoft.gotagme.tag.Tag.fromObject));
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {parse as parseUrl} from 'url';

import {Costume, Photo, Tag, User} from '../models';
import {huskysoft} from '../protos/protos';

import {ApiService} from './api.service';
import {AuthService} from './auth.service';

@Injectable()
export class TagService {
  constructor(
      private _apiService: ApiService,
      private _authService: AuthService,
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

    return this._apiService
        .getWithAuth('tag/user/' + this._authService.currentID)
        .map((response: huskysoft.gotagme.tag.GetTagsResponse) => {
          return response.tags.map((itag: huskysoft.gotagme.tag.ITag) => {
            const tag: Tag = new huskysoft.gotagme.tag.Tag(itag);
            tag['localizedDateString'] =
                (new Date()).toLocaleDateString(language, options);
            return tag;
          });
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

  tagCountsForCostumes(costumes: Costume[]):
      Observable<huskysoft.gotagme.tag.GetTagCountResponse[]> {
    return this._apiService
        .postWithAuth(
            'tag/counts', new huskysoft.gotagme.tag.GetTagCountsRequest({
              costumeIDs: costumes.map((costume) => costume.id),
            }))
        .map<
            huskysoft.gotagme.tag.GetTagCountsResponse,
            huskysoft.gotagme.tag.IGetTagCountResponse[]>(
            (response) =>
                huskysoft.gotagme.tag.GetTagCountsResponse.fromObject(response)
                    .responses)
        .map<
            huskysoft.gotagme.tag.IGetTagCountResponse[],
            huskysoft.gotagme.tag.GetTagCountResponse[]>(
            (interfaces) => interfaces.map(
                huskysoft.gotagme.tag.GetTagCountResponse.fromObject));
  }
}

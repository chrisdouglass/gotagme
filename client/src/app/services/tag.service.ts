import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {parse as parseUrl} from 'url';
import {Tag, User} from '../models';
import { ApiService } from './api.service';
import { TagApprovalState } from '../models/tag';

@Injectable()
export class TagService {
  constructor(
    private _apiService: ApiService,
  ) {}


  reviewTags(): Observable<Tag[]> {
    return this.currentUserTags(TagApprovalState.New);
  }

  currentUserTags(filterState: TagApprovalState): Observable<Tag[]> {
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric'
    };
    const language: string = window.navigator.language;

    return this._apiService.getWithAuth('profile/tags').map((tags: Tag[]) => {
      tags.forEach((tag: Tag) => {
        tag.localizedDateString =
            (new Date()).toLocaleDateString(language, options);
      });
      return tags;
    });
  }
}

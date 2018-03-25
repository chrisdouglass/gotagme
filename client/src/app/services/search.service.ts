import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {ApiService} from './api.service';

@Injectable()
export class SearchService {
  constructor(private http: ApiService) {}

  // TagAutocompleteResult[]
  searchTags(text: string): Observable<TagAutocompleteResult[]> {
    return this.http.getWithAuth(`search/tag/${text}?type=extended`) as
        Observable<TagAutocompleteResult[]>;
  }
}

export enum SearchType {
  // Also perform a search on Twitter for users.
  Extended = 'extended',
}

export enum TagAutocompleteResultType {
  Costume = 'costume',
  User = 'user',
  Hashtag = 'hashtag',
}

export interface TagAutocompleteResult {
  text: string;
  type: TagAutocompleteResultType;
  displayName: string;
  twitterScreenName: string;
  twitterProfileImageUrl: string;
}

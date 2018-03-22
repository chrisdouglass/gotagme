import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {Photo} from '../models';

import {HttpService} from './http.service';

@Injectable()
export class SearchService {
  constructor(private http: HttpService) {}

  // TagAutocompleteResult[]
  searchTags(text: string): Observable<TagAutocompleteResult[]> {
    return this.http.get(`search/tag/${text}?type=extended`) as
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

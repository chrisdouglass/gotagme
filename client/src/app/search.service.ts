import { Injectable } from '@angular/core';
import {Photo} from './photo';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { Response } from '@angular/http';

@Injectable()
export class SearchService {

  constructor(private http: HttpService) { }

  // TagAutocompleteResult[]
  searchTags(text: string): Observable<Response> {
    return this.http.get(`search/tag/${text}?type=extended`);
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

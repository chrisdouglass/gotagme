import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {huskysoft} from '../protos/protos';

import {ApiService} from './api.service';

@Injectable()
export class SearchService {
  constructor(private http: ApiService) {}

  searchTags(text: string): Observable<huskysoft.gotagme.tag.IGetTagsResponse> {
    return this.http.getWithAuth(`search/tag/${text}`) as
        Observable<huskysoft.gotagme.tag.IGetTagsResponse>;
  }
}

export enum SearchType {
  // Also perform a search on Twitter for users.
  Extended = 'extended',
}

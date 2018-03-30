import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {Costume} from '../models';
import {huskysoft} from '../protos/protos';

import {ApiService} from './api.service';
import {AuthService} from './auth.service';

@Injectable()
export class CostumeService {
  constructor(
      private _apiService: ApiService,
      private _authService: AuthService,
  ) {}

  costumeForID(id: string): Observable<Costume> {
    return Observable.of(new huskysoft.gotagme.costume.Costume({
      id: 'aaabbbccc',
      name: 'Raver',
    }));
  }

  costumesForCurrentUser(): Observable<Costume[]> {
    return Observable.of([
      new huskysoft.gotagme.costume.Costume({
        id: 'aaabbbccc',
        name: 'Raver',
      }),
      new huskysoft.gotagme.costume.Costume({
        id: 'dddeeefff',
        name: 'Cole',
      })
    ]);
  }
}

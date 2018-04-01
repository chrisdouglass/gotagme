import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {Costume} from '../models';
import {huskysoft} from '../protos/protos';

import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {Logger} from './logger.service';

@Injectable()
export class CostumeService {
  constructor(
      private _apiService: ApiService,
      private _authService: AuthService,
      private _logger: Logger,
  ) {}

  costumeForID(id: string): Observable<Costume> {
    return Observable.of(new huskysoft.gotagme.costume.Costume({
      id: 'aaabbbccc',
      name: 'Raver',
    }));
  }

  costumesForCurrentUser(): Observable<Costume[]> {
    const path =
        'costume/user/' + this._authService.currentUser.id + '?only_current=1';
    return this._apiService
        .getWithAuth(path)
        // tslint:disable-next-line: no-any
        .map<any, huskysoft.gotagme.costume.GetCostumesResponse>((res) => {
          return huskysoft.gotagme.costume.GetCostumesResponse.fromObject(res);
        })
        .map<huskysoft.gotagme.costume.GetCostumesResponse, Costume[]>(
            (response) => {
              const costumes: Costume[] = response.costumes.map((icostume) => {
                return new huskysoft.gotagme.costume.Costume(icostume);
              });
              this._logger.log(
                  'Returning costumes ' + JSON.stringify(costumes));
              return costumes;
            });
  }

  createCostume(name: string): Observable<Costume> {
    const request: huskysoft.gotagme.costume.EditCostumeRequest =
        new huskysoft.gotagme.costume.EditCostumeRequest({
          name,
          ownerID: this._authService.currentID,
        });
    return this._apiService
        .postWithAuth('costume/', request.toJSON())
        // tslint:disable-next-line: no-any
        .map<any, huskysoft.gotagme.costume.Costume>((res) => {
          return huskysoft.gotagme.costume.Costume.fromObject(res);
        });
  }
}

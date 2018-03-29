import { Component, OnInit } from '@angular/core';
import { Costume } from '../models';
import { huskysoft } from '../protos/protos';

@Component({
  selector: 'app-costume-list',
  templateUrl: './costume-list.component.html',
  styleUrls: ['./costume-list.component.css']
})
export class CostumeListComponent implements OnInit {
  private _costumes: Costume[] = [new huskysoft.gotagme.costume.Costume({
    id: 'poop',
    name: 'Raver',
  })];

  constructor() { }

  ngOnInit() {
  }

  get costumes(): Costume[] {
    return this._costumes;
  }

}

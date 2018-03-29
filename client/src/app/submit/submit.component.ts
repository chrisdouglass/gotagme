import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

import {InsertPhotoRequest, InsertPhotosRequest, Photo} from '../models';
import {Logger, PhotoService} from '../services';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  private linkBoxContent: string;

  constructor(
      private logger: Logger,
      private photoService: PhotoService,
      private _router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.photoService.insertPhotosByStrings(this.linkBoxContent.split('\n'))
        .subscribe((photos: Photo[]) => {
          this.logger.log(JSON.stringify(photos));
          this._router.navigate(['']);
        });
  }
}

import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';

import {InsertPhotoRequest, Photo} from '../models';
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
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const requests: InsertPhotoRequest[] =
        this.linkBoxContent.split('\n').map<InsertPhotoRequest>(
            (urlString: string) => {
              return {
                flickrUrl: urlString,
              } as InsertPhotoRequest;
            });
    this.logger.log(JSON.stringify(requests));
    this.photoService.insertPhotos(requests).subscribe((photos: Photo[]) => {
      this.logger.log(JSON.stringify(photos));
    });
  }
}

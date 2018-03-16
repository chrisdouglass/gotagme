import { Component, OnInit } from '@angular/core';
import { Logger } from '../logger.service';
import { PhotoService, InsertPhotoRequest } from '../photo.service';
import { Photo } from '../photo';
import { Response } from '@angular/http';

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
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const requests: InsertPhotoRequest[] =
        this.linkBoxContent.split('\n').map<InsertPhotoRequest>((urlString: string) => {
      return {
        flickrUrl: urlString,
      } as InsertPhotoRequest;
    });
    this.logger.log(JSON.stringify(requests));
    this.photoService.insertPhotos(requests).subscribe((res) => {
      this.logger.log(JSON.stringify(res.json()));
    });
  }
}

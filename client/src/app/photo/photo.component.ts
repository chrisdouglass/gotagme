import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo';
import { Subscription } from 'rxjs/Subscription';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  _photo: Photo = {} as Photo;

  private paramsSub: Subscription;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadPhotoWithID(this.route.snapshot.params['id']);
  }

  private async loadPhotoWithID(photoID: string) {
    const response: Response = await this.photoService.getPhoto(photoID).toPromise();
    this._photo = await response.json();
  }
}

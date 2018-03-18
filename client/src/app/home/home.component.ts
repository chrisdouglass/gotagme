import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from '../third_party/ngx-masonry'
import { PhotoService } from '../photo.service';
import { Photo } from '../photo';
import { Logger } from '../logger.service';
import { Router,Params,ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {Response} from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private _photos: Photo[];
  private _imageSrcs: string[];

  public masonryOptions: NgxMasonryOptions = {
    fitWidth: true,
    transitionDuration: '0.2s',
    resize: true,
    // gutter: 20,
    // columnWidth: '__someclass__',
    containerStyle: 'gallery row',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private logger: Logger,
    private location: Location) {}

  ngOnInit() {
    this.handleJWTIfNeeded();

    this.photoService.getAllPhotos().subscribe((res: any) => {
      const photos: Photo[] = res.json();
      this.updateWithPhotos(photos);
    });
  }

  updateWithPhotos(photos: Photo[]) {
    this._photos = photos;
    console.log(photos);
    this._imageSrcs = photos.map((photo: Photo) => {
      return photo.smallImageUrl;
    });
  }

  updLayout: boolean = false;
  updateLayout() {
    this.updLayout = !this.updLayout;
  }

  handleJWTIfNeeded() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      let jwt = params['jwt'];
      if (jwt) {
        localStorage.setItem('jwt', jwt);
        this.logger.log('Recieved jwt ' + jwt);
        this.location.replaceState('');
      }
    });
  }
}

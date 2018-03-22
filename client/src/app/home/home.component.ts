import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Photo} from '../models';
import {PhotoService} from '../services';
import {Logger} from '../services';
import {NgxMasonryOptions} from '../third_party/ngx-masonry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private _photos: Photo[];
  private _imageSrcs: string[];

  masonryOptions: NgxMasonryOptions = {
    fitWidth: true,
    transitionDuration: '0s',
    resize: true,
    percentPosition: true,
    // gutter: 20,
    // columnWidth: '__someclass__',
    containerStyle: 'gallery row',
  };

  constructor(
      private activatedRoute: ActivatedRoute,
      private photoService: PhotoService, private logger: Logger,
      private location: Location) {}

  ngOnInit() {
    this.handleJWTIfNeeded();

    this.photoService.getAllPhotos().subscribe((photos: Photo[]) => {
      this.updateWithPhotos(photos);
    });
  }

  updateWithPhotos(photos: Photo[]) {
    this._photos = photos;
    this._imageSrcs = photos.map((photo: Photo) => {
      return photo.smallImageUrl;
    });
  }

  updLayout = false;
  updateLayout() {
    this.updLayout = !this.updLayout;
  }

  handleJWTIfNeeded() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const jwt = params['a'];
      if (jwt) {
        localStorage.setItem('jwt', jwt);
      }
      const refresh = params['b'];
      if (refresh) {
        localStorage.setItem('refresh', refresh);
      }
      this.location.replaceState('');
    });
  }
}

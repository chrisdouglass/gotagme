import { Component, OnInit } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { PhotoService } from '../photo.service';
import { Photo } from '../photo';
import { Logger } from '../logger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  imageSrcs = ['http://fpoimg.com/500x300', 'http://fpoimg.com/500x400', 'http://fpoimg.com/500x400', 'http://fpoimg.com/500x600', 'http://fpoimg.com/500x700', 'http://fpoimg.com/500x400'];

  public masonryOptions: NgxMasonryOptions = {
    fitWidth: true,
    transitionDuration: '0.2s',
    resize: true,
    // gutter: 20,
    // columnWidth: '__someclass__',
    containerStyle: 'gallery row',
  };

  constructor(private photoService: PhotoService, private logger: Logger) {}

  ngOnInit() {
    this.photoService.getAllPhotos().subscribe((photos: Photo[]) => {
      this.logger.log(JSON.stringify(photos));
    });
  }

  updLayout: boolean = false;
  updateLayout() {
    this.updLayout = !this.updLayout;
  }
}

require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {FlickrPhotoStore} from '../flickr_photo.store';
import {FlickrPhoto} from '../../model/photo/flickr_photo';
import {Photo as APIPhoto} from 'flickr-sdk';
import {apiPhoto1JSON, apiPhoto2JSON, apiPhoto3JSON} from './fixtures/api_photos.fixture';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class FlickrPhotoStoreTest {
  private _connection: mongoose.Connection;
  private _store: FlickrPhotoStore;

  constructor() {
    this._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
    this._store = new FlickrPhotoStore(this._connection);
  }

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.
  }

  async before() {
    this._store = new FlickrPhotoStore(this._connection);
  }

  @test
  async example1() {
    const photo: FlickrPhoto =
        await this._store.fromFlickrAPIPhoto(apiPhoto1JSON as APIPhoto);
    this.verifyFlickrPhoto(photo, {
      title: 'Photo',
      description:
          'Photo <a href="https://flic.kr/p/23X911u" rel="nofollow">flic.kr/p/23X911u</a>',
      pageURLString: 'https://www.flickr.com/photos/windows8253/40715557911/',

      ownerID: '148656842@N07',
      username: 'windows8253',
      displayName: 'windows8253',
      realName: 'win dows',

      smallImageURL:
          'http://farm5.staticflickr.com/4791/40715557911_1bbe294447.jpg',
      mediumImageURL:
          'http://farm5.staticflickr.com/4791/40715557911_1bbe294447_c.jpg',
      largeImageURL:
          'http://farm5.staticflickr.com/4791/40715557911_1bbe294447_b.jpg',
      xlargeImageURL:
          'http://farm5.staticflickr.com/4791/40715557911_1bbe294447_h.jpg',
      origImageURL:
          'http://farm5.staticflickr.com/4791/40715557911_b1e684eaba_o.jpg',
    });
  }

  @test
  async example2() {
    const photo: FlickrPhoto =
        await this._store.fromFlickrAPIPhoto(apiPhoto2JSON as APIPhoto);
    this.verifyFlickrPhoto(photo, {
      title: 'DSC_5902',
      description: '',
      pageURLString: 'https://www.flickr.com/photos/tastyeagle/40582436412/',

      ownerID: '57608039@N00',
      username: 'tastyeagle',
      displayName: 'tastyeagle',
      realName: 'Tasty Eagle',

      smallImageURL:
          'http://farm5.staticflickr.com/4705/40582436412_7ca4504cc6.jpg',
      mediumImageURL:
          'http://farm5.staticflickr.com/4705/40582436412_7ca4504cc6_c.jpg',
      largeImageURL:
          'http://farm5.staticflickr.com/4705/40582436412_7ca4504cc6_b.jpg',
      xlargeImageURL:
          'http://farm5.staticflickr.com/4705/40582436412_7ca4504cc6_h.jpg',
      origImageURL:
          'http://farm5.staticflickr.com/4705/40582436412_2773b9c829_o.jpg',
    });
  }

  @test
  async example3() {
    const photo: FlickrPhoto =
        await this._store.fromFlickrAPIPhoto(apiPhoto3JSON as APIPhoto);
    this.verifyFlickrPhoto(photo, {
      title: '10c go',
      description: '',
      pageURLString:
          'https://www.flickr.com/photos/sunbuggylasvegas/38905515640/',

      ownerID: '95798318@N07',
      username: 'sunbuggylasvegas',
      displayName: 'SunBuggy Las Vegas',
      realName: 'SunBuggy FunRentals',

      smallImageURL:
          'http://farm5.staticflickr.com/4789/38905515640_c78a37bcd3.jpg',
      mediumImageURL:
          'http://farm5.staticflickr.com/4789/38905515640_c78a37bcd3_c.jpg',
      largeImageURL:
          'http://farm5.staticflickr.com/4789/38905515640_c78a37bcd3_b.jpg',
      xlargeImageURL:
          'http://farm5.staticflickr.com/4789/38905515640_c78a37bcd3_h.jpg',
      origImageURL:
          'http://farm5.staticflickr.com/4789/38905515640_36eb989fae_o.jpg',
    });
  }

  private verifyFlickrPhoto(photo: FlickrPhoto, verifyAgainst: {
    title: string,
    description: string,
    pageURLString: string,
    smallImageURL: string,
    mediumImageURL: string,
    largeImageURL: string,
    xlargeImageURL: string,
    origImageURL: string,
    ownerID: string,
    username?: string,
    displayName?: string,
    realName?: string,
  }) {
    chai.expect(photo).to.exist('Photo did not exist.');
    photo.title!.should.equal(verifyAgainst.title);
    photo.flickrPageURL!.href!.should.equal(verifyAgainst.pageURLString);

    photo.owner!.nsid.should.equal(verifyAgainst.ownerID);
    if (verifyAgainst.username) {
      photo.owner!.username!.should.equal(verifyAgainst.username);
    }
    if (verifyAgainst.displayName) {
      photo.owner!.displayName!.should.equal(verifyAgainst.displayName);
    }
    if (verifyAgainst.realName) {
      photo.owner!.realName!.should.equal(verifyAgainst.realName);
    }

    photo.smallImageURL!.href!.should.equal(verifyAgainst.smallImageURL);
    photo.mediumImageURL!.href!.should.equal(verifyAgainst.mediumImageURL);
    photo.largeImageURL!.href!.should.equal(verifyAgainst.largeImageURL);
    photo.xlargeImageURL!.href!.should.equal(verifyAgainst.xlargeImageURL);
    photo.origImageURL!.href!.should.equal(verifyAgainst.origImageURL);
  }

  async after() {
    return this._connection.dropDatabase().then(() => this._connection.close());
  }
}

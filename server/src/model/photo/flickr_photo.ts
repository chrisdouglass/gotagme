import {PhotoTag} from 'flickr-sdk';
import {Connection, Document, Model, Schema} from 'mongoose';
import {parse as parseURL, Url} from 'url';

import {DocumentWrapper} from '../base/document_wrapper';

export class FlickrPhoto extends DocumentWrapper<FlickrPhotoDocument> {
  constructor(flickrPhotoModel: FlickrPhotoDocument) {
    super(flickrPhotoModel);
  }

  // static

  /**
   * Creates a flickr Tag from an tag dictionary response.
   * @param apiTag - The JSON dictionary returned by the flickr API.
   * @return A new flickr Tag initialized from the dictionary.
   */
  static tagFromAPITag(apiTag: PhotoTag): Tag {
    // TODO: Make more space efficient by using a Tag entity.
    return {
      tag: apiTag._content,
      displayName: apiTag.raw,
      userNSID: apiTag.author,
      userDisplayName: apiTag.authorname,
    } as Tag;
  }

  get flickrID(): string {
    return this.model.flickrID;
  }

  get title(): string|undefined {
    return this.model.title;
  }

  get description(): string|undefined {
    return this.model.description;
  }

  get uploadDate(): number|undefined {
    return this.model.uploadDate;
  }

  get captureDate(): number|undefined {
    return this.model.captureDate;
  }

  get owner(): Owner|undefined {
    return this.model.owner;
  }

  get flickrPageURL(): Url|undefined {
    return !this.model.flickrPageURL ? undefined :
                                       parseURL(this.model.flickrPageURL);
  }

  get smallImageURL(): Url|undefined {
    return !this.model.smallImageURL ? undefined :
                                       parseURL(this.model.smallImageURL);
  }

  get mediumImageURL(): Url|undefined {
    return !this.model.mediumImageURL ? undefined :
                                        parseURL(this.model.mediumImageURL);
  }

  get largeImageURL(): Url|undefined {
    return !this.model.largeImageURL ? undefined :
                                       parseURL(this.model.largeImageURL);
  }

  get xlargeImageURL(): Url|undefined {
    return !this.model.xlargeImageURL ? undefined :
                                        parseURL(this.model.xlargeImageURL);
  }

  get origImageURL(): Url|undefined {
    return !this.model.origImageURL ? undefined :
                                      parseURL(this.model.origImageURL);
  }

  get tags(): Tag[]|undefined {
    return this.model.tags;
  }
}

export interface Owner {
  id: string;
  username?: string;
  displayName?: string;
  realName?: string;
}

export interface Tag {
  tag: string;
  displayName?: string;
  userNSID: string;
  userDisplayName?: string;
}

export interface FlickrPhotoDocument extends Document {
  flickrID: string;
  title?: string;
  description?: string;
  uploadDate?: number;
  captureDate?: number;
  owner?: Owner;
  flickrPageURL?: string;
  smallImageURL?: string;
  mediumImageURL?: string;
  largeImageURL?: string;
  xlargeImageURL?: string;
  origImageURL?: string;
  tags?: Tag[];
}

const flickrPhotoSchema = new Schema({
  flickrID: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
  uploadDate: Date,
  captureDate: Date,
  owner: {
    id: String,
    username: String,
    displayName: String,
    realName: String,
  },
  flickrPageURL: String,
  smallImageURL: String,
  mediumImageURL: String,
  largeImageURL: String,
  xlargeImageURL: String,
  origImageURL: String,
  tags: [{
    tag: String,
    displayName: String,
    userNSID: String,
    userDisplayName: String,
  }],
});

export const flickrPhotoModelFactory =
    (connection: Connection): Model<FlickrPhotoDocument> => {
      return connection.model<FlickrPhotoDocument>(
          'flickrPhoto', flickrPhotoSchema, 'flickrPhoto');
    };

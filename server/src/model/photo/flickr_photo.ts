import {PhotoTag} from 'flickr-sdk';
import {Connection, Document, Model, Schema} from 'mongoose';
import {parse as parseUrl, Url} from 'url';

import {DocumentWrapper} from '../base/document_wrapper';

export class FlickrPhoto extends DocumentWrapper<FlickrPhotoDocument> {
  constructor(flickrPhotoModel: FlickrPhotoDocument) {
    super(flickrPhotoModel);
  }

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
    return this.document.flickrID;
  }

  get title(): string {
    return this.document.title;
  }

  get description(): string {
    return this.document.description;
  }

  get uploadDate(): number|undefined {
    return this.document.uploadDate;
  }

  get captureDate(): number|undefined {
    return this.document.captureDate;
  }

  get owner(): Owner|undefined {
    return this.document.owner;
  }

  get flickrPageUrl(): Url|undefined {
    return !this.document.flickrPageUrl ? undefined :
                                          parseUrl(this.document.flickrPageUrl);
  }

  get smallImageUrl(): Url|undefined {
    return !this.document.smallImageUrl ? undefined :
                                          parseUrl(this.document.smallImageUrl);
  }

  get mediumImageUrl(): Url|undefined {
    return !this.document.mediumImageUrl ?
        undefined :
        parseUrl(this.document.mediumImageUrl);
  }

  get largeImageUrl(): Url|undefined {
    return !this.document.largeImageUrl ? undefined :
                                          parseUrl(this.document.largeImageUrl);
  }

  get xlargeImageUrl(): Url|undefined {
    return !this.document.xlargeImageUrl ?
        undefined :
        parseUrl(this.document.xlargeImageUrl);
  }

  get origImageUrl(): Url|undefined {
    return !this.document.origImageUrl ? undefined :
                                         parseUrl(this.document.origImageUrl);
  }

  get tags(): Tag[]|undefined {
    return this.document.tags;
  }
}

export interface Owner {
  nsid: string;
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
  title: string;
  description: string;
  uploadDate?: number;
  captureDate?: number;
  owner?: Owner;
  flickrPageUrl?: string;
  smallImageUrl?: string;
  mediumImageUrl?: string;
  largeImageUrl?: string;
  xlargeImageUrl?: string;
  origImageUrl?: string;
  tags?: Tag[];
}

const flickrPhotoSchema = new Schema({
  flickrID: {
    type: String,
    validate: {
      validator: (ID: string) => {
        return (ID != null);
      },
      message: 'flickrID must exist.'
    }
  },
  title: {
    type: String,
    validate: {
      validator: (title: string) => {
        return (title != null);
      },
      message: 'title is expected to exist.'
    }
  },
  description: {
    type: String,
    validate: {
      validator: (title: string) => {
        return (title != null);
      },
      message: 'description is expected to exist.'
    }
  },
  uploadDate: Date,
  captureDate: Date,
  owner: {
    nsid: String,
    username: String,
    displayName: String,
    realName: String,
  },
  flickrPageUrl: String,
  smallImageUrl: String,
  mediumImageUrl: String,
  largeImageUrl: String,
  xlargeImageUrl: String,
  origImageUrl: String,
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

import {Connection, Document, Model, Schema} from 'mongoose';
import { DocumentWrapper } from '../base/document_wrapper';

export class FlickrPhoto extends DocumentWrapper<FlickrPhotoDocument> {
  constructor(flickrPhotoModel: FlickrPhotoDocument) {
    super(flickrPhotoModel);
  }

  // static

  /**
   * Creates a flickr Tag from an tag dictionary response.
   * @param {dictionary} APITag - The JSON dictionary returned by the flickr
   *        API.
   * @return {FlickrTag} A new FlickrTag initialized from the dictionary.
   */
  tagFromAPITag(APITag: any) {
    // TODO: Make more space efficient by using a Tag entity.
    return {
      tag: APITag._content,
      displayName:  APITag.raw,
      userID: APITag.author,
      userDisplayName: APITag.authorname,
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

  get flickrPageURL(): string|undefined {
    return this.model.flickrPageURL;
  }

  get smallImageURL(): string|undefined {
    return this.model.smallImageURL;
  }

  get mediumImageURL(): string|undefined {
    return this.model.mediumImageURL;
  }

  get largeImageURL(): string|undefined {
    return this.model.largeImageURL;
  }

  get xlargeImageURL(): string|undefined {
    return this.model.xlargeImageURL;
  }

  get origImageURL(): string|undefined {
    return this.model.origImageURL;
  }

  get tags(): Tag[]|undefined {
    return this.model.tags;
  }
}

export interface Owner {
  id: string,
  username?: string,
  displayName?: string,
  realName?: string,
}

export interface Tag {
  tag: string,
  displayName?: string,
  userID?: string,
  userDisplayName?: string,
}

export interface FlickrPhotoDocument extends Document {
  flickrID: string,
  title?: string,
  description?: string,
  uploadDate?: number,
  captureDate?: number,
  owner?: Owner,
  flickrPageURL?: string,
  smallImageURL?: string,
  mediumImageURL?: string,
  largeImageURL?: string,
  xlargeImageURL?: string,
  origImageURL?: string,
  tags?: [Tag],
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
    userID: String,
    userDisplayName: String,
  }],
});

export const flickrPhotoModelFactory =
    (connection: Connection): Model<FlickrPhotoDocument> => {
      return connection.model<FlickrPhotoDocument>(
          'flickrPhoto', flickrPhotoSchema, 'flickrPhoto');
    };

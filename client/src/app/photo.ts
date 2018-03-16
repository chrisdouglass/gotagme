export class Photo {
  photoID: string;
  postedBy: {};//this.postedBy.toJSON(),
  capturedBy: {};//this.capturedBy ? this.capturedBy.toJSON() : undefined,
  capturedAt: number;
  status: string;
  flickrUrl: string;
  smallImageUrl: string;
  largeImageUrl: string;
  xlargeImageUrl: string;
  origImageUrl: string;
}

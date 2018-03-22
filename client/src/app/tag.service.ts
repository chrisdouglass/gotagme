import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Url, parse as parseUrl } from 'url';

@Injectable()
export class TagService {
  public reviewTags(): Observable<Tag[]> {
    return Observable.create(observer => {
      // TODO: Replace with localized date formatter.
      const options: Intl.DateTimeFormatOptions =
          { year: '2-digit', month: 'numeric', day: 'numeric' };
      const language: string = window.navigator.language;

      // TODO: Replace with real data.
      observer.next([
        {
          date: new Date(),
          localizedDateString: (new Date()).toLocaleDateString(language, options),
          user: { displayName: '@poop'} as User,
          externalUrl: parseUrl('https://www.flickr.com/photos/username/01234567890/'),
          imageUrl: parseUrl('http://fpoimg.com/600x400'),
        } as Tag,
        {
          date: new Date(),
          localizedDateString: (new Date()).toLocaleDateString(language, options),
          user: { displayName: '@poop2'} as User,
          externalUrl: parseUrl('https://www.flickr.com/photos/username/01234567890/'),
          imageUrl: parseUrl('http://fpoimg.com/400x600'),
        } as Tag,
        {
          date: new Date(),
          localizedDateString: (new Date()).toLocaleDateString(language, options),
          user: { displayName: '@poop2'} as User,
          externalUrl: parseUrl('https://www.flickr.com/photos/username/01234567890/'),
          imageUrl: parseUrl('http://fpoimg.com/500x300'),
        } as Tag,
        {
          date: new Date(),
          localizedDateString: (new Date()).toLocaleDateString(language, options),
          user: { displayName: '@poop2'} as User,
          externalUrl: parseUrl('https://www.flickr.com/photos/username/01234567890/'),
          imageUrl: parseUrl('http://fpoimg.com/400x300'),
        } as Tag,
        {
          date: new Date(),
          localizedDateString: (new Date()).toLocaleDateString(language, options),
          user: { displayName: '@poop2'} as User,
          externalUrl: parseUrl('https://www.flickr.com/photos/username/01234567890/'),
          imageUrl: parseUrl('http://fpoimg.com/900x600'),
        } as Tag,
      ]);
    });
  }
}

export interface Tag {
  date: Date,
  localizedDateString: string,
  user: User,
  externalUrl: Url,
  imageUrl: Url,
}

// TODO: Move out of this of course.
export interface User {
  displayName: string,
}

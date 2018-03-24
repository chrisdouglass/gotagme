import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {parse as parseUrl} from 'url';
import {Tag, User} from '../models';

@Injectable()
export class TagService {
  reviewTags(): Observable<Tag[]> {
    return Observable.create(observer => {
      // TODO: Replace with localized date formatter.
      const options: Intl.DateTimeFormatOptions = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
      };
      const language: string = window.navigator.language;

      // TODO: Replace with real data.
      observer.next([
        {
          date: new Date(),
          localizedDateString:
              (new Date()).toLocaleDateString(language, options),
          user: {displayName: '@poop'} as User,
          externalUrl:
              parseUrl('https://www.flickr.com/photos/username/01234567890/'),
          imageUrl: parseUrl('http://fpoimg.com/600x400'),
        } as Tag,
        {
          date: new Date(),
          localizedDateString:
              (new Date()).toLocaleDateString(language, options),
          user: {displayName: '@poop2'} as User,
          externalUrl:
              parseUrl('https://www.flickr.com/photos/username/01234567890/'),
          imageUrl: parseUrl('http://fpoimg.com/400x600'),
        } as Tag,
        {
          date: new Date(),
          localizedDateString:
              (new Date()).toLocaleDateString(language, options),
          user: {displayName: '@poop2'} as User,
          externalUrl:
              parseUrl('https://www.flickr.com/photos/username/01234567890/'),
          imageUrl: parseUrl('http://fpoimg.com/500x300'),
        } as Tag,
        {
          date: new Date(),
          localizedDateString:
              (new Date()).toLocaleDateString(language, options),
          user: {displayName: '@poop2'} as User,
          externalUrl:
              parseUrl('https://www.flickr.com/photos/username/01234567890/'),
          imageUrl: parseUrl('http://fpoimg.com/400x300'),
        } as Tag,
        {
          date: new Date(),
          localizedDateString:
              (new Date()).toLocaleDateString(language, options),
          user: {displayName: '@poop2'} as User,
          externalUrl:
              parseUrl('https://www.flickr.com/photos/username/01234567890/'),
          imageUrl: parseUrl('http://fpoimg.com/900x600'),
        } as Tag,
      ]);
    });
  }
}

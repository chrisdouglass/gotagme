# Angular Module for displaying a feed of items in a masonry layout using [https://github.com/desandro/masonry](https://github.com/desandro/masonry)

This package is a fork from [https://github.com/jelgblad/angular2-masonry](https://github.com/jelgblad/angular2-masonry) to update it to work for newer Angular releases as no work seems to have been done on it for almost 12 months (at the time of writing this).

**If I have the time I will look into further improvements, but please do not expect support as I don't have the time for that**.

This updated version is also compatible with Angular Universal server side rendering (SSR)

[![npm version](https://badge.fury.io/js/ngx-masonry.svg)](https://www.npmjs.com/package/ngx-masonry)

> ngx-masonry is in development and **not ready for production use**.
> Feel free to install and try it out, but depend on it at your own risk.

## Installation

`npm install ngx-masonry --save`

If you're using SystemJS add `ngx-masonry` and `masonry-layout` to your configuration:

```json
packages: {
  "ngx-masonry": { "defaultExtension": "js", "main": "index" }
},
map: {
  "ngx-masonry": "node_modules/ngx-masonry",
  "masonry-layout": "node_modules/masonry-layout/dist/masonry.pkgd.js"
}
```

## Usage

Import `NgxMasonryModule` into your app's modules:

```typescript
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
  imports: [
    NgxMasonryModule
  ]
})
```

```typescript
@Component({
  selector: 'my-component',
  template: `
     <ngx-masonry>
       <ngx-masonry-item class="masonry-item" *ngFor="let item of masonryItems">{{item.title}}</ngx-masonry-item>
     </ngx-masonry>
     `,
  styles: [
    `
       .masonry-item { width: 200px; }
     `
  ]
})
class MyComponent {
  masonryItems = [
    { title: 'item 1' },
    { title: 'item 2' },
    { title: 'item 3' },
    { title: 'item 4' },
    { title: 'item 5' },
    { title: 'item 6' }
  ];
}
```

## Configuration

### Options

Read about Masonry options here: [Masonry Options](http://masonry.desandro.com/options.html)

The `options`-attribute takes an object with the following properties:

* itemSelector: string;
* columnWidth: number | string;
* gutter: number;
* percentPosition: boolean;
* stamp: string;
* fitWidth: boolean;
* originLeft: boolean;
* originTop: boolean;
* containerStyle: string;
* transitionDuration: string;
* resize: boolean;
* initLayout: boolean;

#### Examples

Inline object:

```html
<ngx-masonry [options]="{ transitionDuration: '0.8s' }"></ngx-masonry>
```

From parent component:

```javascript
import { MasonryOptions } from 'ngx-masonry';

public myOptions: MasonryOptions = {
  transitionDuration: '0.8s'
};
```

```html
<ngx-masonry [options]="myOptions"></ngx-masonry>
```

### imagesLoaded

> **NOTE:** Will throw error if global `imagesLoaded` not available.

Delay adding brick until all images in brick are loaded.
To activate imagesLoaded set `useImagesLoaded` to `true`.

```html
<ngx-masonry [useImagesLoaded]="true"></ngx-masonry>
```

index.html:

```html
<script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>
```

check the [ImagesLoaded](https://imagesloaded.desandro.com/) website for the latest version.

### updateLayout

ngx-masonry has an input property, `updateLayout`, which accepts a boolean and will call masonry's `layout()` method on a change. It ignores the first change when the component loads.

```html
<ngx-masonry [updateLayout]="updateMasonryLayout"></ngx-masonry>
```

When `updateMasonryLayout` is updated, the `layout()` method will be called.

## Events

### layoutComplete: `EventEmitter<any[]>`

Triggered after a layout and all positioning transitions have completed.

> [http://masonry.desandro.com/events.html#layoutcomplete](http://masonry.desandro.com/events.html#layoutcomplete)

### removeComplete: `EventEmitter<any[]>`

Triggered after an item element has been removed.

> [http://masonry.desandro.com/events.html#removecomplete](http://masonry.desandro.com/events.html#removecomplete)

### Examples

```html
<ngx-masonry (layoutComplete)="doStuff($event)" (removeComplete)="doOtherStuff($event)"></ngx-masonry>
```

## Demo

This repository contains a working app using ngx-masonry as a child module, not as an npm package. You can go to the [demo respository](https://github.com/gethinoakes/ngx-masonry-demo) to view an app that uses it as an npm package.

[View a live demo here](https://ngx-masonry-demo.herokuapp.com/)

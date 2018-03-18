import { Component, Directive, ElementRef, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, forwardRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

var imagesLoaded = undefined;
var masonryConstructor = undefined;
class NgxMasonryComponent {
    /**
     * @param {?} platformId
     * @param {?} _element
     */
    constructor(platformId, _element) {
        this.platformId = platformId;
        this._element = _element;
        this.useImagesLoaded = false;
        this.updateLayout = false;
        // Outputs
        this.layoutComplete = new EventEmitter();
        this.removeComplete = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        ///TODO: How to load imagesloaded only if this.useImagesLoaded===true?
        if (this.useImagesLoaded && imagesLoaded === undefined) {
            imagesLoaded = require('imagesloaded');
        }
        if (isPlatformBrowser(this.platformId) && masonryConstructor === undefined) {
            masonryConstructor = require('masonry-layout');
        }
        // Create masonry options object
        if (!this.options)
            this.options = {};
        // Set default itemSelector
        if (!this.options.itemSelector) {
            this.options.itemSelector = '[ngx-masonry-item], ngx-masonry-item';
        }
        if (isPlatformBrowser(this.platformId)) {
            // Initialize Masonry
            this._msnry = new masonryConstructor(this._element.nativeElement, this.options);
            // Bind to events
            this._msnry.on('layoutComplete', (items) => {
                this.layoutComplete.emit(items);
            });
            this._msnry.on('removeComplete', (items) => {
                this.removeComplete.emit(items);
            });
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // only update layout if it's not the first change
        if (changes.updateLayout) {
            if (!changes.updateLayout.firstChange) {
                this.layout();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._msnry) {
            this._msnry.destroy();
        }
    }
    /**
     * @return {?}
     */
    layout() {
        setTimeout(() => {
            this._msnry.layout();
        });
    }
    /**
     * @return {?}
     */
    reloadItems() {
        setTimeout(() => {
            this._msnry.reloadItems();
        });
    }
    /**
     * @param {?} element
     * @return {?}
     */
    add(element) {
        var /** @type {?} */ isFirstItem = false;
        // Check if first item
        if (this._msnry.items.length === 0) {
            isFirstItem = true;
        }
        if (this.useImagesLoaded) {
            imagesLoaded(element, (instance) => {
                this._element.nativeElement.appendChild(element);
                // Tell Masonry that a child element has been added
                this._msnry.appended(element);
                // layout if first item
                if (isFirstItem)
                    this.layout();
            });
            this._element.nativeElement.removeChild(element);
        }
        else {
            // Tell Masonry that a child element has been added
            this._msnry.appended(element);
            // layout if first item
            if (isFirstItem)
                this.layout();
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    remove(element) {
        // Tell Masonry that a child element has been removed
        this._msnry.remove(element);
        // Layout items
        this.layout();
    }
}
NgxMasonryComponent.decorators = [
    { type: Component, args: [{
                selector: '[ngx-masonry], ngx-masonry',
                template: '<ng-content></ng-content>',
                styles: [
                    `
		:host {
			display: block;
		}
	`
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxMasonryComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: ElementRef, },
];
NgxMasonryComponent.propDecorators = {
    'options': [{ type: Input },],
    'useImagesLoaded': [{ type: Input },],
    'updateLayout': [{ type: Input },],
    'layoutComplete': [{ type: Output },],
    'removeComplete': [{ type: Output },],
};

class NgxMasonryDirective {
    /**
     * @param {?} _element
     * @param {?} _parent
     * @param {?} platformId
     */
    constructor(_element, _parent, platformId) {
        this._element = _element;
        this._parent = _parent;
        this.platformId = platformId;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this._parent.add(this._element.nativeElement);
            this.watchForHtmlChanges();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (isPlatformBrowser(this.platformId)) {
            this._parent.remove(this._element.nativeElement);
        }
    }
    /**
     * When HTML in brick changes dinamically, observe that and change layout
     * @return {?}
     */
    watchForHtmlChanges() {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        if (MutationObserver) {
            /**
             * Watch for any changes to subtree
             */
            let self = this;
            let /** @type {?} */ observer = new MutationObserver(function (mutations, observerFromElement) {
                self._parent.layout();
            });
            // define what element should be observed by the observer
            // and what types of mutations trigger the callback
            observer.observe(this._element.nativeElement, {
                subtree: true,
                childList: true
            });
        }
    }
}
NgxMasonryDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngx-masonry-item], ngx-masonry-item'
            },] },
];
/**
 * @nocollapse
 */
NgxMasonryDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: NgxMasonryComponent, decorators: [{ type: Inject, args: [forwardRef(() => NgxMasonryComponent),] },] },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
];

/*-- ngx-masonry --*/
class NgxMasonryModule {
}
NgxMasonryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    NgxMasonryComponent,
                    NgxMasonryDirective
                ],
                declarations: [
                    NgxMasonryComponent,
                    NgxMasonryDirective
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxMasonryModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { NgxMasonryModule, NgxMasonryComponent, NgxMasonryDirective };
//# sourceMappingURL=ngx-masonry.js.map

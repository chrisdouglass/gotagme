import { Component, Directive, ElementRef, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, forwardRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
var imagesLoaded = undefined;
var masonryConstructor = undefined;
var NgxMasonryComponent = (function () {
    /**
     * @param {?} platformId
     * @param {?} _element
     */
    function NgxMasonryComponent(platformId, _element) {
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
    NgxMasonryComponent.prototype.ngOnInit = function () {
        var _this = this;
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
            this._msnry.on('layoutComplete', function (items) {
                _this.layoutComplete.emit(items);
            });
            this._msnry.on('removeComplete', function (items) {
                _this.removeComplete.emit(items);
            });
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxMasonryComponent.prototype.ngOnChanges = function (changes) {
        // only update layout if it's not the first change
        if (changes.updateLayout) {
            if (!changes.updateLayout.firstChange) {
                this.layout();
            }
        }
    };
    /**
     * @return {?}
     */
    NgxMasonryComponent.prototype.ngOnDestroy = function () {
        if (this._msnry) {
            this._msnry.destroy();
        }
    };
    /**
     * @return {?}
     */
    NgxMasonryComponent.prototype.layout = function () {
        var _this = this;
        setTimeout(function () {
            _this._msnry.layout();
        });
    };
    /**
     * @return {?}
     */
    NgxMasonryComponent.prototype.reloadItems = function () {
        var _this = this;
        setTimeout(function () {
            _this._msnry.reloadItems();
        });
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NgxMasonryComponent.prototype.add = function (element) {
        var _this = this;
        var /** @type {?} */ isFirstItem = false;
        // Check if first item
        if (this._msnry.items.length === 0) {
            isFirstItem = true;
        }
        if (this.useImagesLoaded) {
            imagesLoaded(element, function (instance) {
                _this._element.nativeElement.appendChild(element);
                // Tell Masonry that a child element has been added
                _this._msnry.appended(element);
                // layout if first item
                if (isFirstItem)
                    _this.layout();
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
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NgxMasonryComponent.prototype.remove = function (element) {
        // Tell Masonry that a child element has been removed
        this._msnry.remove(element);
        // Layout items
        this.layout();
    };
    return NgxMasonryComponent;
}());
NgxMasonryComponent.decorators = [
    { type: Component, args: [{
                selector: '[ngx-masonry], ngx-masonry',
                template: '<ng-content></ng-content>',
                styles: [
                    "\n\t\t:host {\n\t\t\tdisplay: block;\n\t\t}\n\t"
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxMasonryComponent.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: ElementRef, },
]; };
NgxMasonryComponent.propDecorators = {
    'options': [{ type: Input },],
    'useImagesLoaded': [{ type: Input },],
    'updateLayout': [{ type: Input },],
    'layoutComplete': [{ type: Output },],
    'removeComplete': [{ type: Output },],
};
var NgxMasonryDirective = (function () {
    /**
     * @param {?} _element
     * @param {?} _parent
     * @param {?} platformId
     */
    function NgxMasonryDirective(_element, _parent, platformId) {
        this._element = _element;
        this._parent = _parent;
        this.platformId = platformId;
    }
    /**
     * @return {?}
     */
    NgxMasonryDirective.prototype.ngAfterViewInit = function () {
        if (isPlatformBrowser(this.platformId)) {
            this._parent.add(this._element.nativeElement);
            this.watchForHtmlChanges();
        }
    };
    /**
     * @return {?}
     */
    NgxMasonryDirective.prototype.ngOnDestroy = function () {
        if (isPlatformBrowser(this.platformId)) {
            this._parent.remove(this._element.nativeElement);
        }
    };
    /**
     * When HTML in brick changes dinamically, observe that and change layout
     * @return {?}
     */
    NgxMasonryDirective.prototype.watchForHtmlChanges = function () {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        if (MutationObserver) {
            /**
             * Watch for any changes to subtree
             */
            var self_1 = this;
            var /** @type {?} */ observer = new MutationObserver(function (mutations, observerFromElement) {
                self_1._parent.layout();
            });
            // define what element should be observed by the observer
            // and what types of mutations trigger the callback
            observer.observe(this._element.nativeElement, {
                subtree: true,
                childList: true
            });
        }
    };
    return NgxMasonryDirective;
}());
NgxMasonryDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngx-masonry-item], ngx-masonry-item'
            },] },
];
/**
 * @nocollapse
 */
NgxMasonryDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: NgxMasonryComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return NgxMasonryComponent; }),] },] },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
]; };
/*-- ngx-masonry --*/
var NgxMasonryModule = (function () {
    function NgxMasonryModule() {
    }
    return NgxMasonryModule;
}());
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
NgxMasonryModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { NgxMasonryModule, NgxMasonryComponent, NgxMasonryDirective };
//# sourceMappingURL=ngx-masonry.es5.js.map

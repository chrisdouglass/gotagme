import { ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { NgxMasonryComponent } from './ngx-masonry.component';
export declare class NgxMasonryDirective implements OnDestroy, AfterViewInit {
    private _element;
    private _parent;
    private platformId;
    constructor(_element: ElementRef, _parent: NgxMasonryComponent, platformId: any);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** When HTML in brick changes dinamically, observe that and change layout */
    private watchForHtmlChanges();
}

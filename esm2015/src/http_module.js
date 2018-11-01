import { NgModule } from '@angular/core';
import { BrowserJsonp } from './backends/browser_jsonp';
import { BrowserXhr } from './backends/browser_xhr';
import { JSONPBackend } from './backends/jsonp_backend';
import { CookieXSRFStrategy, XHRBackend } from './backends/xhr_backend';
import { BaseRequestOptions, RequestOptions } from './base_request_options';
import { BaseResponseOptions, ResponseOptions } from './base_response_options';
import { Http, Jsonp } from './http';
import { XSRFStrategy } from './interfaces';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @return {?}
 */
export function _createDefaultCookieXSRFStrategy() {
    return new CookieXSRFStrategy();
}
/**
 * @param {?} xhrBackend
 * @param {?} requestOptions
 * @return {?}
 */
export function httpFactory(xhrBackend, requestOptions) {
    return new Http(xhrBackend, requestOptions);
}
/**
 * @param {?} jsonpBackend
 * @param {?} requestOptions
 * @return {?}
 */
export function jsonpFactory(jsonpBackend, requestOptions) {
    return new Jsonp(jsonpBackend, requestOptions);
}
/**
 * The module that includes http's providers
 *
 * @deprecated see https://angular.io/guide/http
 * \@publicApi
 */
export class HttpModule {
}
HttpModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    // TODO(pascal): use factory type annotations once supported in DI
                    // issue: https://github.com/angular/angular/issues/3183
                    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
                    BrowserXhr,
                    { provide: RequestOptions, useClass: BaseRequestOptions },
                    { provide: ResponseOptions, useClass: BaseResponseOptions },
                    XHRBackend,
                    { provide: XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy },
                ],
            },] },
];
HttpModule.ngModuleDef = i0.ɵdefineNgModule({ type: HttpModule, bootstrap: [], declarations: [], imports: [], exports: [] });
HttpModule.ngInjectorDef = i0.defineInjector({ factory: function HttpModule_Factory(t) { return new (t || HttpModule)(); }, providers: [
        // TODO(pascal): use factory type annotations once supported in DI
        // issue: https://github.com/angular/angular/issues/3183
        { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
        BrowserXhr,
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: ResponseOptions, useClass: BaseResponseOptions },
        XHRBackend,
        { provide: XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy },
    ], imports: [] });
/*@__PURE__*/ i0.ɵsetClassMetadata(HttpModule, [{
        type: NgModule,
        args: [{
                providers: [
                    // TODO(pascal): use factory type annotations once supported in DI
                    // issue: https://github.com/angular/angular/issues/3183
                    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
                    BrowserXhr,
                    { provide: RequestOptions, useClass: BaseRequestOptions },
                    { provide: ResponseOptions, useClass: BaseResponseOptions },
                    XHRBackend,
                    { provide: XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy },
                ],
            }]
    }], null, null);
/**
 * The module that includes jsonp's providers
 *
 * @deprecated see https://angular.io/guide/http
 * \@publicApi
 */
export class JsonpModule {
}
JsonpModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    // TODO(pascal): use factory type annotations once supported in DI
                    // issue: https://github.com/angular/angular/issues/3183
                    { provide: Jsonp, useFactory: jsonpFactory, deps: [JSONPBackend, RequestOptions] },
                    BrowserJsonp,
                    { provide: RequestOptions, useClass: BaseRequestOptions },
                    { provide: ResponseOptions, useClass: BaseResponseOptions },
                    JSONPBackend,
                ],
            },] },
];
JsonpModule.ngModuleDef = i0.ɵdefineNgModule({ type: JsonpModule, bootstrap: [], declarations: [], imports: [], exports: [] });
JsonpModule.ngInjectorDef = i0.defineInjector({ factory: function JsonpModule_Factory(t) { return new (t || JsonpModule)(); }, providers: [
        // TODO(pascal): use factory type annotations once supported in DI
        // issue: https://github.com/angular/angular/issues/3183
        { provide: Jsonp, useFactory: jsonpFactory, deps: [JSONPBackend, RequestOptions] },
        BrowserJsonp,
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: ResponseOptions, useClass: BaseResponseOptions },
        JSONPBackend,
    ], imports: [] });
/*@__PURE__*/ i0.ɵsetClassMetadata(JsonpModule, [{
        type: NgModule,
        args: [{
                providers: [
                    // TODO(pascal): use factory type annotations once supported in DI
                    // issue: https://github.com/angular/angular/issues/3183
                    { provide: Jsonp, useFactory: jsonpFactory, deps: [JSONPBackend, RequestOptions] },
                    BrowserJsonp,
                    { provide: RequestOptions, useClass: BaseRequestOptions },
                    { provide: ResponseOptions, useClass: BaseResponseOptions },
                    JSONPBackend,
                ],
            }]
    }], null, null);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9odHRwX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLG1CQUFtQixFQUFFLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHMUMsTUFBTSxVQUFVLGdDQUFnQztJQUM5QyxPQUFPLElBQUksa0JBQWtCLEVBQUUsQ0FBQztDQUNqQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxVQUFzQixFQUFFLGNBQThCO0lBQ2hGLE9BQU8sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0NBQzdDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLFlBQTBCLEVBQUUsY0FBOEI7SUFDckYsT0FBTyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7Q0FDaEQ7Ozs7Ozs7QUFxQkQsTUFBTSxPQUFPLFVBQVU7OztZQVp0QixRQUFRLFNBQUM7Z0JB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QUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUM7b0JBQ3pELFlBQVk7aUJBQ2I7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBodHRwIG1vZHVsZSBwcm92aWRlcyBzZXJ2aWNlcyB0byBwZXJmb3JtIGh0dHAgcmVxdWVzdHMuIFRvIGdldCBzdGFydGVkLCBzZWUgdGhlIHtAbGluayBIdHRwfVxuICogY2xhc3MuXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0Jyb3dzZXJKc29ucH0gZnJvbSAnLi9iYWNrZW5kcy9icm93c2VyX2pzb25wJztcbmltcG9ydCB7QnJvd3Nlclhocn0gZnJvbSAnLi9iYWNrZW5kcy9icm93c2VyX3hocic7XG5pbXBvcnQge0pTT05QQmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kcy9qc29ucF9iYWNrZW5kJztcbmltcG9ydCB7Q29va2llWFNSRlN0cmF0ZWd5LCBYSFJCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmRzL3hocl9iYWNrZW5kJztcbmltcG9ydCB7QmFzZVJlcXVlc3RPcHRpb25zLCBSZXF1ZXN0T3B0aW9uc30gZnJvbSAnLi9iYXNlX3JlcXVlc3Rfb3B0aW9ucyc7XG5pbXBvcnQge0Jhc2VSZXNwb25zZU9wdGlvbnMsIFJlc3BvbnNlT3B0aW9uc30gZnJvbSAnLi9iYXNlX3Jlc3BvbnNlX29wdGlvbnMnO1xuaW1wb3J0IHtIdHRwLCBKc29ucH0gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7WFNSRlN0cmF0ZWd5fSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRGVmYXVsdENvb2tpZVhTUkZTdHJhdGVneSgpIHtcbiAgcmV0dXJuIG5ldyBDb29raWVYU1JGU3RyYXRlZ3koKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGh0dHBGYWN0b3J5KHhockJhY2tlbmQ6IFhIUkJhY2tlbmQsIHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0T3B0aW9ucyk6IEh0dHAge1xuICByZXR1cm4gbmV3IEh0dHAoeGhyQmFja2VuZCwgcmVxdWVzdE9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganNvbnBGYWN0b3J5KGpzb25wQmFja2VuZDogSlNPTlBCYWNrZW5kLCByZXF1ZXN0T3B0aW9uczogUmVxdWVzdE9wdGlvbnMpOiBKc29ucCB7XG4gIHJldHVybiBuZXcgSnNvbnAoanNvbnBCYWNrZW5kLCByZXF1ZXN0T3B0aW9ucyk7XG59XG5cblxuLyoqXG4gKiBUaGUgbW9kdWxlIHRoYXQgaW5jbHVkZXMgaHR0cCdzIHByb3ZpZGVyc1xuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICogQHB1YmxpY0FwaVxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICAvLyBUT0RPKHBhc2NhbCk6IHVzZSBmYWN0b3J5IHR5cGUgYW5ub3RhdGlvbnMgb25jZSBzdXBwb3J0ZWQgaW4gRElcbiAgICAvLyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzE4M1xuICAgIHtwcm92aWRlOiBIdHRwLCB1c2VGYWN0b3J5OiBodHRwRmFjdG9yeSwgZGVwczogW1hIUkJhY2tlbmQsIFJlcXVlc3RPcHRpb25zXX0sXG4gICAgQnJvd3NlclhocixcbiAgICB7cHJvdmlkZTogUmVxdWVzdE9wdGlvbnMsIHVzZUNsYXNzOiBCYXNlUmVxdWVzdE9wdGlvbnN9LFxuICAgIHtwcm92aWRlOiBSZXNwb25zZU9wdGlvbnMsIHVzZUNsYXNzOiBCYXNlUmVzcG9uc2VPcHRpb25zfSxcbiAgICBYSFJCYWNrZW5kLFxuICAgIHtwcm92aWRlOiBYU1JGU3RyYXRlZ3ksIHVzZUZhY3Rvcnk6IF9jcmVhdGVEZWZhdWx0Q29va2llWFNSRlN0cmF0ZWd5fSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgSHR0cE1vZHVsZSB7XG59XG5cbi8qKlxuICogVGhlIG1vZHVsZSB0aGF0IGluY2x1ZGVzIGpzb25wJ3MgcHJvdmlkZXJzXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIC8vIFRPRE8ocGFzY2FsKTogdXNlIGZhY3RvcnkgdHlwZSBhbm5vdGF0aW9ucyBvbmNlIHN1cHBvcnRlZCBpbiBESVxuICAgIC8vIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zMTgzXG4gICAge3Byb3ZpZGU6IEpzb25wLCB1c2VGYWN0b3J5OiBqc29ucEZhY3RvcnksIGRlcHM6IFtKU09OUEJhY2tlbmQsIFJlcXVlc3RPcHRpb25zXX0sXG4gICAgQnJvd3Nlckpzb25wLFxuICAgIHtwcm92aWRlOiBSZXF1ZXN0T3B0aW9ucywgdXNlQ2xhc3M6IEJhc2VSZXF1ZXN0T3B0aW9uc30sXG4gICAge3Byb3ZpZGU6IFJlc3BvbnNlT3B0aW9ucywgdXNlQ2xhc3M6IEJhc2VSZXNwb25zZU9wdGlvbnN9LFxuICAgIEpTT05QQmFja2VuZCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgSnNvbnBNb2R1bGUge1xufVxuIl19
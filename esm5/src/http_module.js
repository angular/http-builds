/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { BrowserJsonp } from './backends/browser_jsonp';
import { BrowserXhr } from './backends/browser_xhr';
import { JSONPBackend } from './backends/jsonp_backend';
import { CookieXSRFStrategy, XHRBackend } from './backends/xhr_backend';
import { BaseRequestOptions, RequestOptions } from './base_request_options';
import { BaseResponseOptions, ResponseOptions } from './base_response_options';
import { Http, Jsonp } from './http';
import { XSRFStrategy } from './interfaces';
export function _createDefaultCookieXSRFStrategy() {
    return new CookieXSRFStrategy();
}
export function httpFactory(xhrBackend, requestOptions) {
    return new Http(xhrBackend, requestOptions);
}
export function jsonpFactory(jsonpBackend, requestOptions) {
    return new Jsonp(jsonpBackend, requestOptions);
}
/**
 * The module that includes http's providers
 *
 * @deprecated use @angular/common/http instead
 */
var HttpModule = /** @class */ (function () {
    function HttpModule() {
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
                },] }
    ];
    return HttpModule;
}());
export { HttpModule };
/**
 * The module that includes jsonp's providers
 *
 * @deprecated use @angular/common/http instead
 */
var JsonpModule = /** @class */ (function () {
    function JsonpModule() {
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
                },] }
    ];
    return JsonpModule;
}());
export { JsonpModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9odHRwX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBY0EsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUUsVUFBVSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEUsT0FBTyxFQUFDLGtCQUFrQixFQUFFLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RSxPQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUNuQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRzFDLE1BQU07SUFDSixPQUFPLElBQUksa0JBQWtCLEVBQUUsQ0FBQztDQUNqQztBQUVELE1BQU0sc0JBQXNCLFVBQXNCLEVBQUUsY0FBOEI7SUFDaEYsT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7Q0FDN0M7QUFFRCxNQUFNLHVCQUF1QixZQUEwQixFQUFFLGNBQThCO0lBQ3JGLE9BQU8sSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0NBQ2hEOzs7Ozs7Ozs7O2dCQVFBLFFBQVEsU0FBQztvQkFDUixTQUFTLEVBQUU7Ozt3QkFHVCxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLEVBQUM7d0JBQzVFLFVBQVU7d0JBQ1YsRUFBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBQzt3QkFDdkQsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBQzt3QkFDekQsVUFBVTt3QkFDVixFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGdDQUFnQyxFQUFDO3FCQUN0RTtpQkFDRjs7cUJBdkREOztTQXdEYSxVQUFVOzs7Ozs7Ozs7O2dCQVF0QixRQUFRLFNBQUM7b0JBQ1IsU0FBUyxFQUFFOzs7d0JBR1QsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxFQUFDO3dCQUNoRixZQUFZO3dCQUNaLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUM7d0JBQ3ZELEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUM7d0JBQ3pELFlBQVk7cUJBQ2I7aUJBQ0Y7O3NCQTFFRDs7U0EyRWEsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBodHRwIG1vZHVsZSBwcm92aWRlcyBzZXJ2aWNlcyB0byBwZXJmb3JtIGh0dHAgcmVxdWVzdHMuIFRvIGdldCBzdGFydGVkLCBzZWUgdGhlIHtAbGluayBIdHRwfVxuICogY2xhc3MuXG4gKi9cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0Jyb3dzZXJKc29ucH0gZnJvbSAnLi9iYWNrZW5kcy9icm93c2VyX2pzb25wJztcbmltcG9ydCB7QnJvd3Nlclhocn0gZnJvbSAnLi9iYWNrZW5kcy9icm93c2VyX3hocic7XG5pbXBvcnQge0pTT05QQmFja2VuZH0gZnJvbSAnLi9iYWNrZW5kcy9qc29ucF9iYWNrZW5kJztcbmltcG9ydCB7Q29va2llWFNSRlN0cmF0ZWd5LCBYSFJCYWNrZW5kfSBmcm9tICcuL2JhY2tlbmRzL3hocl9iYWNrZW5kJztcbmltcG9ydCB7QmFzZVJlcXVlc3RPcHRpb25zLCBSZXF1ZXN0T3B0aW9uc30gZnJvbSAnLi9iYXNlX3JlcXVlc3Rfb3B0aW9ucyc7XG5pbXBvcnQge0Jhc2VSZXNwb25zZU9wdGlvbnMsIFJlc3BvbnNlT3B0aW9uc30gZnJvbSAnLi9iYXNlX3Jlc3BvbnNlX29wdGlvbnMnO1xuaW1wb3J0IHtIdHRwLCBKc29ucH0gZnJvbSAnLi9odHRwJztcbmltcG9ydCB7WFNSRlN0cmF0ZWd5fSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBfY3JlYXRlRGVmYXVsdENvb2tpZVhTUkZTdHJhdGVneSgpIHtcbiAgcmV0dXJuIG5ldyBDb29raWVYU1JGU3RyYXRlZ3koKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGh0dHBGYWN0b3J5KHhockJhY2tlbmQ6IFhIUkJhY2tlbmQsIHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0T3B0aW9ucyk6IEh0dHAge1xuICByZXR1cm4gbmV3IEh0dHAoeGhyQmFja2VuZCwgcmVxdWVzdE9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganNvbnBGYWN0b3J5KGpzb25wQmFja2VuZDogSlNPTlBCYWNrZW5kLCByZXF1ZXN0T3B0aW9uczogUmVxdWVzdE9wdGlvbnMpOiBKc29ucCB7XG4gIHJldHVybiBuZXcgSnNvbnAoanNvbnBCYWNrZW5kLCByZXF1ZXN0T3B0aW9ucyk7XG59XG5cblxuLyoqXG4gKiBUaGUgbW9kdWxlIHRoYXQgaW5jbHVkZXMgaHR0cCdzIHByb3ZpZGVyc1xuICpcbiAqIEBkZXByZWNhdGVkIHVzZSBAYW5ndWxhci9jb21tb24vaHR0cCBpbnN0ZWFkXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIC8vIFRPRE8ocGFzY2FsKTogdXNlIGZhY3RvcnkgdHlwZSBhbm5vdGF0aW9ucyBvbmNlIHN1cHBvcnRlZCBpbiBESVxuICAgIC8vIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zMTgzXG4gICAge3Byb3ZpZGU6IEh0dHAsIHVzZUZhY3Rvcnk6IGh0dHBGYWN0b3J5LCBkZXBzOiBbWEhSQmFja2VuZCwgUmVxdWVzdE9wdGlvbnNdfSxcbiAgICBCcm93c2VyWGhyLFxuICAgIHtwcm92aWRlOiBSZXF1ZXN0T3B0aW9ucywgdXNlQ2xhc3M6IEJhc2VSZXF1ZXN0T3B0aW9uc30sXG4gICAge3Byb3ZpZGU6IFJlc3BvbnNlT3B0aW9ucywgdXNlQ2xhc3M6IEJhc2VSZXNwb25zZU9wdGlvbnN9LFxuICAgIFhIUkJhY2tlbmQsXG4gICAge3Byb3ZpZGU6IFhTUkZTdHJhdGVneSwgdXNlRmFjdG9yeTogX2NyZWF0ZURlZmF1bHRDb29raWVYU1JGU3RyYXRlZ3l9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBIdHRwTW9kdWxlIHtcbn1cblxuLyoqXG4gKiBUaGUgbW9kdWxlIHRoYXQgaW5jbHVkZXMganNvbnAncyBwcm92aWRlcnNcbiAqXG4gKiBAZGVwcmVjYXRlZCB1c2UgQGFuZ3VsYXIvY29tbW9uL2h0dHAgaW5zdGVhZFxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICAvLyBUT0RPKHBhc2NhbCk6IHVzZSBmYWN0b3J5IHR5cGUgYW5ub3RhdGlvbnMgb25jZSBzdXBwb3J0ZWQgaW4gRElcbiAgICAvLyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzE4M1xuICAgIHtwcm92aWRlOiBKc29ucCwgdXNlRmFjdG9yeToganNvbnBGYWN0b3J5LCBkZXBzOiBbSlNPTlBCYWNrZW5kLCBSZXF1ZXN0T3B0aW9uc119LFxuICAgIEJyb3dzZXJKc29ucCxcbiAgICB7cHJvdmlkZTogUmVxdWVzdE9wdGlvbnMsIHVzZUNsYXNzOiBCYXNlUmVxdWVzdE9wdGlvbnN9LFxuICAgIHtwcm92aWRlOiBSZXNwb25zZU9wdGlvbnMsIHVzZUNsYXNzOiBCYXNlUmVzcG9uc2VPcHRpb25zfSxcbiAgICBKU09OUEJhY2tlbmQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEpzb25wTW9kdWxlIHtcbn1cbiJdfQ==
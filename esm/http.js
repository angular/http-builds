/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { BrowserJsonp } from './src/backends/browser_jsonp';
import { BrowserXhr } from './src/backends/browser_xhr';
import { JSONPBackend, JSONPBackend_ } from './src/backends/jsonp_backend';
import { CookieXSRFStrategy, XHRBackend } from './src/backends/xhr_backend';
import { BaseRequestOptions, RequestOptions } from './src/base_request_options';
import { BaseResponseOptions, ResponseOptions } from './src/base_response_options';
import { Http, Jsonp } from './src/http';
import { XSRFStrategy } from './src/interfaces';
export function _createDefaultCookieXSRFStrategy() {
    return new CookieXSRFStrategy();
}
export function httpFactory(xhrBackend, requestOptions) {
    return new Http(xhrBackend, requestOptions);
}
export function jsonpFactory(jsonpBackend, requestOptions) {
    return new Jsonp(jsonpBackend, requestOptions);
}
export class HttpModule {
}
/** @nocollapse */
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
export class JsonpModule {
}
/** @nocollapse */
JsonpModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    // TODO(pascal): use factory type annotations once supported in DI
                    // issue: https://github.com/angular/angular/issues/3183
                    { provide: Jsonp, useFactory: jsonpFactory, deps: [JSONPBackend, RequestOptions] },
                    BrowserJsonp,
                    { provide: RequestOptions, useClass: BaseRequestOptions },
                    { provide: ResponseOptions, useClass: BaseResponseOptions },
                    { provide: JSONPBackend, useClass: JSONPBackend_ },
                ],
            },] },
];
//# sourceMappingURL=http.js.map
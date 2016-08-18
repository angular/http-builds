/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * @module
 * @description
 * The http module provides services to perform http requests. To get started, see the {@link Http}
 * class.
 */
var core_1 = require('@angular/core');
var browser_jsonp_1 = require('./src/backends/browser_jsonp');
var browser_xhr_1 = require('./src/backends/browser_xhr');
var jsonp_backend_1 = require('./src/backends/jsonp_backend');
var xhr_backend_1 = require('./src/backends/xhr_backend');
var base_request_options_1 = require('./src/base_request_options');
var base_response_options_1 = require('./src/base_response_options');
var http_1 = require('./src/http');
var interfaces_1 = require('./src/interfaces');
var browser_xhr_2 = require('./src/backends/browser_xhr');
exports.BrowserXhr = browser_xhr_2.BrowserXhr;
var jsonp_backend_2 = require('./src/backends/jsonp_backend');
exports.JSONPBackend = jsonp_backend_2.JSONPBackend;
exports.JSONPConnection = jsonp_backend_2.JSONPConnection;
var xhr_backend_2 = require('./src/backends/xhr_backend');
exports.CookieXSRFStrategy = xhr_backend_2.CookieXSRFStrategy;
exports.XHRBackend = xhr_backend_2.XHRBackend;
exports.XHRConnection = xhr_backend_2.XHRConnection;
var base_request_options_2 = require('./src/base_request_options');
exports.BaseRequestOptions = base_request_options_2.BaseRequestOptions;
exports.RequestOptions = base_request_options_2.RequestOptions;
var base_response_options_2 = require('./src/base_response_options');
exports.BaseResponseOptions = base_response_options_2.BaseResponseOptions;
exports.ResponseOptions = base_response_options_2.ResponseOptions;
var enums_1 = require('./src/enums');
exports.ReadyState = enums_1.ReadyState;
exports.RequestMethod = enums_1.RequestMethod;
exports.ResponseContentType = enums_1.ResponseContentType;
exports.ResponseType = enums_1.ResponseType;
var headers_1 = require('./src/headers');
exports.Headers = headers_1.Headers;
var http_2 = require('./src/http');
exports.Http = http_2.Http;
exports.Jsonp = http_2.Jsonp;
var interfaces_2 = require('./src/interfaces');
exports.Connection = interfaces_2.Connection;
exports.ConnectionBackend = interfaces_2.ConnectionBackend;
exports.XSRFStrategy = interfaces_2.XSRFStrategy;
var static_request_1 = require('./src/static_request');
exports.Request = static_request_1.Request;
var static_response_1 = require('./src/static_response');
exports.Response = static_response_1.Response;
var url_search_params_1 = require('./src/url_search_params');
exports.QueryEncoder = url_search_params_1.QueryEncoder;
exports.URLSearchParams = url_search_params_1.URLSearchParams;
var HTTP_PROVIDERS = [
    // TODO(pascal): use factory type annotations once supported in DI
    // issue: https://github.com/angular/angular/issues/3183
    { provide: http_1.Http, useFactory: httpFactory, deps: [xhr_backend_1.XHRBackend, base_request_options_1.RequestOptions] },
    browser_xhr_1.BrowserXhr,
    { provide: base_request_options_1.RequestOptions, useClass: base_request_options_1.BaseRequestOptions },
    { provide: base_response_options_1.ResponseOptions, useClass: base_response_options_1.BaseResponseOptions },
    xhr_backend_1.XHRBackend,
    { provide: interfaces_1.XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy },
];
/**
 * @experimental
 */
function _createDefaultCookieXSRFStrategy() {
    return new xhr_backend_1.CookieXSRFStrategy();
}
exports._createDefaultCookieXSRFStrategy = _createDefaultCookieXSRFStrategy;
/**
 * @experimental
 */
function httpFactory(xhrBackend, requestOptions) {
    return new http_1.Http(xhrBackend, requestOptions);
}
exports.httpFactory = httpFactory;
var JSONP_PROVIDERS = [
    // TODO(pascal): use factory type annotations once supported in DI
    // issue: https://github.com/angular/angular/issues/3183
    { provide: http_1.Jsonp, useFactory: jsonpFactory, deps: [jsonp_backend_1.JSONPBackend, base_request_options_1.RequestOptions] },
    browser_jsonp_1.BrowserJsonp,
    { provide: base_request_options_1.RequestOptions, useClass: base_request_options_1.BaseRequestOptions },
    { provide: base_response_options_1.ResponseOptions, useClass: base_response_options_1.BaseResponseOptions },
    { provide: jsonp_backend_1.JSONPBackend, useClass: jsonp_backend_1.JSONPBackend_ },
];
/**
 * @experimental
 */
function jsonpFactory(jsonpBackend, requestOptions) {
    return new http_1.Jsonp(jsonpBackend, requestOptions);
}
exports.jsonpFactory = jsonpFactory;
var HttpModule = (function () {
    function HttpModule() {
    }
    /** @nocollapse */
    HttpModule.decorators = [
        { type: core_1.NgModule, args: [{
                    // TODO(alxhub): switch back to HTTP_PROVIDERS when the metadata collector can inline it
                    providers: [
                        // TODO(pascal): use factory type annotations once supported in DI
                        // issue: https://github.com/angular/angular/issues/3183
                        { provide: http_1.Http, useFactory: httpFactory, deps: [xhr_backend_1.XHRBackend, base_request_options_1.RequestOptions] },
                        browser_xhr_1.BrowserXhr,
                        { provide: base_request_options_1.RequestOptions, useClass: base_request_options_1.BaseRequestOptions },
                        { provide: base_response_options_1.ResponseOptions, useClass: base_response_options_1.BaseResponseOptions },
                        xhr_backend_1.XHRBackend,
                        { provide: interfaces_1.XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy },
                    ],
                },] },
    ];
    return HttpModule;
}());
exports.HttpModule = HttpModule;
var JsonpModule = (function () {
    function JsonpModule() {
    }
    /** @nocollapse */
    JsonpModule.decorators = [
        { type: core_1.NgModule, args: [{
                    // TODO(alxhub): switch back to JSONP_PROVIDERS when the metadata collector can inline it
                    providers: [
                        // TODO(pascal): use factory type annotations once supported in DI
                        // issue: https://github.com/angular/angular/issues/3183
                        { provide: http_1.Jsonp, useFactory: jsonpFactory, deps: [jsonp_backend_1.JSONPBackend, base_request_options_1.RequestOptions] },
                        browser_jsonp_1.BrowserJsonp,
                        { provide: base_request_options_1.RequestOptions, useClass: base_request_options_1.BaseRequestOptions },
                        { provide: base_response_options_1.ResponseOptions, useClass: base_response_options_1.BaseResponseOptions },
                        { provide: jsonp_backend_1.JSONPBackend, useClass: jsonp_backend_1.JSONPBackend_ },
                    ],
                },] },
    ];
    return JsonpModule;
}());
exports.JsonpModule = JsonpModule;
//# sourceMappingURL=http.js.map
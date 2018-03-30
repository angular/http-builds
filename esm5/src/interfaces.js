/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {\@link Request}.
 *
 * @deprecated use \@angular/common/http instead
 * @abstract
 */
var /**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {\@link Request}.
 *
 * @deprecated use \@angular/common/http instead
 * @abstract
 */
ConnectionBackend = /** @class */ (function () {
    function ConnectionBackend() {
    }
    return ConnectionBackend;
}());
/**
 * Abstract class from which real backends are derived.
 *
 * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
 * {\@link Request}.
 *
 * @deprecated use \@angular/common/http instead
 * @abstract
 */
export { ConnectionBackend };
function ConnectionBackend_tsickle_Closure_declarations() {
    /**
     * @abstract
     * @param {?} request
     * @return {?}
     */
    ConnectionBackend.prototype.createConnection = function (request) { };
}
/**
 * Abstract class from which real connections are derived.
 *
 * @deprecated use \@angular/common/http instead
 * @abstract
 */
var /**
 * Abstract class from which real connections are derived.
 *
 * @deprecated use \@angular/common/http instead
 * @abstract
 */
Connection = /** @class */ (function () {
    function Connection() {
    }
    return Connection;
}());
/**
 * Abstract class from which real connections are derived.
 *
 * @deprecated use \@angular/common/http instead
 * @abstract
 */
export { Connection };
function Connection_tsickle_Closure_declarations() {
    /** @type {?} */
    Connection.prototype.readyState;
    /** @type {?} */
    Connection.prototype.request;
    /** @type {?} */
    Connection.prototype.response;
}
/**
 * An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request.
 *
 * @deprecated use \@angular/common/http instead
 * @abstract
 */
var /**
 * An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request.
 *
 * @deprecated use \@angular/common/http instead
 * @abstract
 */
XSRFStrategy = /** @class */ (function () {
    function XSRFStrategy() {
    }
    return XSRFStrategy;
}());
/**
 * An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request.
 *
 * @deprecated use \@angular/common/http instead
 * @abstract
 */
export { XSRFStrategy };
function XSRFStrategy_tsickle_Closure_declarations() {
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    XSRFStrategy.prototype.configureRequest = function (req) { };
}
/**
 * Interface for options to construct a RequestOptions, based on
 * [RequestInit](https://fetch.spec.whatwg.org/#requestinit) from the Fetch spec.
 *
 * @deprecated use \@angular/common/http instead
 * @record
 */
export function RequestOptionsArgs() { }
function RequestOptionsArgs_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    RequestOptionsArgs.prototype.url;
    /** @type {?|undefined} */
    RequestOptionsArgs.prototype.method;
    /**
     * @deprecated from 4.0.0. Use params instead.
     * @type {?|undefined}
     */
    RequestOptionsArgs.prototype.search;
    /** @type {?|undefined} */
    RequestOptionsArgs.prototype.params;
    /** @type {?|undefined} */
    RequestOptionsArgs.prototype.headers;
    /** @type {?|undefined} */
    RequestOptionsArgs.prototype.body;
    /** @type {?|undefined} */
    RequestOptionsArgs.prototype.withCredentials;
    /** @type {?|undefined} */
    RequestOptionsArgs.prototype.responseType;
}
/**
 * Required structure when constructing new Request();
 * @record
 */
export function RequestArgs() { }
function RequestArgs_tsickle_Closure_declarations() {
    /** @type {?} */
    RequestArgs.prototype.url;
}
/**
 * Interface for options to construct a Response, based on
 * [ResponseInit](https://fetch.spec.whatwg.org/#responseinit) from the Fetch spec.
 *
 * @deprecated use \@angular/common/http instead
 * @record
 */
export function ResponseOptionsArgs() { }
function ResponseOptionsArgs_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ResponseOptionsArgs.prototype.body;
    /** @type {?|undefined} */
    ResponseOptionsArgs.prototype.status;
    /** @type {?|undefined} */
    ResponseOptionsArgs.prototype.statusText;
    /** @type {?|undefined} */
    ResponseOptionsArgs.prototype.headers;
    /** @type {?|undefined} */
    ResponseOptionsArgs.prototype.type;
    /** @type {?|undefined} */
    ResponseOptionsArgs.prototype.url;
}
//# sourceMappingURL=interfaces.js.map
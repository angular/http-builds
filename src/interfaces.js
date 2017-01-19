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
 * \@experimental
 * @abstract
 */
export class ConnectionBackend {
    /**
     * @abstract
     * @param {?} request
     * @return {?}
     */
    createConnection(request) { }
}
/**
 * Abstract class from which real connections are derived.
 *
 * \@experimental
 * @abstract
 */
export class Connection {
}
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
 * \@experimental
 * @abstract
 */
export class XSRFStrategy {
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    configureRequest(req) { }
}
//# sourceMappingURL=interfaces.js.map
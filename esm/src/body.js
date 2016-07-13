/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Json, isString } from '../src/facade/lang';
import { isJsObject, stringToArrayBuffer } from './http_utils';
import { URLSearchParams } from './url_search_params';
/**
 * HTTP request body used by both {@link Request} and {@link Response}
 * https://fetch.spec.whatwg.org/#body
 */
export class Body {
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
    json() {
        if (isString(this._body)) {
            return Json.parse(this._body);
        }
        if (this._body instanceof ArrayBuffer) {
            return Json.parse(this.text());
        }
        return this._body;
    }
    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     */
    text() {
        if (this._body instanceof URLSearchParams) {
            return this._body.toString();
        }
        if (this._body instanceof ArrayBuffer) {
            return String.fromCharCode.apply(null, new Uint16Array(this._body));
        }
        if (isJsObject(this._body)) {
            return Json.stringify(this._body);
        }
        return this._body.toString();
    }
    /**
     * Return the body as an ArrayBuffer
     */
    arrayBuffer() {
        if (this._body instanceof ArrayBuffer) {
            return this._body;
        }
        return stringToArrayBuffer(this.text());
    }
    /**
      * Returns the request's body as a Blob, assuming that body exists.
      */
    blob() {
        if (this._body instanceof Blob) {
            return this._body;
        }
        if (this._body instanceof ArrayBuffer) {
            return new Blob([this._body]);
        }
        throw new Error('The request body isn\'t either a blob or an array buffer');
    }
}
//# sourceMappingURL=body.js.map
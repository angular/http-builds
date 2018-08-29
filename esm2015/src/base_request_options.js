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
import { Injectable } from '@angular/core';
import { RequestMethod } from './enums';
import { Headers } from './headers';
import { normalizeMethodName } from './http_utils';
import { URLSearchParams } from './url_search_params';
/**
 * Creates a request options object to be optionally provided when instantiating a
 * {\@link Request}.
 *
 * This class is based on the `RequestInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit).
 *
 * All values are null by default. Typical defaults can be found in the {\@link BaseRequestOptions}
 * class, which sub-classes `RequestOptions`.
 *
 * ```typescript
 * import {RequestOptions, Request, RequestMethod} from '\@angular/http';
 *
 * const options = new RequestOptions({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * });
 * const req = new Request(options);
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // https://google.com
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
export class RequestOptions {
    /**
     * @deprecated from 4.0.0. Use params instead.
     * @return {?}
     */
    get search() { return this.params; }
    /**
     * @deprecated from 4.0.0. Use params instead.
     * @param {?} params
     * @return {?}
     */
    set search(params) { this.params = params; }
    /**
     * @param {?=} opts
     */
    constructor(opts = {}) {
        const { method, headers, body, url, search, params, withCredentials, responseType } = opts;
        this.method = method != null ? normalizeMethodName(method) : null;
        this.headers = headers != null ? headers : null;
        this.body = body != null ? body : null;
        this.url = url != null ? url : null;
        this.params = this._mergeSearchParams(params || search);
        this.withCredentials = withCredentials != null ? withCredentials : null;
        this.responseType = responseType != null ? responseType : null;
    }
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * Note that `headers` and `search` will override existing values completely if present in
     * the `options` object. If these values should be merged, it should be done prior to calling
     * `merge` on the `RequestOptions` instance.
     *
     * ```typescript
     * import {RequestOptions, Request, RequestMethod} from '\@angular/http';
     *
     * const options = new RequestOptions({
     *   method: RequestMethod.Post
     * });
     * const req = new Request(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('req.method:', RequestMethod[req.method]); // Post
     * console.log('options.url:', options.url); // null
     * console.log('req.url:', req.url); // https://google.com
     * ```
     * @param {?=} options
     * @return {?}
     */
    merge(options) {
        return new RequestOptions({
            method: options && options.method != null ? options.method : this.method,
            headers: options && options.headers != null ? options.headers : new Headers(this.headers),
            body: options && options.body != null ? options.body : this.body,
            url: options && options.url != null ? options.url : this.url,
            params: options && this._mergeSearchParams(options.params || options.search),
            withCredentials: options && options.withCredentials != null ? options.withCredentials :
                this.withCredentials,
            responseType: options && options.responseType != null ? options.responseType :
                this.responseType
        });
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    _mergeSearchParams(params) {
        if (!params)
            return this.params;
        if (params instanceof URLSearchParams) {
            return params.clone();
        }
        if (typeof params === 'string') {
            return new URLSearchParams(params);
        }
        return this._parseParams(params);
    }
    /**
     * @param {?=} objParams
     * @return {?}
     */
    _parseParams(objParams = {}) {
        /** @type {?} */
        const params = new URLSearchParams();
        Object.keys(objParams).forEach((key) => {
            /** @type {?} */
            const value = objParams[key];
            if (Array.isArray(value)) {
                value.forEach((item) => this._appendParam(key, item, params));
            }
            else {
                this._appendParam(key, value, params);
            }
        });
        return params;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} params
     * @return {?}
     */
    _appendParam(key, value, params) {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        params.append(key, value);
    }
}
if (false) {
    /**
     * Http method with which to execute a {\@link Request}.
     * Acceptable methods are defined in the {\@link RequestMethod} enum.
     * @type {?}
     */
    RequestOptions.prototype.method;
    /**
     * {\@link Headers} to be attached to a {\@link Request}.
     * @type {?}
     */
    RequestOptions.prototype.headers;
    /**
     * Body to be used when creating a {\@link Request}.
     * @type {?}
     */
    RequestOptions.prototype.body;
    /**
     * Url with which to perform a {\@link Request}.
     * @type {?}
     */
    RequestOptions.prototype.url;
    /**
     * Search parameters to be included in a {\@link Request}.
     * @type {?}
     */
    RequestOptions.prototype.params;
    /**
     * Enable use credentials for a {\@link Request}.
     * @type {?}
     */
    RequestOptions.prototype.withCredentials;
    /** @type {?} */
    RequestOptions.prototype.responseType;
}
/**
 * Subclass of {\@link RequestOptions}, with default values.
 *
 * Default values:
 *  * method: {\@link RequestMethod RequestMethod.Get}
 *  * headers: empty {\@link Headers} object
 *
 * This class could be extended and bound to the {\@link RequestOptions} class
 * when configuring an {\@link Injector}, in order to override the default options
 * used by {\@link Http} to create and send {\@link Request Requests}.
 *
 * ```typescript
 * import {BaseRequestOptions, RequestOptions} from '\@angular/http';
 *
 * class MyOptions extends BaseRequestOptions {
 *   search: string = 'coreTeam=true';
 * }
 *
 * {provide: RequestOptions, useClass: MyOptions};
 * ```
 *
 * The options could also be extended when manually creating a {\@link Request}
 * object.
 *
 * ```
 * import {BaseRequestOptions, Request, RequestMethod} from '\@angular/http';
 *
 * const options = new BaseRequestOptions();
 * const req = new Request(options.merge({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * }));
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // null
 * console.log('req.url:', req.url); // https://google.com
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
export class BaseRequestOptions extends RequestOptions {
    constructor() { super({ method: RequestMethod.Get, headers: new Headers() }); }
}
BaseRequestOptions.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BaseRequestOptions.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9yZXF1ZXN0X29wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9iYXNlX3JlcXVlc3Rfb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLGFBQWEsRUFBc0IsTUFBTSxTQUFTLENBQUM7QUFDM0QsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFakQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJwRCxNQUFNLE9BQU8sY0FBYzs7Ozs7SUF5QnpCLElBQUksTUFBTSxLQUFzQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTs7Ozs7O0lBSXJELElBQUksTUFBTSxDQUFDLE1BQXVCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRTs7OztJQVc3RCxZQUFZLE9BQTJCLEVBQUU7UUFDdkMsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUMsR0FBRyxJQUFJLENBQUM7UUFDekYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUks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LENBQUMsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNwRTtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDdkM7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQzs7Ozs7Ozs7SUFHUixZQUFZLENBQUMsR0FBVyxFQUFFLEtBQVUsRUFBRSxNQUF1QjtRQUNuRSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDOztDQUU3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMENELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxjQUFjO0lBQ3BELGdCQUFnQixLQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxPQUFPLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBRTs7O1lBRjlFLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7UmVxdWVzdE1ldGhvZCwgUmVzcG9uc2VDb250ZW50VHlwZX0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5pbXBvcnQge25vcm1hbGl6ZU1ldGhvZE5hbWV9IGZyb20gJy4vaHR0cF91dGlscyc7XG5pbXBvcnQge1JlcXVlc3RPcHRpb25zQXJnc30gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7VVJMU2VhcmNoUGFyYW1zfSBmcm9tICcuL3VybF9zZWFyY2hfcGFyYW1zJztcblxuXG4vKipcbiAqIENyZWF0ZXMgYSByZXF1ZXN0IG9wdGlvbnMgb2JqZWN0IHRvIGJlIG9wdGlvbmFsbHkgcHJvdmlkZWQgd2hlbiBpbnN0YW50aWF0aW5nIGFcbiAqIHtAbGluayBSZXF1ZXN0fS5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIGJhc2VkIG9uIHRoZSBgUmVxdWVzdEluaXRgIGRlc2NyaXB0aW9uIGluIHRoZSBbRmV0Y2hcbiAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXF1ZXN0aW5pdCkuXG4gKlxuICogQWxsIHZhbHVlcyBhcmUgbnVsbCBieSBkZWZhdWx0LiBUeXBpY2FsIGRlZmF1bHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUge0BsaW5rIEJhc2VSZXF1ZXN0T3B0aW9uc31cbiAqIGNsYXNzLCB3aGljaCBzdWItY2xhc3NlcyBgUmVxdWVzdE9wdGlvbnNgLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7UmVxdWVzdE9wdGlvbnMsIFJlcXVlc3QsIFJlcXVlc3RNZXRob2R9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuICpcbiAqIGNvbnN0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoe1xuICogICBtZXRob2Q6IFJlcXVlc3RNZXRob2QuUG9zdCxcbiAqICAgdXJsOiAnaHR0cHM6Ly9nb29nbGUuY29tJ1xuICogfSk7XG4gKiBjb25zdCByZXEgPSBuZXcgUmVxdWVzdChvcHRpb25zKTtcbiAqIGNvbnNvbGUubG9nKCdyZXEubWV0aG9kOicsIFJlcXVlc3RNZXRob2RbcmVxLm1ldGhvZF0pOyAvLyBQb3N0XG4gKiBjb25zb2xlLmxvZygnb3B0aW9ucy51cmw6Jywgb3B0aW9ucy51cmwpOyAvLyBodHRwczovL2dvb2dsZS5jb21cbiAqIGBgYFxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5leHBvcnQgY2xhc3MgUmVxdWVzdE9wdGlvbnMge1xuICAvKipcbiAgICogSHR0cCBtZXRob2Qgd2l0aCB3aGljaCB0byBleGVjdXRlIGEge0BsaW5rIFJlcXVlc3R9LlxuICAgKiBBY2NlcHRhYmxlIG1ldGhvZHMgYXJlIGRlZmluZWQgaW4gdGhlIHtAbGluayBSZXF1ZXN0TWV0aG9kfSBlbnVtLlxuICAgKi9cbiAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kfHN0cmluZ3xudWxsO1xuICAvKipcbiAgICoge0BsaW5rIEhlYWRlcnN9IHRvIGJlIGF0dGFjaGVkIHRvIGEge0BsaW5rIFJlcXVlc3R9LlxuICAgKi9cbiAgaGVhZGVyczogSGVhZGVyc3xudWxsO1xuICAvKipcbiAgICogQm9keSB0byBiZSB1c2VkIHdoZW4gY3JlYXRpbmcgYSB7QGxpbmsgUmVxdWVzdH0uXG4gICAqL1xuICBib2R5OiBhbnk7XG4gIC8qKlxuICAgKiBVcmwgd2l0aCB3aGljaCB0byBwZXJmb3JtIGEge0BsaW5rIFJlcXVlc3R9LlxuICAgKi9cbiAgdXJsOiBzdHJpbmd8bnVsbDtcbiAgLyoqXG4gICAqIFNlYXJjaCBwYXJhbWV0ZXJzIHRvIGJlIGluY2x1ZGVkIGluIGEge0BsaW5rIFJlcXVlc3R9LlxuICAgKi9cbiAgcGFyYW1zOiBVUkxTZWFyY2hQYXJhbXM7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBmcm9tIDQuMC4wLiBVc2UgcGFyYW1zIGluc3RlYWQuXG4gICAqL1xuICBnZXQgc2VhcmNoKCk6IFVSTFNlYXJjaFBhcmFtcyB7IHJldHVybiB0aGlzLnBhcmFtczsgfVxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgZnJvbSA0LjAuMC4gVXNlIHBhcmFtcyBpbnN0ZWFkLlxuICAgKi9cbiAgc2V0IHNlYXJjaChwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykgeyB0aGlzLnBhcmFtcyA9IHBhcmFtczsgfVxuICAvKipcbiAgICogRW5hYmxlIHVzZSBjcmVkZW50aWFscyBmb3IgYSB7QGxpbmsgUmVxdWVzdH0uXG4gICAqL1xuICB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW58bnVsbDtcbiAgLypcbiAgICogU2VsZWN0IGEgYnVmZmVyIHRvIHN0b3JlIHRoZSByZXNwb25zZSwgc3VjaCBhcyBBcnJheUJ1ZmZlciwgQmxvYiwgSnNvbiAob3IgRG9jdW1lbnQpXG4gICAqL1xuICByZXNwb25zZVR5cGU6IFJlc3BvbnNlQ29udGVudFR5cGV8bnVsbDtcblxuICAvLyBUT0RPKER6bWl0cnkpOiByZW1vdmUgc2VhcmNoIHdoZW4gdGhpcy5zZWFyY2ggaXMgcmVtb3ZlZFxuICBjb25zdHJ1Y3RvcihvcHRzOiBSZXF1ZXN0T3B0aW9uc0FyZ3MgPSB7fSkge1xuICAgIGNvbnN0IHttZXRob2QsIGhlYWRlcnMsIGJvZHksIHVybCwgc2VhcmNoLCBwYXJhbXMsIHdpdGhDcmVkZW50aWFscywgcmVzcG9uc2VUeXBlfSA9IG9wdHM7XG4gICAgdGhpcy5tZXRob2QgPSBtZXRob2QgIT0gbnVsbCA/IG5vcm1hbGl6ZU1ldGhvZE5hbWUobWV0aG9kKSA6IG51bGw7XG4gICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycyAhPSBudWxsID8gaGVhZGVycyA6IG51bGw7XG4gICAgdGhpcy5ib2R5ID0gYm9keSAhPSBudWxsID8gYm9keSA6IG51bGw7XG4gICAgdGhpcy51cmwgPSB1cmwgIT0gbnVsbCA/IHVybCA6IG51bGw7XG4gICAgdGhpcy5wYXJhbXMgPSB0aGlzLl9tZXJnZVNlYXJjaFBhcmFtcyhwYXJhbXMgfHwgc2VhcmNoKTtcbiAgICB0aGlzLndpdGhDcmVkZW50aWFscyA9IHdpdGhDcmVkZW50aWFscyAhPSBudWxsID8gd2l0aENyZWRlbnRpYWxzIDogbnVsbDtcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZSAhPSBudWxsID8gcmVzcG9uc2VUeXBlIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGUgYFJlcXVlc3RPcHRpb25zYCBpbnN0YW5jZSwgdXNpbmcgdGhlIG9wdGlvbmFsIGlucHV0IGFzIHZhbHVlcyB0byBvdmVycmlkZVxuICAgKiBleGlzdGluZyB2YWx1ZXMuIFRoaXMgbWV0aG9kIHdpbGwgbm90IGNoYW5nZSB0aGUgdmFsdWVzIG9mIHRoZSBpbnN0YW5jZSBvbiB3aGljaCBpdCBpcyBiZWluZ1xuICAgKiBjYWxsZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBgaGVhZGVyc2AgYW5kIGBzZWFyY2hgIHdpbGwgb3ZlcnJpZGUgZXhpc3RpbmcgdmFsdWVzIGNvbXBsZXRlbHkgaWYgcHJlc2VudCBpblxuICAgKiB0aGUgYG9wdGlvbnNgIG9iamVjdC4gSWYgdGhlc2UgdmFsdWVzIHNob3VsZCBiZSBtZXJnZWQsIGl0IHNob3VsZCBiZSBkb25lIHByaW9yIHRvIGNhbGxpbmdcbiAgICogYG1lcmdlYCBvbiB0aGUgYFJlcXVlc3RPcHRpb25zYCBpbnN0YW5jZS5cbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBpbXBvcnQge1JlcXVlc3RPcHRpb25zLCBSZXF1ZXN0LCBSZXF1ZXN0TWV0aG9kfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAgICpcbiAgICogY29uc3Qgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7XG4gICAqICAgbWV0aG9kOiBSZXF1ZXN0TWV0aG9kLlBvc3RcbiAgICogfSk7XG4gICAqIGNvbnN0IHJlcSA9IG5ldyBSZXF1ZXN0KG9wdGlvbnMubWVyZ2Uoe1xuICAgKiAgIHVybDogJ2h0dHBzOi8vZ29vZ2xlLmNvbSdcbiAgICogfSkpO1xuICAgKiBjb25zb2xlLmxvZygncmVxLm1ldGhvZDonLCBSZXF1ZXN0TWV0aG9kW3JlcS5tZXRob2RdKTsgLy8gUG9zdFxuICAgKiBjb25zb2xlLmxvZygnb3B0aW9ucy51cmw6Jywgb3B0aW9ucy51cmwpOyAvLyBudWxsXG4gICAqIGNvbnNvbGUubG9nKCdyZXEudXJsOicsIHJlcS51cmwpOyAvLyBodHRwczovL2dvb2dsZS5jb21cbiAgICogYGBgXG4gICAqL1xuICBtZXJnZShvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogUmVxdWVzdE9wdGlvbnMge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdE9wdGlvbnMoe1xuICAgICAgbWV0aG9kOiBvcHRpb25zICYmIG9wdGlvbnMubWV0aG9kICE9IG51bGwgPyBvcHRpb25zLm1ldGhvZCA6IHRoaXMubWV0aG9kLFxuICAgICAgaGVhZGVyczogb3B0aW9ucyAmJiBvcHRpb25zLmhlYWRlcnMgIT0gbnVsbCA/IG9wdGlvbnMuaGVhZGVycyA6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICBib2R5OiBvcHRpb25zICYmIG9wdGlvbnMuYm9keSAhPSBudWxsID8gb3B0aW9ucy5ib2R5IDogdGhpcy5ib2R5LFxuICAgICAgdXJsOiBvcHRpb25zICYmIG9wdGlvbnMudXJsICE9IG51bGwgPyBvcHRpb25zLnVybCA6IHRoaXMudXJsLFxuICAgICAgcGFyYW1zOiBvcHRpb25zICYmIHRoaXMuX21lcmdlU2VhcmNoUGFyYW1zKG9wdGlvbnMucGFyYW1zIHx8IG9wdGlvbnMuc2VhcmNoKSxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogb3B0aW9ucyAmJiBvcHRpb25zLndpdGhDcmVkZW50aWFscyAhPSBudWxsID8gb3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndpdGhDcmVkZW50aWFscyxcbiAgICAgIHJlc3BvbnNlVHlwZTogb3B0aW9ucyAmJiBvcHRpb25zLnJlc3BvbnNlVHlwZSAhPSBudWxsID8gb3B0aW9ucy5yZXNwb25zZVR5cGUgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlVHlwZVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWVyZ2VTZWFyY2hQYXJhbXMocGFyYW1zPzogc3RyaW5nfFVSTFNlYXJjaFBhcmFtc3x7W2tleTogc3RyaW5nXTogYW55IHwgYW55W119fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsKTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgICBpZiAoIXBhcmFtcykgcmV0dXJuIHRoaXMucGFyYW1zO1xuXG4gICAgaWYgKHBhcmFtcyBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcykge1xuICAgICAgcmV0dXJuIHBhcmFtcy5jbG9uZSgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMocGFyYW1zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcGFyc2VQYXJhbXMocGFyYW1zKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlUGFyYW1zKG9ialBhcmFtczoge1trZXk6IHN0cmluZ106IGFueSB8IGFueVtdfSA9IHt9KTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgT2JqZWN0LmtleXMob2JqUGFyYW1zKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgdmFsdWU6IGFueXxhbnlbXSA9IG9ialBhcmFtc1trZXldO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlLmZvckVhY2goKGl0ZW06IGFueSkgPT4gdGhpcy5fYXBwZW5kUGFyYW0oa2V5LCBpdGVtLCBwYXJhbXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2FwcGVuZFBhcmFtKGtleSwgdmFsdWUsIHBhcmFtcyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIHByaXZhdGUgX2FwcGVuZFBhcmFtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55LCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyk6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9XG4gICAgcGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgfVxufVxuXG4vKipcbiAqIFN1YmNsYXNzIG9mIHtAbGluayBSZXF1ZXN0T3B0aW9uc30sIHdpdGggZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogRGVmYXVsdCB2YWx1ZXM6XG4gKiAgKiBtZXRob2Q6IHtAbGluayBSZXF1ZXN0TWV0aG9kIFJlcXVlc3RNZXRob2QuR2V0fVxuICogICogaGVhZGVyczogZW1wdHkge0BsaW5rIEhlYWRlcnN9IG9iamVjdFxuICpcbiAqIFRoaXMgY2xhc3MgY291bGQgYmUgZXh0ZW5kZWQgYW5kIGJvdW5kIHRvIHRoZSB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9IGNsYXNzXG4gKiB3aGVuIGNvbmZpZ3VyaW5nIGFuIHtAbGluayBJbmplY3Rvcn0sIGluIG9yZGVyIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAqIHVzZWQgYnkge0BsaW5rIEh0dHB9IHRvIGNyZWF0ZSBhbmQgc2VuZCB7QGxpbmsgUmVxdWVzdCBSZXF1ZXN0c30uXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtCYXNlUmVxdWVzdE9wdGlvbnMsIFJlcXVlc3RPcHRpb25zfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqXG4gKiBjbGFzcyBNeU9wdGlvbnMgZXh0ZW5kcyBCYXNlUmVxdWVzdE9wdGlvbnMge1xuICogICBzZWFyY2g6IHN0cmluZyA9ICdjb3JlVGVhbT10cnVlJztcbiAqIH1cbiAqXG4gKiB7cHJvdmlkZTogUmVxdWVzdE9wdGlvbnMsIHVzZUNsYXNzOiBNeU9wdGlvbnN9O1xuICogYGBgXG4gKlxuICogVGhlIG9wdGlvbnMgY291bGQgYWxzbyBiZSBleHRlbmRlZCB3aGVuIG1hbnVhbGx5IGNyZWF0aW5nIGEge0BsaW5rIFJlcXVlc3R9XG4gKiBvYmplY3QuXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdCwgUmVxdWVzdE1ldGhvZH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKlxuICogY29uc3Qgb3B0aW9ucyA9IG5ldyBCYXNlUmVxdWVzdE9wdGlvbnMoKTtcbiAqIGNvbnN0IHJlcSA9IG5ldyBSZXF1ZXN0KG9wdGlvbnMubWVyZ2Uoe1xuICogICBtZXRob2Q6IFJlcXVlc3RNZXRob2QuUG9zdCxcbiAqICAgdXJsOiAnaHR0cHM6Ly9nb29nbGUuY29tJ1xuICogfSkpO1xuICogY29uc29sZS5sb2coJ3JlcS5tZXRob2Q6JywgUmVxdWVzdE1ldGhvZFtyZXEubWV0aG9kXSk7IC8vIFBvc3RcbiAqIGNvbnNvbGUubG9nKCdvcHRpb25zLnVybDonLCBvcHRpb25zLnVybCk7IC8vIG51bGxcbiAqIGNvbnNvbGUubG9nKCdyZXEudXJsOicsIHJlcS51cmwpOyAvLyBodHRwczovL2dvb2dsZS5jb21cbiAqIGBgYFxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFzZVJlcXVlc3RPcHRpb25zIGV4dGVuZHMgUmVxdWVzdE9wdGlvbnMge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoe21ldGhvZDogUmVxdWVzdE1ldGhvZC5HZXQsIGhlYWRlcnM6IG5ldyBIZWFkZXJzKCl9KTsgfVxufVxuIl19
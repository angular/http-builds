import * as tslib_1 from "tslib";
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
import * as i0 from "@angular/core";
/**
 * Creates a request options object to be optionally provided when instantiating a
 * {@link Request}.
 *
 * This class is based on the `RequestInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit).
 *
 * All values are null by default. Typical defaults can be found in the {@link BaseRequestOptions}
 * class, which sub-classes `RequestOptions`.
 *
 * ```typescript
 * import {RequestOptions, Request, RequestMethod} from '@angular/http';
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
 * @publicApi
 */
var RequestOptions = /** @class */ (function () {
    // TODO(Dzmitry): remove search when this.search is removed
    function RequestOptions(opts) {
        if (opts === void 0) { opts = {}; }
        var method = opts.method, headers = opts.headers, body = opts.body, url = opts.url, search = opts.search, params = opts.params, withCredentials = opts.withCredentials, responseType = opts.responseType;
        this.method = method != null ? normalizeMethodName(method) : null;
        this.headers = headers != null ? headers : null;
        this.body = body != null ? body : null;
        this.url = url != null ? url : null;
        this.params = this._mergeSearchParams(params || search);
        this.withCredentials = withCredentials != null ? withCredentials : null;
        this.responseType = responseType != null ? responseType : null;
    }
    Object.defineProperty(RequestOptions.prototype, "search", {
        /**
         * @deprecated from 4.0.0. Use params instead.
         */
        get: function () { return this.params; },
        /**
         * @deprecated from 4.0.0. Use params instead.
         */
        set: function (params) { this.params = params; },
        enumerable: true,
        configurable: true
    });
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
     * import {RequestOptions, Request, RequestMethod} from '@angular/http';
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
     */
    RequestOptions.prototype.merge = function (options) {
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
    };
    RequestOptions.prototype._mergeSearchParams = function (params) {
        if (!params)
            return this.params;
        if (params instanceof URLSearchParams) {
            return params.clone();
        }
        if (typeof params === 'string') {
            return new URLSearchParams(params);
        }
        return this._parseParams(params);
    };
    RequestOptions.prototype._parseParams = function (objParams) {
        var _this = this;
        if (objParams === void 0) { objParams = {}; }
        var params = new URLSearchParams();
        Object.keys(objParams).forEach(function (key) {
            var value = objParams[key];
            if (Array.isArray(value)) {
                value.forEach(function (item) { return _this._appendParam(key, item, params); });
            }
            else {
                _this._appendParam(key, value, params);
            }
        });
        return params;
    };
    RequestOptions.prototype._appendParam = function (key, value, params) {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        params.append(key, value);
    };
    return RequestOptions;
}());
export { RequestOptions };
/**
 * Subclass of {@link RequestOptions}, with default values.
 *
 * Default values:
 *  * method: {@link RequestMethod RequestMethod.Get}
 *  * headers: empty {@link Headers} object
 *
 * This class could be extended and bound to the {@link RequestOptions} class
 * when configuring an {@link Injector}, in order to override the default options
 * used by {@link Http} to create and send {@link Request Requests}.
 *
 * ```typescript
 * import {BaseRequestOptions, RequestOptions} from '@angular/http';
 *
 * class MyOptions extends BaseRequestOptions {
 *   search: string = 'coreTeam=true';
 * }
 *
 * {provide: RequestOptions, useClass: MyOptions};
 * ```
 *
 * The options could also be extended when manually creating a {@link Request}
 * object.
 *
 * ```
 * import {BaseRequestOptions, Request, RequestMethod} from '@angular/http';
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
 * @publicApi
 */
var BaseRequestOptions = /** @class */ (function (_super) {
    tslib_1.__extends(BaseRequestOptions, _super);
    function BaseRequestOptions() {
        return _super.call(this, { method: RequestMethod.Get, headers: new Headers() }) || this;
    }
    BaseRequestOptions.ngInjectableDef = i0.defineInjectable({ token: BaseRequestOptions, factory: function BaseRequestOptions_Factory(t) { return new (t || BaseRequestOptions)(); }, providedIn: null });
    return BaseRequestOptions;
}(RequestOptions));
export { BaseRequestOptions };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9yZXF1ZXN0X29wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9iYXNlX3JlcXVlc3Rfb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsYUFBYSxFQUFzQixNQUFNLFNBQVMsQ0FBQztBQUMzRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7O0FBR3BEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSDtJQXVDRSwyREFBMkQ7SUFDM0Qsd0JBQVksSUFBNkI7UUFBN0IscUJBQUEsRUFBQSxTQUE2QjtRQUNoQyxJQUFBLG9CQUFNLEVBQUUsc0JBQU8sRUFBRSxnQkFBSSxFQUFFLGNBQUcsRUFBRSxvQkFBTSxFQUFFLG9CQUFNLEVBQUUsc0NBQWUsRUFBRSxnQ0FBWSxDQUFTO1FBQ3pGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNsRSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksSUFB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LEdBQVc7WUFDekMsSUFBTSxLQUFLLEdBQWMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDeEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO2FBQ3BFO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQzthQUN2QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVPLHFDQUFZLEdBQXBCLFVBQXFCLEdBQVcsRUFBRSxLQUFVLEVBQUUsTUFBdUI7UUFDbkUsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBMUhELElBMEhDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFDSDtJQUN3Qyw4Q0FBYztJQUNwRDtlQUFnQixrQkFBTSxFQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLE9BQU8sRUFBRSxFQUFDLENBQUM7SUFBRSxDQUFDO3NFQURsRSxrQkFBa0IscUVBQWxCLGtCQUFrQjs2QkEvTS9CO0NBaU5DLEFBSEQsQ0FDd0MsY0FBYyxHQUVyRDtTQUZZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtSZXF1ZXN0TWV0aG9kLCBSZXNwb25zZUNvbnRlbnRUeXBlfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7SGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzJztcbmltcG9ydCB7bm9ybWFsaXplTWV0aG9kTmFtZX0gZnJvbSAnLi9odHRwX3V0aWxzJztcbmltcG9ydCB7UmVxdWVzdE9wdGlvbnNBcmdzfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtVUkxTZWFyY2hQYXJhbXN9IGZyb20gJy4vdXJsX3NlYXJjaF9wYXJhbXMnO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIHJlcXVlc3Qgb3B0aW9ucyBvYmplY3QgdG8gYmUgb3B0aW9uYWxseSBwcm92aWRlZCB3aGVuIGluc3RhbnRpYXRpbmcgYVxuICoge0BsaW5rIFJlcXVlc3R9LlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgYmFzZWQgb24gdGhlIGBSZXF1ZXN0SW5pdGAgZGVzY3JpcHRpb24gaW4gdGhlIFtGZXRjaFxuICogU3BlY10oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI3JlcXVlc3Rpbml0KS5cbiAqXG4gKiBBbGwgdmFsdWVzIGFyZSBudWxsIGJ5IGRlZmF1bHQuIFR5cGljYWwgZGVmYXVsdHMgY2FuIGJlIGZvdW5kIGluIHRoZSB7QGxpbmsgQmFzZVJlcXVlc3RPcHRpb25zfVxuICogY2xhc3MsIHdoaWNoIHN1Yi1jbGFzc2VzIGBSZXF1ZXN0T3B0aW9uc2AuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdCwgUmVxdWVzdE1ldGhvZH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKlxuICogY29uc3Qgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7XG4gKiAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5Qb3N0LFxuICogICB1cmw6ICdodHRwczovL2dvb2dsZS5jb20nXG4gKiB9KTtcbiAqIGNvbnN0IHJlcSA9IG5ldyBSZXF1ZXN0KG9wdGlvbnMpO1xuICogY29uc29sZS5sb2coJ3JlcS5tZXRob2Q6JywgUmVxdWVzdE1ldGhvZFtyZXEubWV0aG9kXSk7IC8vIFBvc3RcbiAqIGNvbnNvbGUubG9nKCdvcHRpb25zLnVybDonLCBvcHRpb25zLnVybCk7IC8vIGh0dHBzOi8vZ29vZ2xlLmNvbVxuICogYGBgXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBIdHRwIG1ldGhvZCB3aXRoIHdoaWNoIHRvIGV4ZWN1dGUgYSB7QGxpbmsgUmVxdWVzdH0uXG4gICAqIEFjY2VwdGFibGUgbWV0aG9kcyBhcmUgZGVmaW5lZCBpbiB0aGUge0BsaW5rIFJlcXVlc3RNZXRob2R9IGVudW0uXG4gICAqL1xuICBtZXRob2Q6IFJlcXVlc3RNZXRob2R8c3RyaW5nfG51bGw7XG4gIC8qKlxuICAgKiB7QGxpbmsgSGVhZGVyc30gdG8gYmUgYXR0YWNoZWQgdG8gYSB7QGxpbmsgUmVxdWVzdH0uXG4gICAqL1xuICBoZWFkZXJzOiBIZWFkZXJzfG51bGw7XG4gIC8qKlxuICAgKiBCb2R5IHRvIGJlIHVzZWQgd2hlbiBjcmVhdGluZyBhIHtAbGluayBSZXF1ZXN0fS5cbiAgICovXG4gIGJvZHk6IGFueTtcbiAgLyoqXG4gICAqIFVybCB3aXRoIHdoaWNoIHRvIHBlcmZvcm0gYSB7QGxpbmsgUmVxdWVzdH0uXG4gICAqL1xuICB1cmw6IHN0cmluZ3xudWxsO1xuICAvKipcbiAgICogU2VhcmNoIHBhcmFtZXRlcnMgdG8gYmUgaW5jbHVkZWQgaW4gYSB7QGxpbmsgUmVxdWVzdH0uXG4gICAqL1xuICBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcztcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIGZyb20gNC4wLjAuIFVzZSBwYXJhbXMgaW5zdGVhZC5cbiAgICovXG4gIGdldCBzZWFyY2goKTogVVJMU2VhcmNoUGFyYW1zIHsgcmV0dXJuIHRoaXMucGFyYW1zOyB9XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBmcm9tIDQuMC4wLiBVc2UgcGFyYW1zIGluc3RlYWQuXG4gICAqL1xuICBzZXQgc2VhcmNoKHBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSB7IHRoaXMucGFyYW1zID0gcGFyYW1zOyB9XG4gIC8qKlxuICAgKiBFbmFibGUgdXNlIGNyZWRlbnRpYWxzIGZvciBhIHtAbGluayBSZXF1ZXN0fS5cbiAgICovXG4gIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbnxudWxsO1xuICAvKlxuICAgKiBTZWxlY3QgYSBidWZmZXIgdG8gc3RvcmUgdGhlIHJlc3BvbnNlLCBzdWNoIGFzIEFycmF5QnVmZmVyLCBCbG9iLCBKc29uIChvciBEb2N1bWVudClcbiAgICovXG4gIHJlc3BvbnNlVHlwZTogUmVzcG9uc2VDb250ZW50VHlwZXxudWxsO1xuXG4gIC8vIFRPRE8oRHptaXRyeSk6IHJlbW92ZSBzZWFyY2ggd2hlbiB0aGlzLnNlYXJjaCBpcyByZW1vdmVkXG4gIGNvbnN0cnVjdG9yKG9wdHM6IFJlcXVlc3RPcHRpb25zQXJncyA9IHt9KSB7XG4gICAgY29uc3Qge21ldGhvZCwgaGVhZGVycywgYm9keSwgdXJsLCBzZWFyY2gsIHBhcmFtcywgd2l0aENyZWRlbnRpYWxzLCByZXNwb25zZVR5cGV9ID0gb3B0cztcbiAgICB0aGlzLm1ldGhvZCA9IG1ldGhvZCAhPSBudWxsID8gbm9ybWFsaXplTWV0aG9kTmFtZShtZXRob2QpIDogbnVsbDtcbiAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzICE9IG51bGwgPyBoZWFkZXJzIDogbnVsbDtcbiAgICB0aGlzLmJvZHkgPSBib2R5ICE9IG51bGwgPyBib2R5IDogbnVsbDtcbiAgICB0aGlzLnVybCA9IHVybCAhPSBudWxsID8gdXJsIDogbnVsbDtcbiAgICB0aGlzLnBhcmFtcyA9IHRoaXMuX21lcmdlU2VhcmNoUGFyYW1zKHBhcmFtcyB8fCBzZWFyY2gpO1xuICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gd2l0aENyZWRlbnRpYWxzICE9IG51bGwgPyB3aXRoQ3JlZGVudGlhbHMgOiBudWxsO1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlICE9IG51bGwgPyByZXNwb25zZVR5cGUgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoZSBgUmVxdWVzdE9wdGlvbnNgIGluc3RhbmNlLCB1c2luZyB0aGUgb3B0aW9uYWwgaW5wdXQgYXMgdmFsdWVzIHRvIG92ZXJyaWRlXG4gICAqIGV4aXN0aW5nIHZhbHVlcy4gVGhpcyBtZXRob2Qgd2lsbCBub3QgY2hhbmdlIHRoZSB2YWx1ZXMgb2YgdGhlIGluc3RhbmNlIG9uIHdoaWNoIGl0IGlzIGJlaW5nXG4gICAqIGNhbGxlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IGBoZWFkZXJzYCBhbmQgYHNlYXJjaGAgd2lsbCBvdmVycmlkZSBleGlzdGluZyB2YWx1ZXMgY29tcGxldGVseSBpZiBwcmVzZW50IGluXG4gICAqIHRoZSBgb3B0aW9uc2Agb2JqZWN0LiBJZiB0aGVzZSB2YWx1ZXMgc2hvdWxkIGJlIG1lcmdlZCwgaXQgc2hvdWxkIGJlIGRvbmUgcHJpb3IgdG8gY2FsbGluZ1xuICAgKiBgbWVyZ2VgIG9uIHRoZSBgUmVxdWVzdE9wdGlvbnNgIGluc3RhbmNlLlxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGltcG9ydCB7UmVxdWVzdE9wdGlvbnMsIFJlcXVlc3QsIFJlcXVlc3RNZXRob2R9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuICAgKlxuICAgKiBjb25zdCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHtcbiAgICogICBtZXRob2Q6IFJlcXVlc3RNZXRob2QuUG9zdFxuICAgKiB9KTtcbiAgICogY29uc3QgcmVxID0gbmV3IFJlcXVlc3Qob3B0aW9ucy5tZXJnZSh7XG4gICAqICAgdXJsOiAnaHR0cHM6Ly9nb29nbGUuY29tJ1xuICAgKiB9KSk7XG4gICAqIGNvbnNvbGUubG9nKCdyZXEubWV0aG9kOicsIFJlcXVlc3RNZXRob2RbcmVxLm1ldGhvZF0pOyAvLyBQb3N0XG4gICAqIGNvbnNvbGUubG9nKCdvcHRpb25zLnVybDonLCBvcHRpb25zLnVybCk7IC8vIG51bGxcbiAgICogY29uc29sZS5sb2coJ3JlcS51cmw6JywgcmVxLnVybCk7IC8vIGh0dHBzOi8vZ29vZ2xlLmNvbVxuICAgKiBgYGBcbiAgICovXG4gIG1lcmdlKG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBSZXF1ZXN0T3B0aW9ucyB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0T3B0aW9ucyh7XG4gICAgICBtZXRob2Q6IG9wdGlvbnMgJiYgb3B0aW9ucy5tZXRob2QgIT0gbnVsbCA/IG9wdGlvbnMubWV0aG9kIDogdGhpcy5tZXRob2QsXG4gICAgICBoZWFkZXJzOiBvcHRpb25zICYmIG9wdGlvbnMuaGVhZGVycyAhPSBudWxsID8gb3B0aW9ucy5oZWFkZXJzIDogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIGJvZHk6IG9wdGlvbnMgJiYgb3B0aW9ucy5ib2R5ICE9IG51bGwgPyBvcHRpb25zLmJvZHkgOiB0aGlzLmJvZHksXG4gICAgICB1cmw6IG9wdGlvbnMgJiYgb3B0aW9ucy51cmwgIT0gbnVsbCA/IG9wdGlvbnMudXJsIDogdGhpcy51cmwsXG4gICAgICBwYXJhbXM6IG9wdGlvbnMgJiYgdGhpcy5fbWVyZ2VTZWFyY2hQYXJhbXMob3B0aW9ucy5wYXJhbXMgfHwgb3B0aW9ucy5zZWFyY2gpLFxuICAgICAgd2l0aENyZWRlbnRpYWxzOiBvcHRpb25zICYmIG9wdGlvbnMud2l0aENyZWRlbnRpYWxzICE9IG51bGwgPyBvcHRpb25zLndpdGhDcmVkZW50aWFscyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzLFxuICAgICAgcmVzcG9uc2VUeXBlOiBvcHRpb25zICYmIG9wdGlvbnMucmVzcG9uc2VUeXBlICE9IG51bGwgPyBvcHRpb25zLnJlc3BvbnNlVHlwZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2VUeXBlXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9tZXJnZVNlYXJjaFBhcmFtcyhwYXJhbXM/OiBzdHJpbmd8VVJMU2VhcmNoUGFyYW1zfHtba2V5OiBzdHJpbmddOiBhbnkgfCBhbnlbXX18XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwpOiBVUkxTZWFyY2hQYXJhbXMge1xuICAgIGlmICghcGFyYW1zKSByZXR1cm4gdGhpcy5wYXJhbXM7XG5cbiAgICBpZiAocGFyYW1zIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgICByZXR1cm4gcGFyYW1zLmNsb25lKCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyhwYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9wYXJzZVBhcmFtcyhwYXJhbXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGFyc2VQYXJhbXMob2JqUGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55IHwgYW55W119ID0ge30pOiBVUkxTZWFyY2hQYXJhbXMge1xuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBPYmplY3Qua2V5cyhvYmpQYXJhbXMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZTogYW55fGFueVtdID0gb2JqUGFyYW1zW2tleV07XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB0aGlzLl9hcHBlbmRQYXJhbShrZXksIGl0ZW0sIHBhcmFtcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYXBwZW5kUGFyYW0oa2V5LCB2YWx1ZSwgcGFyYW1zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXBwZW5kUGFyYW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnksIHBhcmFtczogVVJMU2VhcmNoUGFyYW1zKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIH1cbiAgICBwYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICB9XG59XG5cbi8qKlxuICogU3ViY2xhc3Mgb2Yge0BsaW5rIFJlcXVlc3RPcHRpb25zfSwgd2l0aCBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBEZWZhdWx0IHZhbHVlczpcbiAqICAqIG1ldGhvZDoge0BsaW5rIFJlcXVlc3RNZXRob2QgUmVxdWVzdE1ldGhvZC5HZXR9XG4gKiAgKiBoZWFkZXJzOiBlbXB0eSB7QGxpbmsgSGVhZGVyc30gb2JqZWN0XG4gKlxuICogVGhpcyBjbGFzcyBjb3VsZCBiZSBleHRlbmRlZCBhbmQgYm91bmQgdG8gdGhlIHtAbGluayBSZXF1ZXN0T3B0aW9uc30gY2xhc3NcbiAqIHdoZW4gY29uZmlndXJpbmcgYW4ge0BsaW5rIEluamVjdG9yfSwgaW4gb3JkZXIgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb3B0aW9uc1xuICogdXNlZCBieSB7QGxpbmsgSHR0cH0gdG8gY3JlYXRlIGFuZCBzZW5kIHtAbGluayBSZXF1ZXN0IFJlcXVlc3RzfS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgUmVxdWVzdE9wdGlvbnN9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuICpcbiAqIGNsYXNzIE15T3B0aW9ucyBleHRlbmRzIEJhc2VSZXF1ZXN0T3B0aW9ucyB7XG4gKiAgIHNlYXJjaDogc3RyaW5nID0gJ2NvcmVUZWFtPXRydWUnO1xuICogfVxuICpcbiAqIHtwcm92aWRlOiBSZXF1ZXN0T3B0aW9ucywgdXNlQ2xhc3M6IE15T3B0aW9uc307XG4gKiBgYGBcbiAqXG4gKiBUaGUgb3B0aW9ucyBjb3VsZCBhbHNvIGJlIGV4dGVuZGVkIHdoZW4gbWFudWFsbHkgY3JlYXRpbmcgYSB7QGxpbmsgUmVxdWVzdH1cbiAqIG9iamVjdC5cbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7QmFzZVJlcXVlc3RPcHRpb25zLCBSZXF1ZXN0LCBSZXF1ZXN0TWV0aG9kfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqXG4gKiBjb25zdCBvcHRpb25zID0gbmV3IEJhc2VSZXF1ZXN0T3B0aW9ucygpO1xuICogY29uc3QgcmVxID0gbmV3IFJlcXVlc3Qob3B0aW9ucy5tZXJnZSh7XG4gKiAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5Qb3N0LFxuICogICB1cmw6ICdodHRwczovL2dvb2dsZS5jb20nXG4gKiB9KSk7XG4gKiBjb25zb2xlLmxvZygncmVxLm1ldGhvZDonLCBSZXF1ZXN0TWV0aG9kW3JlcS5tZXRob2RdKTsgLy8gUG9zdFxuICogY29uc29sZS5sb2coJ29wdGlvbnMudXJsOicsIG9wdGlvbnMudXJsKTsgLy8gbnVsbFxuICogY29uc29sZS5sb2coJ3JlcS51cmw6JywgcmVxLnVybCk7IC8vIGh0dHBzOi8vZ29vZ2xlLmNvbVxuICogYGBgXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKiBAcHVibGljQXBpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCYXNlUmVxdWVzdE9wdGlvbnMgZXh0ZW5kcyBSZXF1ZXN0T3B0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkgeyBzdXBlcih7bWV0aG9kOiBSZXF1ZXN0TWV0aG9kLkdldCwgaGVhZGVyczogbmV3IEhlYWRlcnMoKX0pOyB9XG59XG4iXX0=
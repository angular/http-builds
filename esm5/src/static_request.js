/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Body } from './body';
import { ContentType } from './enums';
import { Headers } from './headers';
import { normalizeMethodName } from './http_utils';
import { URLSearchParams } from './url_search_params';
// TODO(jeffbcross): properly implement body accessors
/**
 * Creates `Request` instances from provided values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 *
 * `Request` instances are typically created by higher-level classes, like {@link Http} and
 * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
 * One such example is when creating services that wrap higher-level services, like {@link Http},
 * where it may be useful to generate a `Request` with arbitrary headers and search params.
 *
 * ```typescript
 * import {Injectable, Injector} from '@angular/core';
 * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '@angular/http';
 *
 * @Injectable()
 * class AutoAuthenticator {
 *   constructor(public http:Http) {}
 *   request(url:string) {
 *     return this.http.request(new Request({
 *       method: RequestMethod.Get,
 *       url: url,
 *       search: 'password=123'
 *     }));
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
 * var authenticator = injector.get(AutoAuthenticator);
 * authenticator.request('people.json').subscribe(res => {
 *   //URL should have included '?password=123'
 *   console.log('people', res.json());
 * });
 * ```
 *
 * @deprecated use @angular/common/http instead
 */
var Request = /** @class */ (function (_super) {
    tslib_1.__extends(Request, _super);
    function Request(requestOptions) {
        var _this = _super.call(this) || this;
        // TODO: assert that url is present
        var url = requestOptions.url;
        _this.url = requestOptions.url;
        var paramsArg = requestOptions.params || requestOptions.search;
        if (paramsArg) {
            var params = void 0;
            if (typeof paramsArg === 'object' && !(paramsArg instanceof URLSearchParams)) {
                params = urlEncodeParams(paramsArg).toString();
            }
            else {
                params = paramsArg.toString();
            }
            if (params.length > 0) {
                var prefix = '?';
                if (_this.url.indexOf('?') != -1) {
                    prefix = (_this.url[_this.url.length - 1] == '&') ? '' : '&';
                }
                // TODO: just delete search-query-looking string in url?
                _this.url = url + prefix + params;
            }
        }
        _this._body = requestOptions.body;
        _this.method = normalizeMethodName(requestOptions.method);
        // TODO(jeffbcross): implement behavior
        // Defaults to 'omit', consistent with browser
        _this.headers = new Headers(requestOptions.headers);
        _this.contentType = _this.detectContentType();
        _this.withCredentials = requestOptions.withCredentials;
        _this.responseType = requestOptions.responseType;
        return _this;
    }
    /**
     * Returns the content type enum based on header options.
     */
    Request.prototype.detectContentType = function () {
        switch (this.headers.get('content-type')) {
            case 'application/json':
                return ContentType.JSON;
            case 'application/x-www-form-urlencoded':
                return ContentType.FORM;
            case 'multipart/form-data':
                return ContentType.FORM_DATA;
            case 'text/plain':
            case 'text/html':
                return ContentType.TEXT;
            case 'application/octet-stream':
                return this._body instanceof ArrayBuffer ? ContentType.ARRAY_BUFFER : ContentType.BLOB;
            default:
                return this.detectContentTypeFromBody();
        }
    };
    /**
     * Returns the content type of request's body based on its type.
     */
    Request.prototype.detectContentTypeFromBody = function () {
        if (this._body == null) {
            return ContentType.NONE;
        }
        else if (this._body instanceof URLSearchParams) {
            return ContentType.FORM;
        }
        else if (this._body instanceof FormData) {
            return ContentType.FORM_DATA;
        }
        else if (this._body instanceof Blob) {
            return ContentType.BLOB;
        }
        else if (this._body instanceof ArrayBuffer) {
            return ContentType.ARRAY_BUFFER;
        }
        else if (this._body && typeof this._body === 'object') {
            return ContentType.JSON;
        }
        else {
            return ContentType.TEXT;
        }
    };
    /**
     * Returns the request's body according to its type. If body is undefined, return
     * null.
     */
    Request.prototype.getBody = function () {
        switch (this.contentType) {
            case ContentType.JSON:
                return this.text();
            case ContentType.FORM:
                return this.text();
            case ContentType.FORM_DATA:
                return this._body;
            case ContentType.TEXT:
                return this.text();
            case ContentType.BLOB:
                return this.blob();
            case ContentType.ARRAY_BUFFER:
                return this.arrayBuffer();
            default:
                return null;
        }
    };
    return Request;
}(Body));
export { Request };
function urlEncodeParams(params) {
    var searchParams = new URLSearchParams();
    Object.keys(params).forEach(function (key) {
        var value = params[key];
        if (value && Array.isArray(value)) {
            value.forEach(function (element) { return searchParams.append(key, element.toString()); });
        }
        else {
            searchParams.append(key, value.toString());
        }
    });
    return searchParams;
}
var noop = function () { };
var ɵ0 = noop;
var w = typeof window == 'object' ? window : noop;
var FormData = w /** TODO #9100 */['FormData'] || noop;
var Blob = w /** TODO #9100 */['Blob'] || noop;
export var ArrayBuffer = w /** TODO #9100 */['ArrayBuffer'] || noop;
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9zdGF0aWNfcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUM1QixPQUFPLEVBQUMsV0FBVyxFQUFxQyxNQUFNLFNBQVMsQ0FBQztBQUN4RSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUVqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFHcEQsc0RBQXNEO0FBQ3REOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDRztBQUNIO0lBQTZCLG1DQUFJO0lBaUIvQixpQkFBWSxjQUEyQjtRQUF2QyxZQUNFLGlCQUFPLFNBNkJSO1FBNUJDLG1DQUFtQztRQUNuQyxJQUFNLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUssQ0FBQztRQUNoQyxJQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsTUFBTSxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUM7UUFDakUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLElBQUksTUFBTSxTQUFRLENBQUM7WUFDbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLFlBQVksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxNQUFNLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pELENBQUM7WUFBQyxJQUFJLENB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bkIsQ0FBUSxDQUFDLGlCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtCb2R5fSBmcm9tICcuL2JvZHknO1xuaW1wb3J0IHtDb250ZW50VHlwZSwgUmVxdWVzdE1ldGhvZCwgUmVzcG9uc2VDb250ZW50VHlwZX0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5pbXBvcnQge25vcm1hbGl6ZU1ldGhvZE5hbWV9IGZyb20gJy4vaHR0cF91dGlscyc7XG5pbXBvcnQge1JlcXVlc3RBcmdzfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtVUkxTZWFyY2hQYXJhbXN9IGZyb20gJy4vdXJsX3NlYXJjaF9wYXJhbXMnO1xuXG5cbi8vIFRPRE8oamVmZmJjcm9zcyk6IHByb3Blcmx5IGltcGxlbWVudCBib2R5IGFjY2Vzc29yc1xuLyoqXG4gKiBDcmVhdGVzIGBSZXF1ZXN0YCBpbnN0YW5jZXMgZnJvbSBwcm92aWRlZCB2YWx1ZXMuXG4gKlxuICogVGhlIFJlcXVlc3QncyBpbnRlcmZhY2UgaXMgaW5zcGlyZWQgYnkgdGhlIFJlcXVlc3QgY29uc3RydWN0b3IgZGVmaW5lZCBpbiB0aGUgW0ZldGNoXG4gKiBTcGVjXShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVxdWVzdC1jbGFzcyksXG4gKiBidXQgaXMgY29uc2lkZXJlZCBhIHN0YXRpYyB2YWx1ZSB3aG9zZSBib2R5IGNhbiBiZSBhY2Nlc3NlZCBtYW55IHRpbWVzLiBUaGVyZSBhcmUgb3RoZXJcbiAqIGRpZmZlcmVuY2VzIGluIHRoZSBpbXBsZW1lbnRhdGlvbiwgYnV0IHRoaXMgaXMgdGhlIG1vc3Qgc2lnbmlmaWNhbnQuXG4gKlxuICogYFJlcXVlc3RgIGluc3RhbmNlcyBhcmUgdHlwaWNhbGx5IGNyZWF0ZWQgYnkgaGlnaGVyLWxldmVsIGNsYXNzZXMsIGxpa2Uge0BsaW5rIEh0dHB9IGFuZFxuICoge0BsaW5rIEpzb25wfSwgYnV0IGl0IG1heSBvY2Nhc2lvbmFsbHkgYmUgdXNlZnVsIHRvIGV4cGxpY2l0bHkgY3JlYXRlIGBSZXF1ZXN0YCBpbnN0YW5jZXMuXG4gKiBPbmUgc3VjaCBleGFtcGxlIGlzIHdoZW4gY3JlYXRpbmcgc2VydmljZXMgdGhhdCB3cmFwIGhpZ2hlci1sZXZlbCBzZXJ2aWNlcywgbGlrZSB7QGxpbmsgSHR0cH0sXG4gKiB3aGVyZSBpdCBtYXkgYmUgdXNlZnVsIHRvIGdlbmVyYXRlIGEgYFJlcXVlc3RgIHdpdGggYXJiaXRyYXJ5IGhlYWRlcnMgYW5kIHNlYXJjaCBwYXJhbXMuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gKiBpbXBvcnQge0hUVFBfUFJPVklERVJTLCBIdHRwLCBSZXF1ZXN0LCBSZXF1ZXN0TWV0aG9kfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqXG4gKiBASW5qZWN0YWJsZSgpXG4gKiBjbGFzcyBBdXRvQXV0aGVudGljYXRvciB7XG4gKiAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOkh0dHApIHt9XG4gKiAgIHJlcXVlc3QodXJsOnN0cmluZykge1xuICogICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdChuZXcgUmVxdWVzdCh7XG4gKiAgICAgICBtZXRob2Q6IFJlcXVlc3RNZXRob2QuR2V0LFxuICogICAgICAgdXJsOiB1cmwsXG4gKiAgICAgICBzZWFyY2g6ICdwYXNzd29yZD0xMjMnXG4gKiAgICAgfSkpO1xuICogICB9XG4gKiB9XG4gKlxuICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbSFRUUF9QUk9WSURFUlMsIEF1dG9BdXRoZW50aWNhdG9yXSk7XG4gKiB2YXIgYXV0aGVudGljYXRvciA9IGluamVjdG9yLmdldChBdXRvQXV0aGVudGljYXRvcik7XG4gKiBhdXRoZW50aWNhdG9yLnJlcXVlc3QoJ3Blb3BsZS5qc29uJykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gKiAgIC8vVVJMIHNob3VsZCBoYXZlIGluY2x1ZGVkICc/cGFzc3dvcmQ9MTIzJ1xuICogICBjb25zb2xlLmxvZygncGVvcGxlJywgcmVzLmpzb24oKSk7XG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBkZXByZWNhdGVkIHVzZSBAYW5ndWxhci9jb21tb24vaHR0cCBpbnN0ZWFkXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IGV4dGVuZHMgQm9keSB7XG4gIC8qKlxuICAgKiBIdHRwIG1ldGhvZCB3aXRoIHdoaWNoIHRvIHBlcmZvcm0gdGhlIHJlcXVlc3QuXG4gICAqL1xuICBtZXRob2Q6IFJlcXVlc3RNZXRob2Q7XG4gIC8qKlxuICAgKiB7QGxpbmsgSGVhZGVyc30gaW5zdGFuY2VcbiAgICovXG4gIGhlYWRlcnM6IEhlYWRlcnM7XG4gIC8qKiBVcmwgb2YgdGhlIHJlbW90ZSByZXNvdXJjZSAqL1xuICB1cmw6IHN0cmluZztcbiAgLyoqIFR5cGUgb2YgdGhlIHJlcXVlc3QgYm9keSAqKi9cbiAgcHJpdmF0ZSBjb250ZW50VHlwZTogQ29udGVudFR5cGU7XG4gIC8qKiBFbmFibGUgdXNlIGNyZWRlbnRpYWxzICovXG4gIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcbiAgLyoqIEJ1ZmZlciB0byBzdG9yZSB0aGUgcmVzcG9uc2UgKi9cbiAgcmVzcG9uc2VUeXBlOiBSZXNwb25zZUNvbnRlbnRUeXBlO1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0T3B0aW9uczogUmVxdWVzdEFyZ3MpIHtcbiAgICBzdXBlcigpO1xuICAgIC8vIFRPRE86IGFzc2VydCB0aGF0IHVybCBpcyBwcmVzZW50XG4gICAgY29uc3QgdXJsID0gcmVxdWVzdE9wdGlvbnMudXJsO1xuICAgIHRoaXMudXJsID0gcmVxdWVzdE9wdGlvbnMudXJsICE7XG4gICAgY29uc3QgcGFyYW1zQXJnID0gcmVxdWVzdE9wdGlvbnMucGFyYW1zIHx8IHJlcXVlc3RPcHRpb25zLnNlYXJjaDtcbiAgICBpZiAocGFyYW1zQXJnKSB7XG4gICAgICBsZXQgcGFyYW1zOiBzdHJpbmc7XG4gICAgICBpZiAodHlwZW9mIHBhcmFtc0FyZyA9PT0gJ29iamVjdCcgJiYgIShwYXJhbXNBcmcgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXMpKSB7XG4gICAgICAgIHBhcmFtcyA9IHVybEVuY29kZVBhcmFtcyhwYXJhbXNBcmcpLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXNBcmcudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgcHJlZml4ID0gJz8nO1xuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignPycpICE9IC0xKSB7XG4gICAgICAgICAgcHJlZml4ID0gKHRoaXMudXJsW3RoaXMudXJsLmxlbmd0aCAtIDFdID09ICcmJykgPyAnJyA6ICcmJztcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBqdXN0IGRlbGV0ZSBzZWFyY2gtcXVlcnktbG9va2luZyBzdHJpbmcgaW4gdXJsP1xuICAgICAgICB0aGlzLnVybCA9IHVybCArIHByZWZpeCArIHBhcmFtcztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fYm9keSA9IHJlcXVlc3RPcHRpb25zLmJvZHk7XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2ROYW1lKHJlcXVlc3RPcHRpb25zLm1ldGhvZCAhKTtcbiAgICAvLyBUT0RPKGplZmZiY3Jvc3MpOiBpbXBsZW1lbnQgYmVoYXZpb3JcbiAgICAvLyBEZWZhdWx0cyB0byAnb21pdCcsIGNvbnNpc3RlbnQgd2l0aCBicm93c2VyXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMocmVxdWVzdE9wdGlvbnMuaGVhZGVycyk7XG4gICAgdGhpcy5jb250ZW50VHlwZSA9IHRoaXMuZGV0ZWN0Q29udGVudFR5cGUoKTtcbiAgICB0aGlzLndpdGhDcmVkZW50aWFscyA9IHJlcXVlc3RPcHRpb25zLndpdGhDcmVkZW50aWFscyAhO1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gcmVxdWVzdE9wdGlvbnMucmVzcG9uc2VUeXBlICE7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29udGVudCB0eXBlIGVudW0gYmFzZWQgb24gaGVhZGVyIG9wdGlvbnMuXG4gICAqL1xuICBkZXRlY3RDb250ZW50VHlwZSgpOiBDb250ZW50VHlwZSB7XG4gICAgc3dpdGNoICh0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgY2FzZSAnYXBwbGljYXRpb24vanNvbic6XG4gICAgICAgIHJldHVybiBDb250ZW50VHlwZS5KU09OO1xuICAgICAgY2FzZSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzpcbiAgICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLkZPUk07XG4gICAgICBjYXNlICdtdWx0aXBhcnQvZm9ybS1kYXRhJzpcbiAgICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLkZPUk1fREFUQTtcbiAgICAgIGNhc2UgJ3RleHQvcGxhaW4nOlxuICAgICAgY2FzZSAndGV4dC9odG1sJzpcbiAgICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLlRFWFQ7XG4gICAgICBjYXNlICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nOlxuICAgICAgICByZXR1cm4gdGhpcy5fYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gQ29udGVudFR5cGUuQVJSQVlfQlVGRkVSIDogQ29udGVudFR5cGUuQkxPQjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLmRldGVjdENvbnRlbnRUeXBlRnJvbUJvZHkoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29udGVudCB0eXBlIG9mIHJlcXVlc3QncyBib2R5IGJhc2VkIG9uIGl0cyB0eXBlLlxuICAgKi9cbiAgZGV0ZWN0Q29udGVudFR5cGVGcm9tQm9keSgpOiBDb250ZW50VHlwZSB7XG4gICAgaWYgKHRoaXMuX2JvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLk5PTkU7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5IGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgICByZXR1cm4gQ29udGVudFR5cGUuRk9STTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLkZPUk1fREFUQTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICByZXR1cm4gQ29udGVudFR5cGUuQkxPQjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHkgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLkFSUkFZX0JVRkZFUjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHkgJiYgdHlwZW9mIHRoaXMuX2JvZHkgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gQ29udGVudFR5cGUuSlNPTjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLlRFWFQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlcXVlc3QncyBib2R5IGFjY29yZGluZyB0byBpdHMgdHlwZS4gSWYgYm9keSBpcyB1bmRlZmluZWQsIHJldHVyblxuICAgKiBudWxsLlxuICAgKi9cbiAgZ2V0Qm9keSgpOiBhbnkge1xuICAgIHN3aXRjaCAodGhpcy5jb250ZW50VHlwZSkge1xuICAgICAgY2FzZSBDb250ZW50VHlwZS5KU09OOlxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCk7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlLkZPUk06XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKTtcbiAgICAgIGNhc2UgQ29udGVudFR5cGUuRk9STV9EQVRBOlxuICAgICAgICByZXR1cm4gdGhpcy5fYm9keTtcbiAgICAgIGNhc2UgQ29udGVudFR5cGUuVEVYVDpcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpO1xuICAgICAgY2FzZSBDb250ZW50VHlwZS5CTE9COlxuICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCk7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlLkFSUkFZX0JVRkZFUjpcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlCdWZmZXIoKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cmxFbmNvZGVQYXJhbXMocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IFVSTFNlYXJjaFBhcmFtcyB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJhbXNba2V5XTtcbiAgICBpZiAodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZWxlbWVudCA9PiBzZWFyY2hQYXJhbXMuYXBwZW5kKGtleSwgZWxlbWVudC50b1N0cmluZygpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc2VhcmNoUGFyYW1zO1xufVxuXG5jb25zdCBub29wID0gZnVuY3Rpb24oKSB7fTtcbmNvbnN0IHcgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnID8gd2luZG93IDogbm9vcDtcbmNvbnN0IEZvcm1EYXRhID0gKHcgYXMgYW55IC8qKiBUT0RPICM5MTAwICovKVsnRm9ybURhdGEnXSB8fCBub29wO1xuY29uc3QgQmxvYiA9ICh3IGFzIGFueSAvKiogVE9ETyAjOTEwMCAqLylbJ0Jsb2InXSB8fCBub29wO1xuZXhwb3J0IGNvbnN0IEFycmF5QnVmZmVyOiBBcnJheUJ1ZmZlckNvbnN0cnVjdG9yID1cbiAgICAodyBhcyBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pWydBcnJheUJ1ZmZlciddIHx8IG5vb3A7XG4iXX0=
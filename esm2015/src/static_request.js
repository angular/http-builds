/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
 * @deprecated see https://angular.io/guide/http
 */
export class Request extends Body {
    constructor(requestOptions) {
        super();
        // TODO: assert that url is present
        const url = requestOptions.url;
        this.url = requestOptions.url;
        const paramsArg = requestOptions.params || requestOptions.search;
        if (paramsArg) {
            let params;
            if (typeof paramsArg === 'object' && !(paramsArg instanceof URLSearchParams)) {
                params = urlEncodeParams(paramsArg).toString();
            }
            else {
                params = paramsArg.toString();
            }
            if (params.length > 0) {
                let prefix = '?';
                if (this.url.indexOf('?') != -1) {
                    prefix = (this.url[this.url.length - 1] == '&') ? '' : '&';
                }
                // TODO: just delete search-query-looking string in url?
                this.url = url + prefix + params;
            }
        }
        this._body = requestOptions.body;
        this.method = normalizeMethodName(requestOptions.method);
        // TODO(jeffbcross): implement behavior
        // Defaults to 'omit', consistent with browser
        this.headers = new Headers(requestOptions.headers);
        this.contentType = this.detectContentType();
        this.withCredentials = requestOptions.withCredentials;
        this.responseType = requestOptions.responseType;
    }
    /**
     * Returns the content type enum based on header options.
     */
    detectContentType() {
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
    }
    /**
     * Returns the content type of request's body based on its type.
     */
    detectContentTypeFromBody() {
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
    }
    /**
     * Returns the request's body according to its type. If body is undefined, return
     * null.
     */
    getBody() {
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
    }
}
function urlEncodeParams(params) {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
        const value = params[key];
        if (value && Array.isArray(value)) {
            value.forEach(element => searchParams.append(key, element.toString()));
        }
        else {
            searchParams.append(key, value.toString());
        }
    });
    return searchParams;
}
const noop = function () { };
const w = typeof window == 'object' ? window : noop;
const FormData = w /** TODO #9100 */['FormData'] || noop;
const Blob = w /** TODO #9100 */['Blob'] || noop;
export const ArrayBuffer = w /** TODO #9100 */['ArrayBuffer'] || noop;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9zdGF0aWNfcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBQyxXQUFXLEVBQXFDLE1BQU0sU0FBUyxDQUFDO0FBQ3hFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRWpELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUdwRCxzREFBc0Q7QUFDdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NHO0FBQ0gsTUFBTSxPQUFPLE9BQVEsU0FBUSxJQUFJO0lBaUIvQixZQUFZLGNBQTJCO1FBQ3JDLEtBQUssRUFBRSxDQUFDO1FBQ1IsbUNBQW1DO1FBQ25DLE1BQU0sR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBSyxDQUFDO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxNQUFNLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUNqRSxJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksTUFBYyxDQUFDO1lBQ25CLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLFlBQVksZUFBZSxDQUFDLEVBQUU7Z0JBQzVFLE1BQU0sR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDaEQ7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMvQjtZQUNELElBQUks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QUN0QixDQUFDO0FBRUQsTUFBTSxJQUFJLEdBQUcsY0FBWSxDQUFDLENBQUM7QUFDM0IsTUFBTSxDQUFDLEdBQUcsT0FBTyxNQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNwRCxNQUFNLFFBQVEsR0FBSSxDQUFRLENBQUMsaUJBQWtCLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ2xFLE1BQU0sSUFBSSxHQUFJLENBQVEsQ0FBQyxpQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDMUQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUNuQixDQUFRLENBQUMsaUJBQWtCLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0JvZHl9IGZyb20gJy4vYm9keSc7XG5pbXBvcnQge0NvbnRlbnRUeXBlLCBSZXF1ZXN0TWV0aG9kLCBSZXNwb25zZUNvbnRlbnRUeXBlfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7SGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzJztcbmltcG9ydCB7bm9ybWFsaXplTWV0aG9kTmFtZX0gZnJvbSAnLi9odHRwX3V0aWxzJztcbmltcG9ydCB7UmVxdWVzdEFyZ3N9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1VSTFNlYXJjaFBhcmFtc30gZnJvbSAnLi91cmxfc2VhcmNoX3BhcmFtcyc7XG5cblxuLy8gVE9ETyhqZWZmYmNyb3NzKTogcHJvcGVybHkgaW1wbGVtZW50IGJvZHkgYWNjZXNzb3JzXG4vKipcbiAqIENyZWF0ZXMgYFJlcXVlc3RgIGluc3RhbmNlcyBmcm9tIHByb3ZpZGVkIHZhbHVlcy5cbiAqXG4gKiBUaGUgUmVxdWVzdCdzIGludGVyZmFjZSBpcyBpbnNwaXJlZCBieSB0aGUgUmVxdWVzdCBjb25zdHJ1Y3RvciBkZWZpbmVkIGluIHRoZSBbRmV0Y2hcbiAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXF1ZXN0LWNsYXNzKSxcbiAqIGJ1dCBpcyBjb25zaWRlcmVkIGEgc3RhdGljIHZhbHVlIHdob3NlIGJvZHkgY2FuIGJlIGFjY2Vzc2VkIG1hbnkgdGltZXMuIFRoZXJlIGFyZSBvdGhlclxuICogZGlmZmVyZW5jZXMgaW4gdGhlIGltcGxlbWVudGF0aW9uLCBidXQgdGhpcyBpcyB0aGUgbW9zdCBzaWduaWZpY2FudC5cbiAqXG4gKiBgUmVxdWVzdGAgaW5zdGFuY2VzIGFyZSB0eXBpY2FsbHkgY3JlYXRlZCBieSBoaWdoZXItbGV2ZWwgY2xhc3NlcywgbGlrZSB7QGxpbmsgSHR0cH0gYW5kXG4gKiB7QGxpbmsgSnNvbnB9LCBidXQgaXQgbWF5IG9jY2FzaW9uYWxseSBiZSB1c2VmdWwgdG8gZXhwbGljaXRseSBjcmVhdGUgYFJlcXVlc3RgIGluc3RhbmNlcy5cbiAqIE9uZSBzdWNoIGV4YW1wbGUgaXMgd2hlbiBjcmVhdGluZyBzZXJ2aWNlcyB0aGF0IHdyYXAgaGlnaGVyLWxldmVsIHNlcnZpY2VzLCBsaWtlIHtAbGluayBIdHRwfSxcbiAqIHdoZXJlIGl0IG1heSBiZSB1c2VmdWwgdG8gZ2VuZXJhdGUgYSBgUmVxdWVzdGAgd2l0aCBhcmJpdHJhcnkgaGVhZGVycyBhbmQgc2VhcmNoIHBhcmFtcy5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge0luamVjdGFibGUsIEluamVjdG9yfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7SFRUUF9QUk9WSURFUlMsIEh0dHAsIFJlcXVlc3QsIFJlcXVlc3RNZXRob2R9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuICpcbiAqIEBJbmplY3RhYmxlKClcbiAqIGNsYXNzIEF1dG9BdXRoZW50aWNhdG9yIHtcbiAqICAgY29uc3RydWN0b3IocHVibGljIGh0dHA6SHR0cCkge31cbiAqICAgcmVxdWVzdCh1cmw6c3RyaW5nKSB7XG4gKiAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KG5ldyBSZXF1ZXN0KHtcbiAqICAgICAgIG1ldGhvZDogUmVxdWVzdE1ldGhvZC5HZXQsXG4gKiAgICAgICB1cmw6IHVybCxcbiAqICAgICAgIHNlYXJjaDogJ3Bhc3N3b3JkPTEyMydcbiAqICAgICB9KSk7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiB2YXIgaW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKFtIVFRQX1BST1ZJREVSUywgQXV0b0F1dGhlbnRpY2F0b3JdKTtcbiAqIHZhciBhdXRoZW50aWNhdG9yID0gaW5qZWN0b3IuZ2V0KEF1dG9BdXRoZW50aWNhdG9yKTtcbiAqIGF1dGhlbnRpY2F0b3IucmVxdWVzdCgncGVvcGxlLmpzb24nKS5zdWJzY3JpYmUocmVzID0+IHtcbiAqICAgLy9VUkwgc2hvdWxkIGhhdmUgaW5jbHVkZWQgJz9wYXNzd29yZD0xMjMnXG4gKiAgIGNvbnNvbGUubG9nKCdwZW9wbGUnLCByZXMuanNvbigpKTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IGV4dGVuZHMgQm9keSB7XG4gIC8qKlxuICAgKiBIdHRwIG1ldGhvZCB3aXRoIHdoaWNoIHRvIHBlcmZvcm0gdGhlIHJlcXVlc3QuXG4gICAqL1xuICBtZXRob2Q6IFJlcXVlc3RNZXRob2Q7XG4gIC8qKlxuICAgKiB7QGxpbmsgSGVhZGVyc30gaW5zdGFuY2VcbiAgICovXG4gIGhlYWRlcnM6IEhlYWRlcnM7XG4gIC8qKiBVcmwgb2YgdGhlIHJlbW90ZSByZXNvdXJjZSAqL1xuICB1cmw6IHN0cmluZztcbiAgLyoqIFR5cGUgb2YgdGhlIHJlcXVlc3QgYm9keSAqKi9cbiAgcHJpdmF0ZSBjb250ZW50VHlwZTogQ29udGVudFR5cGU7XG4gIC8qKiBFbmFibGUgdXNlIGNyZWRlbnRpYWxzICovXG4gIHdpdGhDcmVkZW50aWFsczogYm9vbGVhbjtcbiAgLyoqIEJ1ZmZlciB0byBzdG9yZSB0aGUgcmVzcG9uc2UgKi9cbiAgcmVzcG9uc2VUeXBlOiBSZXNwb25zZUNvbnRlbnRUeXBlO1xuICBjb25zdHJ1Y3RvcihyZXF1ZXN0T3B0aW9uczogUmVxdWVzdEFyZ3MpIHtcbiAgICBzdXBlcigpO1xuICAgIC8vIFRPRE86IGFzc2VydCB0aGF0IHVybCBpcyBwcmVzZW50XG4gICAgY29uc3QgdXJsID0gcmVxdWVzdE9wdGlvbnMudXJsO1xuICAgIHRoaXMudXJsID0gcmVxdWVzdE9wdGlvbnMudXJsICE7XG4gICAgY29uc3QgcGFyYW1zQXJnID0gcmVxdWVzdE9wdGlvbnMucGFyYW1zIHx8IHJlcXVlc3RPcHRpb25zLnNlYXJjaDtcbiAgICBpZiAocGFyYW1zQXJnKSB7XG4gICAgICBsZXQgcGFyYW1zOiBzdHJpbmc7XG4gICAgICBpZiAodHlwZW9mIHBhcmFtc0FyZyA9PT0gJ29iamVjdCcgJiYgIShwYXJhbXNBcmcgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXMpKSB7XG4gICAgICAgIHBhcmFtcyA9IHVybEVuY29kZVBhcmFtcyhwYXJhbXNBcmcpLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXNBcmcudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgcHJlZml4ID0gJz8nO1xuICAgICAgICBpZiAodGhpcy51cmwuaW5kZXhPZignPycpICE9IC0xKSB7XG4gICAgICAgICAgcHJlZml4ID0gKHRoaXMudXJsW3RoaXMudXJsLmxlbmd0aCAtIDFdID09ICcmJykgPyAnJyA6ICcmJztcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiBqdXN0IGRlbGV0ZSBzZWFyY2gtcXVlcnktbG9va2luZyBzdHJpbmcgaW4gdXJsP1xuICAgICAgICB0aGlzLnVybCA9IHVybCArIHByZWZpeCArIHBhcmFtcztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fYm9keSA9IHJlcXVlc3RPcHRpb25zLmJvZHk7XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2ROYW1lKHJlcXVlc3RPcHRpb25zLm1ldGhvZCAhKTtcbiAgICAvLyBUT0RPKGplZmZiY3Jvc3MpOiBpbXBsZW1lbnQgYmVoYXZpb3JcbiAgICAvLyBEZWZhdWx0cyB0byAnb21pdCcsIGNvbnNpc3RlbnQgd2l0aCBicm93c2VyXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMocmVxdWVzdE9wdGlvbnMuaGVhZGVycyk7XG4gICAgdGhpcy5jb250ZW50VHlwZSA9IHRoaXMuZGV0ZWN0Q29udGVudFR5cGUoKTtcbiAgICB0aGlzLndpdGhDcmVkZW50aWFscyA9IHJlcXVlc3RPcHRpb25zLndpdGhDcmVkZW50aWFscyAhO1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gcmVxdWVzdE9wdGlvbnMucmVzcG9uc2VUeXBlICE7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29udGVudCB0eXBlIGVudW0gYmFzZWQgb24gaGVhZGVyIG9wdGlvbnMuXG4gICAqL1xuICBkZXRlY3RDb250ZW50VHlwZSgpOiBDb250ZW50VHlwZSB7XG4gICAgc3dpdGNoICh0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgY2FzZSAnYXBwbGljYXRpb24vanNvbic6XG4gICAgICAgIHJldHVybiBDb250ZW50VHlwZS5KU09OO1xuICAgICAgY2FzZSAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzpcbiAgICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLkZPUk07XG4gICAgICBjYXNlICdtdWx0aXBhcnQvZm9ybS1kYXRhJzpcbiAgICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLkZPUk1fREFUQTtcbiAgICAgIGNhc2UgJ3RleHQvcGxhaW4nOlxuICAgICAgY2FzZSAndGV4dC9odG1sJzpcbiAgICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLlRFWFQ7XG4gICAgICBjYXNlICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nOlxuICAgICAgICByZXR1cm4gdGhpcy5fYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gQ29udGVudFR5cGUuQVJSQVlfQlVGRkVSIDogQ29udGVudFR5cGUuQkxPQjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLmRldGVjdENvbnRlbnRUeXBlRnJvbUJvZHkoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29udGVudCB0eXBlIG9mIHJlcXVlc3QncyBib2R5IGJhc2VkIG9uIGl0cyB0eXBlLlxuICAgKi9cbiAgZGV0ZWN0Q29udGVudFR5cGVGcm9tQm9keSgpOiBDb250ZW50VHlwZSB7XG4gICAgaWYgKHRoaXMuX2JvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLk5PTkU7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5IGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgICByZXR1cm4gQ29udGVudFR5cGUuRk9STTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHkgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xuICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLkZPUk1fREFUQTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHkgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICByZXR1cm4gQ29udGVudFR5cGUuQkxPQjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHkgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLkFSUkFZX0JVRkZFUjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHkgJiYgdHlwZW9mIHRoaXMuX2JvZHkgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gQ29udGVudFR5cGUuSlNPTjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIENvbnRlbnRUeXBlLlRFWFQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlcXVlc3QncyBib2R5IGFjY29yZGluZyB0byBpdHMgdHlwZS4gSWYgYm9keSBpcyB1bmRlZmluZWQsIHJldHVyblxuICAgKiBudWxsLlxuICAgKi9cbiAgZ2V0Qm9keSgpOiBhbnkge1xuICAgIHN3aXRjaCAodGhpcy5jb250ZW50VHlwZSkge1xuICAgICAgY2FzZSBDb250ZW50VHlwZS5KU09OOlxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCk7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlLkZPUk06XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKTtcbiAgICAgIGNhc2UgQ29udGVudFR5cGUuRk9STV9EQVRBOlxuICAgICAgICByZXR1cm4gdGhpcy5fYm9keTtcbiAgICAgIGNhc2UgQ29udGVudFR5cGUuVEVYVDpcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpO1xuICAgICAgY2FzZSBDb250ZW50VHlwZS5CTE9COlxuICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCk7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlLkFSUkFZX0JVRkZFUjpcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXlCdWZmZXIoKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cmxFbmNvZGVQYXJhbXMocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IFVSTFNlYXJjaFBhcmFtcyB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJhbXNba2V5XTtcbiAgICBpZiAodmFsdWUgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goZWxlbWVudCA9PiBzZWFyY2hQYXJhbXMuYXBwZW5kKGtleSwgZWxlbWVudC50b1N0cmluZygpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gc2VhcmNoUGFyYW1zO1xufVxuXG5jb25zdCBub29wID0gZnVuY3Rpb24oKSB7fTtcbmNvbnN0IHcgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnID8gd2luZG93IDogbm9vcDtcbmNvbnN0IEZvcm1EYXRhID0gKHcgYXMgYW55IC8qKiBUT0RPICM5MTAwICovKVsnRm9ybURhdGEnXSB8fCBub29wO1xuY29uc3QgQmxvYiA9ICh3IGFzIGFueSAvKiogVE9ETyAjOTEwMCAqLylbJ0Jsb2InXSB8fCBub29wO1xuZXhwb3J0IGNvbnN0IEFycmF5QnVmZmVyOiBBcnJheUJ1ZmZlckNvbnN0cnVjdG9yID1cbiAgICAodyBhcyBhbnkgLyoqIFRPRE8gIzkxMDAgKi8pWydBcnJheUJ1ZmZlciddIHx8IG5vb3A7XG4iXX0=
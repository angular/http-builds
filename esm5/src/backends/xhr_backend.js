/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ɵgetDOM as getDOM } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ResponseOptions } from '../base_response_options';
import { ContentType, RequestMethod, ResponseContentType, ResponseType } from '../enums';
import { Headers } from '../headers';
import { getResponseURL, isSuccess } from '../http_utils';
import { XSRFStrategy } from '../interfaces';
import { Response } from '../static_response';
import { BrowserXhr } from './browser_xhr';
var XSSI_PREFIX = /^\)\]\}',?\n/;
/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 *
 * This class would typically not be created or interacted with directly inside applications, though
 * the {@link MockConnection} may be interacted with in tests.
 *
 * @deprecated see https://angular.io/guide/http
 */
var XHRConnection = /** @class */ (function () {
    function XHRConnection(req, browserXHR, baseResponseOptions) {
        var _this = this;
        this.request = req;
        this.response = new Observable(function (responseObserver) {
            var _xhr = browserXHR.build();
            _xhr.open(RequestMethod[req.method].toUpperCase(), req.url);
            if (req.withCredentials != null) {
                _xhr.withCredentials = req.withCredentials;
            }
            // load event handler
            var onLoad = function () {
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status = _xhr.status === 1223 ? 204 : _xhr.status;
                var body = null;
                // HTTP 204 means no content
                if (status !== 204) {
                    // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                    // response/responseType properties were introduced in ResourceLoader Level2 spec
                    // (supported by IE10)
                    body = (typeof _xhr.response === 'undefined') ? _xhr.responseText : _xhr.response;
                    // Implicitly strip a potential XSSI prefix.
                    if (typeof body === 'string') {
                        body = body.replace(XSSI_PREFIX, '');
                    }
                }
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status === 0) {
                    status = body ? 200 : 0;
                }
                var headers = Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
                // IE 9 does not provide the way to get URL of response
                var url = getResponseURL(_xhr) || req.url;
                var statusText = _xhr.statusText || 'OK';
                var responseOptions = new ResponseOptions({ body: body, status: status, headers: headers, statusText: statusText, url: url });
                if (baseResponseOptions != null) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                var response = new Response(responseOptions);
                response.ok = isSuccess(status);
                if (response.ok) {
                    responseObserver.next(response);
                    // TODO(gdi2290): defer complete if array buffer until done
                    responseObserver.complete();
                    return;
                }
                responseObserver.error(response);
            };
            // error event handler
            var onError = function (err) {
                var responseOptions = new ResponseOptions({
                    body: err,
                    type: ResponseType.Error,
                    status: _xhr.status,
                    statusText: _xhr.statusText,
                });
                if (baseResponseOptions != null) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new Response(responseOptions));
            };
            _this.setDetectedContentType(req, _xhr);
            if (req.headers == null) {
                req.headers = new Headers();
            }
            if (!req.headers.has('Accept')) {
                req.headers.append('Accept', 'application/json, text/plain, */*');
            }
            req.headers.forEach(function (values, name) { return _xhr.setRequestHeader(name, values.join(',')); });
            // Select the correct buffer type to store the response
            if (req.responseType != null && _xhr.responseType != null) {
                switch (req.responseType) {
                    case ResponseContentType.ArrayBuffer:
                        _xhr.responseType = 'arraybuffer';
                        break;
                    case ResponseContentType.Json:
                        _xhr.responseType = 'json';
                        break;
                    case ResponseContentType.Text:
                        _xhr.responseType = 'text';
                        break;
                    case ResponseContentType.Blob:
                        _xhr.responseType = 'blob';
                        break;
                    default:
                        throw new Error('The selected responseType is not supported');
                }
            }
            _xhr.addEventListener('load', onLoad);
            _xhr.addEventListener('error', onError);
            _xhr.send(_this.request.getBody());
            return function () {
                _xhr.removeEventListener('load', onLoad);
                _xhr.removeEventListener('error', onError);
                _xhr.abort();
            };
        });
    }
    XHRConnection.prototype.setDetectedContentType = function (req /** TODO Request */, _xhr /** XMLHttpRequest */) {
        // Skip if a custom Content-Type header is provided
        if (req.headers != null && req.headers.get('Content-Type') != null) {
            return;
        }
        // Set the detected content type
        switch (req.contentType) {
            case ContentType.NONE:
                break;
            case ContentType.JSON:
                _xhr.setRequestHeader('content-type', 'application/json');
                break;
            case ContentType.FORM:
                _xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
                break;
            case ContentType.TEXT:
                _xhr.setRequestHeader('content-type', 'text/plain');
                break;
            case ContentType.BLOB:
                var blob = req.blob();
                if (blob.type) {
                    _xhr.setRequestHeader('content-type', blob.type);
                }
                break;
        }
    };
    return XHRConnection;
}());
export { XHRConnection };
/**
 * `XSRFConfiguration` sets up Cross Site Request Forgery (XSRF) protection for the application
 * using a cookie. See https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
 * for more information on XSRF.
 *
 * Applications can configure custom cookie and header names by binding an instance of this class
 * with different `cookieName` and `headerName` values. See the main HTTP documentation for more
 * details.
 *
 * @deprecated see https://angular.io/guide/http
 */
var CookieXSRFStrategy = /** @class */ (function () {
    function CookieXSRFStrategy(_cookieName, _headerName) {
        if (_cookieName === void 0) { _cookieName = 'XSRF-TOKEN'; }
        if (_headerName === void 0) { _headerName = 'X-XSRF-TOKEN'; }
        this._cookieName = _cookieName;
        this._headerName = _headerName;
    }
    CookieXSRFStrategy.prototype.configureRequest = function (req) {
        var xsrfToken = getDOM().getCookie(this._cookieName);
        if (xsrfToken) {
            req.headers.set(this._headerName, xsrfToken);
        }
    };
    return CookieXSRFStrategy;
}());
export { CookieXSRFStrategy };
/**
 * Creates {@link XHRConnection} instances.
 *
 * This class would typically not be used by end users, but could be
 * overridden if a different backend implementation should be used,
 * such as in a node backend.
 *
 * ### Example
 *
 * ```
 * import {Http, MyNodeBackend, HTTP_PROVIDERS, BaseRequestOptions} from '@angular/http';
 * @Component({
 *   viewProviders: [
 *     HTTP_PROVIDERS,
 *     {provide: Http, useFactory: (backend, options) => {
 *       return new Http(backend, options);
 *     }, deps: [MyNodeBackend, BaseRequestOptions]}]
 * })
 * class MyComponent {
 *   constructor(http:Http) {
 *     http.request('people.json').subscribe(res => this.people = res.json());
 *   }
 * }
 * ```
 * @deprecated see https://angular.io/guide/http
 */
var XHRBackend = /** @class */ (function () {
    function XHRBackend(_browserXHR, _baseResponseOptions, _xsrfStrategy) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
        this._xsrfStrategy = _xsrfStrategy;
    }
    XHRBackend.prototype.createConnection = function (request) {
        this._xsrfStrategy.configureRequest(request);
        return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
    };
    XHRBackend = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [BrowserXhr, ResponseOptions,
            XSRFStrategy])
    ], XHRBackend);
    return XHRBackend;
}());
export { XHRBackend };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyX2JhY2tlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9iYWNrZW5kcy94aHJfYmFja2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxJQUFJLE1BQU0sRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBQyxVQUFVLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxXQUFXLEVBQWMsYUFBYSxFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNuRyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBQyxjQUFjLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBZ0MsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTFFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLElBQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQztBQUVuQzs7Ozs7Ozs7O0dBU0c7QUFDSDtJQVNFLHVCQUFZLEdBQVksRUFBRSxVQUFzQixFQUFFLG1CQUFxQztRQUF2RixpQkE2R0M7UUE1R0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBVyxVQUFDLGdCQUFvQztZQUM1RSxJQUFNLElBQUksR0FBbUIsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hELElBQUks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QyxFQUN0RSxhQUEyQjtRQUQzQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBaUI7UUFDdEUsa0JBQWEsR0FBYixhQUFhLENBQWM7SUFBRyxDQUFDO0lBRTNDLHFDQUFnQixHQUFoQixVQUFpQixPQUFnQjtRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDakYsQ0FBQztJQVJVLFVBQVU7UUFEdEIsVUFBVSxFQUFFO2lEQUdjLFVBQVUsRUFBZ0MsZUFBZTtZQUN2RCxZQUFZO09BSDVCLFVBQVUsQ0FTdEI7SUFBRCxpQkFBQztDQUFBLEFBVEQsSUFTQztTQVRZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIE9ic2VydmVyfSBmcm9tICdyeGpzJztcbmltcG9ydCB7UmVzcG9uc2VPcHRpb25zfSBmcm9tICcuLi9iYXNlX3Jlc3BvbnNlX29wdGlvbnMnO1xuaW1wb3J0IHtDb250ZW50VHlwZSwgUmVhZHlTdGF0ZSwgUmVxdWVzdE1ldGhvZCwgUmVzcG9uc2VDb250ZW50VHlwZSwgUmVzcG9uc2VUeXBlfSBmcm9tICcuLi9lbnVtcyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4uL2hlYWRlcnMnO1xuaW1wb3J0IHtnZXRSZXNwb25zZVVSTCwgaXNTdWNjZXNzfSBmcm9tICcuLi9odHRwX3V0aWxzJztcbmltcG9ydCB7Q29ubmVjdGlvbiwgQ29ubmVjdGlvbkJhY2tlbmQsIFhTUkZTdHJhdGVneX0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1JlcXVlc3R9IGZyb20gJy4uL3N0YXRpY19yZXF1ZXN0JztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4uL3N0YXRpY19yZXNwb25zZSc7XG5pbXBvcnQge0Jyb3dzZXJYaHJ9IGZyb20gJy4vYnJvd3Nlcl94aHInO1xuXG5jb25zdCBYU1NJX1BSRUZJWCA9IC9eXFwpXFxdXFx9Jyw/XFxuLztcblxuLyoqXG4gKiBDcmVhdGVzIGNvbm5lY3Rpb25zIHVzaW5nIGBYTUxIdHRwUmVxdWVzdGAuIEdpdmVuIGEgZnVsbHktcXVhbGlmaWVkXG4gKiByZXF1ZXN0LCBhbiBgWEhSQ29ubmVjdGlvbmAgd2lsbCBpbW1lZGlhdGVseSBjcmVhdGUgYW4gYFhNTEh0dHBSZXF1ZXN0YCBvYmplY3QgYW5kIHNlbmQgdGhlXG4gKiByZXF1ZXN0LlxuICpcbiAqIFRoaXMgY2xhc3Mgd291bGQgdHlwaWNhbGx5IG5vdCBiZSBjcmVhdGVkIG9yIGludGVyYWN0ZWQgd2l0aCBkaXJlY3RseSBpbnNpZGUgYXBwbGljYXRpb25zLCB0aG91Z2hcbiAqIHRoZSB7QGxpbmsgTW9ja0Nvbm5lY3Rpb259IG1heSBiZSBpbnRlcmFjdGVkIHdpdGggaW4gdGVzdHMuXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbmV4cG9ydCBjbGFzcyBYSFJDb25uZWN0aW9uIGltcGxlbWVudHMgQ29ubmVjdGlvbiB7XG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIC8qKlxuICAgKiBSZXNwb25zZSB7QGxpbmsgRXZlbnRFbWl0dGVyfSB3aGljaCBlbWl0cyBhIHNpbmdsZSB7QGxpbmsgUmVzcG9uc2V9IHZhbHVlIG9uIGxvYWQgZXZlbnQgb2ZcbiAgICogYFhNTEh0dHBSZXF1ZXN0YC5cbiAgICovXG4gIHJlc3BvbnNlOiBPYnNlcnZhYmxlPFJlc3BvbnNlPjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHJlYWR5U3RhdGUgITogUmVhZHlTdGF0ZTtcbiAgY29uc3RydWN0b3IocmVxOiBSZXF1ZXN0LCBicm93c2VyWEhSOiBCcm93c2VyWGhyLCBiYXNlUmVzcG9uc2VPcHRpb25zPzogUmVzcG9uc2VPcHRpb25zKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxO1xuICAgIHRoaXMucmVzcG9uc2UgPSBuZXcgT2JzZXJ2YWJsZTxSZXNwb25zZT4oKHJlc3BvbnNlT2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlPikgPT4ge1xuICAgICAgY29uc3QgX3hocjogWE1MSHR0cFJlcXVlc3QgPSBicm93c2VyWEhSLmJ1aWxkKCk7XG4gICAgICBfeGhyLm9wZW4oUmVxdWVzdE1ldGhvZFtyZXEubWV0aG9kXS50b1VwcGVyQ2FzZSgpLCByZXEudXJsKTtcbiAgICAgIGlmIChyZXEud2l0aENyZWRlbnRpYWxzICE9IG51bGwpIHtcbiAgICAgICAgX3hoci53aXRoQ3JlZGVudGlhbHMgPSByZXEud2l0aENyZWRlbnRpYWxzO1xuICAgICAgfVxuICAgICAgLy8gbG9hZCBldmVudCBoYW5kbGVyXG4gICAgICBjb25zdCBvbkxvYWQgPSAoKSA9PiB7XG4gICAgICAgIC8vIG5vcm1hbGl6ZSBJRTkgYnVnIChodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xNDUwKVxuICAgICAgICBsZXQgc3RhdHVzOiBudW1iZXIgPSBfeGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IF94aHIuc3RhdHVzO1xuXG4gICAgICAgIGxldCBib2R5OiBhbnkgPSBudWxsO1xuXG4gICAgICAgIC8vIEhUVFAgMjA0IG1lYW5zIG5vIGNvbnRlbnRcbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgICAgLy8gcmVzcG9uc2VUZXh0IGlzIHRoZSBvbGQtc2Nob29sIHdheSBvZiByZXRyaWV2aW5nIHJlc3BvbnNlIChzdXBwb3J0ZWQgYnkgSUU4ICYgOSlcbiAgICAgICAgICAvLyByZXNwb25zZS9yZXNwb25zZVR5cGUgcHJvcGVydGllcyB3ZXJlIGludHJvZHVjZWQgaW4gUmVzb3VyY2VMb2FkZXIgTGV2ZWwyIHNwZWNcbiAgICAgICAgICAvLyAoc3VwcG9ydGVkIGJ5IElFMTApXG4gICAgICAgICAgYm9keSA9ICh0eXBlb2YgX3hoci5yZXNwb25zZSA9PT0gJ3VuZGVmaW5lZCcpID8gX3hoci5yZXNwb25zZVRleHQgOiBfeGhyLnJlc3BvbnNlO1xuXG4gICAgICAgICAgLy8gSW1wbGljaXRseSBzdHJpcCBhIHBvdGVudGlhbCBYU1NJIHByZWZpeC5cbiAgICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBib2R5ID0gYm9keS5yZXBsYWNlKFhTU0lfUFJFRklYLCAnJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZml4IHN0YXR1cyBjb2RlIHdoZW4gaXQgaXMgMCAoMCBzdGF0dXMgaXMgdW5kb2N1bWVudGVkKS5cbiAgICAgICAgLy8gT2NjdXJzIHdoZW4gYWNjZXNzaW5nIGZpbGUgcmVzb3VyY2VzIG9yIG9uIEFuZHJvaWQgNC4xIHN0b2NrIGJyb3dzZXJcbiAgICAgICAgLy8gd2hpbGUgcmV0cmlldmluZyBmaWxlcyBmcm9tIGFwcGxpY2F0aW9uIGNhY2hlLlxuICAgICAgICBpZiAoc3RhdHVzID09PSAwKSB7XG4gICAgICAgICAgc3RhdHVzID0gYm9keSA/IDIwMCA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzID0gSGVhZGVycy5mcm9tUmVzcG9uc2VIZWFkZXJTdHJpbmcoX3hoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gICAgICAgIC8vIElFIDkgZG9lcyBub3QgcHJvdmlkZSB0aGUgd2F5IHRvIGdldCBVUkwgb2YgcmVzcG9uc2VcbiAgICAgICAgY29uc3QgdXJsID0gZ2V0UmVzcG9uc2VVUkwoX3hocikgfHwgcmVxLnVybDtcbiAgICAgICAgY29uc3Qgc3RhdHVzVGV4dDogc3RyaW5nID0gX3hoci5zdGF0dXNUZXh0IHx8ICdPSyc7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlT3B0aW9ucyA9IG5ldyBSZXNwb25zZU9wdGlvbnMoe2JvZHksIHN0YXR1cywgaGVhZGVycywgc3RhdHVzVGV4dCwgdXJsfSk7XG4gICAgICAgIGlmIChiYXNlUmVzcG9uc2VPcHRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKTtcbiAgICAgICAgcmVzcG9uc2Uub2sgPSBpc1N1Y2Nlc3Moc3RhdHVzKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5uZXh0KHJlc3BvbnNlKTtcbiAgICAgICAgICAvLyBUT0RPKGdkaTIyOTApOiBkZWZlciBjb21wbGV0ZSBpZiBhcnJheSBidWZmZXIgdW50aWwgZG9uZVxuICAgICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5lcnJvcihyZXNwb25zZSk7XG4gICAgICB9O1xuICAgICAgLy8gZXJyb3IgZXZlbnQgaGFuZGxlclxuICAgICAgY29uc3Qgb25FcnJvciA9IChlcnI6IEVycm9yRXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHJlc3BvbnNlT3B0aW9ucyA9IG5ldyBSZXNwb25zZU9wdGlvbnMoe1xuICAgICAgICAgIGJvZHk6IGVycixcbiAgICAgICAgICB0eXBlOiBSZXNwb25zZVR5cGUuRXJyb3IsXG4gICAgICAgICAgc3RhdHVzOiBfeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiBfeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYmFzZVJlc3BvbnNlT3B0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgcmVzcG9uc2VPcHRpb25zID0gYmFzZVJlc3BvbnNlT3B0aW9ucy5tZXJnZShyZXNwb25zZU9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuZXJyb3IobmV3IFJlc3BvbnNlKHJlc3BvbnNlT3B0aW9ucykpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5zZXREZXRlY3RlZENvbnRlbnRUeXBlKHJlcSwgX3hocik7XG5cbiAgICAgIGlmIChyZXEuaGVhZGVycyA9PSBudWxsKSB7XG4gICAgICAgIHJlcS5oZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgIH1cbiAgICAgIGlmICghcmVxLmhlYWRlcnMuaGFzKCdBY2NlcHQnKSkge1xuICAgICAgICByZXEuaGVhZGVycy5hcHBlbmQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonKTtcbiAgICAgIH1cbiAgICAgIHJlcS5oZWFkZXJzLmZvckVhY2goKHZhbHVlcywgbmFtZSkgPT4gX3hoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUgISwgdmFsdWVzLmpvaW4oJywnKSkpO1xuXG4gICAgICAvLyBTZWxlY3QgdGhlIGNvcnJlY3QgYnVmZmVyIHR5cGUgdG8gc3RvcmUgdGhlIHJlc3BvbnNlXG4gICAgICBpZiAocmVxLnJlc3BvbnNlVHlwZSAhPSBudWxsICYmIF94aHIucmVzcG9uc2VUeXBlICE9IG51bGwpIHtcbiAgICAgICAgc3dpdGNoIChyZXEucmVzcG9uc2VUeXBlKSB7XG4gICAgICAgICAgY2FzZSBSZXNwb25zZUNvbnRlbnRUeXBlLkFycmF5QnVmZmVyOlxuICAgICAgICAgICAgX3hoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBSZXNwb25zZUNvbnRlbnRUeXBlLkpzb246XG4gICAgICAgICAgICBfeGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgUmVzcG9uc2VDb250ZW50VHlwZS5UZXh0OlxuICAgICAgICAgICAgX3hoci5yZXNwb25zZVR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFJlc3BvbnNlQ29udGVudFR5cGUuQmxvYjpcbiAgICAgICAgICAgIF94aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHNlbGVjdGVkIHJlc3BvbnNlVHlwZSBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX3hoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Mb2FkKTtcbiAgICAgIF94aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcblxuICAgICAgX3hoci5zZW5kKHRoaXMucmVxdWVzdC5nZXRCb2R5KCkpO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBfeGhyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuICAgICAgICBfeGhyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgICAgIF94aHIuYWJvcnQoKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBzZXREZXRlY3RlZENvbnRlbnRUeXBlKHJlcTogYW55IC8qKiBUT0RPIFJlcXVlc3QgKi8sIF94aHI6IGFueSAvKiogWE1MSHR0cFJlcXVlc3QgKi8pIHtcbiAgICAvLyBTa2lwIGlmIGEgY3VzdG9tIENvbnRlbnQtVHlwZSBoZWFkZXIgaXMgcHJvdmlkZWRcbiAgICBpZiAocmVxLmhlYWRlcnMgIT0gbnVsbCAmJiByZXEuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpICE9IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTZXQgdGhlIGRldGVjdGVkIGNvbnRlbnQgdHlwZVxuICAgIHN3aXRjaCAocmVxLmNvbnRlbnRUeXBlKSB7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlLk5PTkU6XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb250ZW50VHlwZS5KU09OOlxuICAgICAgICBfeGhyLnNldFJlcXVlc3RIZWFkZXIoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb250ZW50VHlwZS5GT1JNOlxuICAgICAgICBfeGhyLnNldFJlcXVlc3RIZWFkZXIoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29udGVudFR5cGUuVEVYVDpcbiAgICAgICAgX3hoci5zZXRSZXF1ZXN0SGVhZGVyKCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbicpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ29udGVudFR5cGUuQkxPQjpcbiAgICAgICAgY29uc3QgYmxvYiA9IHJlcS5ibG9iKCk7XG4gICAgICAgIGlmIChibG9iLnR5cGUpIHtcbiAgICAgICAgICBfeGhyLnNldFJlcXVlc3RIZWFkZXIoJ2NvbnRlbnQtdHlwZScsIGJsb2IudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYFhTUkZDb25maWd1cmF0aW9uYCBzZXRzIHVwIENyb3NzIFNpdGUgUmVxdWVzdCBGb3JnZXJ5IChYU1JGKSBwcm90ZWN0aW9uIGZvciB0aGUgYXBwbGljYXRpb25cbiAqIHVzaW5nIGEgY29va2llLiBTZWUgaHR0cHM6Ly93d3cub3dhc3Aub3JnL2luZGV4LnBocC9Dcm9zcy1TaXRlX1JlcXVlc3RfRm9yZ2VyeV8oQ1NSRilcbiAqIGZvciBtb3JlIGluZm9ybWF0aW9uIG9uIFhTUkYuXG4gKlxuICogQXBwbGljYXRpb25zIGNhbiBjb25maWd1cmUgY3VzdG9tIGNvb2tpZSBhbmQgaGVhZGVyIG5hbWVzIGJ5IGJpbmRpbmcgYW4gaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xuICogd2l0aCBkaWZmZXJlbnQgYGNvb2tpZU5hbWVgIGFuZCBgaGVhZGVyTmFtZWAgdmFsdWVzLiBTZWUgdGhlIG1haW4gSFRUUCBkb2N1bWVudGF0aW9uIGZvciBtb3JlXG4gKiBkZXRhaWxzLlxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5leHBvcnQgY2xhc3MgQ29va2llWFNSRlN0cmF0ZWd5IGltcGxlbWVudHMgWFNSRlN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jb29raWVOYW1lOiBzdHJpbmcgPSAnWFNSRi1UT0tFTicsIHByaXZhdGUgX2hlYWRlck5hbWU6IHN0cmluZyA9ICdYLVhTUkYtVE9LRU4nKSB7fVxuXG4gIGNvbmZpZ3VyZVJlcXVlc3QocmVxOiBSZXF1ZXN0KTogdm9pZCB7XG4gICAgY29uc3QgeHNyZlRva2VuID0gZ2V0RE9NKCkuZ2V0Q29va2llKHRoaXMuX2Nvb2tpZU5hbWUpO1xuICAgIGlmICh4c3JmVG9rZW4pIHtcbiAgICAgIHJlcS5oZWFkZXJzLnNldCh0aGlzLl9oZWFkZXJOYW1lLCB4c3JmVG9rZW4pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZXMge0BsaW5rIFhIUkNvbm5lY3Rpb259IGluc3RhbmNlcy5cbiAqXG4gKiBUaGlzIGNsYXNzIHdvdWxkIHR5cGljYWxseSBub3QgYmUgdXNlZCBieSBlbmQgdXNlcnMsIGJ1dCBjb3VsZCBiZVxuICogb3ZlcnJpZGRlbiBpZiBhIGRpZmZlcmVudCBiYWNrZW5kIGltcGxlbWVudGF0aW9uIHNob3VsZCBiZSB1c2VkLFxuICogc3VjaCBhcyBpbiBhIG5vZGUgYmFja2VuZC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtIdHRwLCBNeU5vZGVCYWNrZW5kLCBIVFRQX1BST1ZJREVSUywgQmFzZVJlcXVlc3RPcHRpb25zfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqIEBDb21wb25lbnQoe1xuICogICB2aWV3UHJvdmlkZXJzOiBbXG4gKiAgICAgSFRUUF9QUk9WSURFUlMsXG4gKiAgICAge3Byb3ZpZGU6IEh0dHAsIHVzZUZhY3Rvcnk6IChiYWNrZW5kLCBvcHRpb25zKSA9PiB7XG4gKiAgICAgICByZXR1cm4gbmV3IEh0dHAoYmFja2VuZCwgb3B0aW9ucyk7XG4gKiAgICAgfSwgZGVwczogW015Tm9kZUJhY2tlbmQsIEJhc2VSZXF1ZXN0T3B0aW9uc119XVxuICogfSlcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3IoaHR0cDpIdHRwKSB7XG4gKiAgICAgaHR0cC5yZXF1ZXN0KCdwZW9wbGUuanNvbicpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5wZW9wbGUgPSByZXMuanNvbigpKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFhIUkJhY2tlbmQgaW1wbGVtZW50cyBDb25uZWN0aW9uQmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYnJvd3NlclhIUjogQnJvd3NlclhociwgcHJpdmF0ZSBfYmFzZVJlc3BvbnNlT3B0aW9uczogUmVzcG9uc2VPcHRpb25zLFxuICAgICAgcHJpdmF0ZSBfeHNyZlN0cmF0ZWd5OiBYU1JGU3RyYXRlZ3kpIHt9XG5cbiAgY3JlYXRlQ29ubmVjdGlvbihyZXF1ZXN0OiBSZXF1ZXN0KTogWEhSQ29ubmVjdGlvbiB7XG4gICAgdGhpcy5feHNyZlN0cmF0ZWd5LmNvbmZpZ3VyZVJlcXVlc3QocmVxdWVzdCk7XG4gICAgcmV0dXJuIG5ldyBYSFJDb25uZWN0aW9uKHJlcXVlc3QsIHRoaXMuX2Jyb3dzZXJYSFIsIHRoaXMuX2Jhc2VSZXNwb25zZU9wdGlvbnMpO1xuICB9XG59XG4iXX0=
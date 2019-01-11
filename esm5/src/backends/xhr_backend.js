/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
import * as i0 from "@angular/core";
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
 * @publicApi
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
 * @publicApi
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
 * @usageNotes
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
 * @publicApi
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
    XHRBackend.ngInjectableDef = i0.defineInjectable({ token: XHRBackend, factory: function XHRBackend_Factory(t) { return new (t || XHRBackend)(i0.inject(BrowserXhr), i0.inject(ResponseOptions), i0.inject(XSRFStrategy)); }, providedIn: null });
    return XHRBackend;
}());
export { XHRBackend };
/*@__PURE__*/ i0.ɵsetClassMetadata(XHRBackend, [{
        type: Injectable
    }], function () { return [{
        type: BrowserXhr
    }, {
        type: ResponseOptions
    }, {
        type: XSRFStrategy
    }]; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyX2JhY2tlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9iYWNrZW5kcy94aHJfYmFja2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFDLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLFdBQVcsRUFBYyxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ25HLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFDLGNBQWMsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEQsT0FBTyxFQUFnQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRXpDLElBQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQztBQUVuQzs7Ozs7Ozs7OztHQVVHO0FBQ0g7SUFTRSx1QkFBWSxHQUFZLEVBQUUsVUFBc0IsRUFBRSxtQkFBcUM7UUFBdkYsaUJBNkdDO1FBNUdDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQVcsVUFBQyxnQkFBb0M7WUFDNUUsSUFBTSxJQUFJLEdBQW1CLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoRCxJQUFJ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QkFBcUMsRUFDdEUsYUFBMkI7UUFEM0IsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQWlCO1FBQ3RFLGtCQUFhLEdBQWIsYUFBYSxDQUFjO0lBQUcsQ0FBQztJQUUzQyxxQ0FBZ0IsR0FBaEIsVUFBaUIsT0FBZ0I7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7OERBUlUsVUFBVSw2REFBVixVQUFVLFlBRUksVUFBVSxhQUFnQyxlQUFlLGFBQ3ZELFlBQVk7cUJBOU96QztDQW9QQyxBQVZELElBVUM7U0FUWSxVQUFVO21DQUFWLFVBQVU7Y0FEdEIsVUFBVTs7Y0FHZ0IsVUFBVTs7Y0FBZ0MsZUFBZTs7Y0FDdkQsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ybVnZXRET00gYXMgZ2V0RE9NfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgT2JzZXJ2ZXJ9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtSZXNwb25zZU9wdGlvbnN9IGZyb20gJy4uL2Jhc2VfcmVzcG9uc2Vfb3B0aW9ucyc7XG5pbXBvcnQge0NvbnRlbnRUeXBlLCBSZWFkeVN0YXRlLCBSZXF1ZXN0TWV0aG9kLCBSZXNwb25zZUNvbnRlbnRUeXBlLCBSZXNwb25zZVR5cGV9IGZyb20gJy4uL2VudW1zJztcbmltcG9ydCB7SGVhZGVyc30gZnJvbSAnLi4vaGVhZGVycyc7XG5pbXBvcnQge2dldFJlc3BvbnNlVVJMLCBpc1N1Y2Nlc3N9IGZyb20gJy4uL2h0dHBfdXRpbHMnO1xuaW1wb3J0IHtDb25uZWN0aW9uLCBDb25uZWN0aW9uQmFja2VuZCwgWFNSRlN0cmF0ZWd5fSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7UmVxdWVzdH0gZnJvbSAnLi4vc3RhdGljX3JlcXVlc3QnO1xuaW1wb3J0IHtSZXNwb25zZX0gZnJvbSAnLi4vc3RhdGljX3Jlc3BvbnNlJztcbmltcG9ydCB7QnJvd3Nlclhocn0gZnJvbSAnLi9icm93c2VyX3hocic7XG5cbmNvbnN0IFhTU0lfUFJFRklYID0gL15cXClcXF1cXH0nLD9cXG4vO1xuXG4vKipcbiAqIENyZWF0ZXMgY29ubmVjdGlvbnMgdXNpbmcgYFhNTEh0dHBSZXF1ZXN0YC4gR2l2ZW4gYSBmdWxseS1xdWFsaWZpZWRcbiAqIHJlcXVlc3QsIGFuIGBYSFJDb25uZWN0aW9uYCB3aWxsIGltbWVkaWF0ZWx5IGNyZWF0ZSBhbiBgWE1MSHR0cFJlcXVlc3RgIG9iamVjdCBhbmQgc2VuZCB0aGVcbiAqIHJlcXVlc3QuXG4gKlxuICogVGhpcyBjbGFzcyB3b3VsZCB0eXBpY2FsbHkgbm90IGJlIGNyZWF0ZWQgb3IgaW50ZXJhY3RlZCB3aXRoIGRpcmVjdGx5IGluc2lkZSBhcHBsaWNhdGlvbnMsIHRob3VnaFxuICogdGhlIHtAbGluayBNb2NrQ29ubmVjdGlvbn0gbWF5IGJlIGludGVyYWN0ZWQgd2l0aCBpbiB0ZXN0cy5cbiAqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIFhIUkNvbm5lY3Rpb24gaW1wbGVtZW50cyBDb25uZWN0aW9uIHtcbiAgcmVxdWVzdDogUmVxdWVzdDtcbiAgLyoqXG4gICAqIFJlc3BvbnNlIHtAbGluayBFdmVudEVtaXR0ZXJ9IHdoaWNoIGVtaXRzIGEgc2luZ2xlIHtAbGluayBSZXNwb25zZX0gdmFsdWUgb24gbG9hZCBldmVudCBvZlxuICAgKiBgWE1MSHR0cFJlcXVlc3RgLlxuICAgKi9cbiAgcmVzcG9uc2U6IE9ic2VydmFibGU8UmVzcG9uc2U+O1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcmVhZHlTdGF0ZSAhOiBSZWFkeVN0YXRlO1xuICBjb25zdHJ1Y3RvcihyZXE6IFJlcXVlc3QsIGJyb3dzZXJYSFI6IEJyb3dzZXJYaHIsIGJhc2VSZXNwb25zZU9wdGlvbnM/OiBSZXNwb25zZU9wdGlvbnMpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSByZXE7XG4gICAgdGhpcy5yZXNwb25zZSA9IG5ldyBPYnNlcnZhYmxlPFJlc3BvbnNlPigocmVzcG9uc2VPYnNlcnZlcjogT2JzZXJ2ZXI8UmVzcG9uc2U+KSA9PiB7XG4gICAgICBjb25zdCBfeGhyOiBYTUxIdHRwUmVxdWVzdCA9IGJyb3dzZXJYSFIuYnVpbGQoKTtcbiAgICAgIF94aHIub3BlbihSZXF1ZXN0TWV0aG9kW3JlcS5tZXRob2RdLnRvVXBwZXJDYXNlKCksIHJlcS51cmwpO1xuICAgICAgaWYgKHJlcS53aXRoQ3JlZGVudGlhbHMgIT0gbnVsbCkge1xuICAgICAgICBfeGhyLndpdGhDcmVkZW50aWFscyA9IHJlcS53aXRoQ3JlZGVudGlhbHM7XG4gICAgICB9XG4gICAgICAvLyBsb2FkIGV2ZW50IGhhbmRsZXJcbiAgICAgIGNvbnN0IG9uTG9hZCA9ICgpID0+IHtcbiAgICAgICAgLy8gbm9ybWFsaXplIElFOSBidWcgKGh0dHA6Ly9idWdzLmpxdWVyeS5jb20vdGlja2V0LzE0NTApXG4gICAgICAgIGxldCBzdGF0dXM6IG51bWJlciA9IF94aHIuc3RhdHVzID09PSAxMjIzID8gMjA0IDogX3hoci5zdGF0dXM7XG5cbiAgICAgICAgbGV0IGJvZHk6IGFueSA9IG51bGw7XG5cbiAgICAgICAgLy8gSFRUUCAyMDQgbWVhbnMgbm8gY29udGVudFxuICAgICAgICBpZiAoc3RhdHVzICE9PSAyMDQpIHtcbiAgICAgICAgICAvLyByZXNwb25zZVRleHQgaXMgdGhlIG9sZC1zY2hvb2wgd2F5IG9mIHJldHJpZXZpbmcgcmVzcG9uc2UgKHN1cHBvcnRlZCBieSBJRTggJiA5KVxuICAgICAgICAgIC8vIHJlc3BvbnNlL3Jlc3BvbnNlVHlwZSBwcm9wZXJ0aWVzIHdlcmUgaW50cm9kdWNlZCBpbiBSZXNvdXJjZUxvYWRlciBMZXZlbDIgc3BlY1xuICAgICAgICAgIC8vIChzdXBwb3J0ZWQgYnkgSUUxMClcbiAgICAgICAgICBib2R5ID0gKHR5cGVvZiBfeGhyLnJlc3BvbnNlID09PSAndW5kZWZpbmVkJykgPyBfeGhyLnJlc3BvbnNlVGV4dCA6IF94aHIucmVzcG9uc2U7XG5cbiAgICAgICAgICAvLyBJbXBsaWNpdGx5IHN0cmlwIGEgcG90ZW50aWFsIFhTU0kgcHJlZml4LlxuICAgICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGJvZHkgPSBib2R5LnJlcGxhY2UoWFNTSV9QUkVGSVgsICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXggc3RhdHVzIGNvZGUgd2hlbiBpdCBpcyAwICgwIHN0YXR1cyBpcyB1bmRvY3VtZW50ZWQpLlxuICAgICAgICAvLyBPY2N1cnMgd2hlbiBhY2Nlc3NpbmcgZmlsZSByZXNvdXJjZXMgb3Igb24gQW5kcm9pZCA0LjEgc3RvY2sgYnJvd3NlclxuICAgICAgICAvLyB3aGlsZSByZXRyaWV2aW5nIGZpbGVzIGZyb20gYXBwbGljYXRpb24gY2FjaGUuXG4gICAgICAgIGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICBzdGF0dXMgPSBib2R5ID8gMjAwIDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhlYWRlcnM6IEhlYWRlcnMgPSBIZWFkZXJzLmZyb21SZXNwb25zZUhlYWRlclN0cmluZyhfeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgICAgICAgLy8gSUUgOSBkb2VzIG5vdCBwcm92aWRlIHRoZSB3YXkgdG8gZ2V0IFVSTCBvZiByZXNwb25zZVxuICAgICAgICBjb25zdCB1cmwgPSBnZXRSZXNwb25zZVVSTChfeGhyKSB8fCByZXEudXJsO1xuICAgICAgICBjb25zdCBzdGF0dXNUZXh0OiBzdHJpbmcgPSBfeGhyLnN0YXR1c1RleHQgfHwgJ09LJztcblxuICAgICAgICBsZXQgcmVzcG9uc2VPcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keSwgc3RhdHVzLCBoZWFkZXJzLCBzdGF0dXNUZXh0LCB1cmx9KTtcbiAgICAgICAgaWYgKGJhc2VSZXNwb25zZU9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgIHJlc3BvbnNlT3B0aW9ucyA9IGJhc2VSZXNwb25zZU9wdGlvbnMubWVyZ2UocmVzcG9uc2VPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZShyZXNwb25zZU9wdGlvbnMpO1xuICAgICAgICByZXNwb25zZS5vayA9IGlzU3VjY2VzcyhzdGF0dXMpO1xuICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICByZXNwb25zZU9ic2VydmVyLm5leHQocmVzcG9uc2UpO1xuICAgICAgICAgIC8vIFRPRE8oZ2RpMjI5MCk6IGRlZmVyIGNvbXBsZXRlIGlmIGFycmF5IGJ1ZmZlciB1bnRpbCBkb25lXG4gICAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNwb25zZU9ic2VydmVyLmVycm9yKHJlc3BvbnNlKTtcbiAgICAgIH07XG4gICAgICAvLyBlcnJvciBldmVudCBoYW5kbGVyXG4gICAgICBjb25zdCBvbkVycm9yID0gKGVycjogRXJyb3JFdmVudCkgPT4ge1xuICAgICAgICBsZXQgcmVzcG9uc2VPcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7XG4gICAgICAgICAgYm9keTogZXJyLFxuICAgICAgICAgIHR5cGU6IFJlc3BvbnNlVHlwZS5FcnJvcixcbiAgICAgICAgICBzdGF0dXM6IF94aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IF94aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChiYXNlUmVzcG9uc2VPcHRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2VPYnNlcnZlci5lcnJvcihuZXcgUmVzcG9uc2UocmVzcG9uc2VPcHRpb25zKSk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNldERldGVjdGVkQ29udGVudFR5cGUocmVxLCBfeGhyKTtcblxuICAgICAgaWYgKHJlcS5oZWFkZXJzID09IG51bGwpIHtcbiAgICAgICAgcmVxLmhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgfVxuICAgICAgaWYgKCFyZXEuaGVhZGVycy5oYXMoJ0FjY2VwdCcpKSB7XG4gICAgICAgIHJlcS5oZWFkZXJzLmFwcGVuZCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKicpO1xuICAgICAgfVxuICAgICAgcmVxLmhlYWRlcnMuZm9yRWFjaCgodmFsdWVzLCBuYW1lKSA9PiBfeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSAhLCB2YWx1ZXMuam9pbignLCcpKSk7XG5cbiAgICAgIC8vIFNlbGVjdCB0aGUgY29ycmVjdCBidWZmZXIgdHlwZSB0byBzdG9yZSB0aGUgcmVzcG9uc2VcbiAgICAgIGlmIChyZXEucmVzcG9uc2VUeXBlICE9IG51bGwgJiYgX3hoci5yZXNwb25zZVR5cGUgIT0gbnVsbCkge1xuICAgICAgICBzd2l0Y2ggKHJlcS5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICBjYXNlIFJlc3BvbnNlQ29udGVudFR5cGUuQXJyYXlCdWZmZXI6XG4gICAgICAgICAgICBfeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFJlc3BvbnNlQ29udGVudFR5cGUuSnNvbjpcbiAgICAgICAgICAgIF94aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBSZXNwb25zZUNvbnRlbnRUeXBlLlRleHQ6XG4gICAgICAgICAgICBfeGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgUmVzcG9uc2VDb250ZW50VHlwZS5CbG9iOlxuICAgICAgICAgICAgX3hoci5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgc2VsZWN0ZWQgcmVzcG9uc2VUeXBlIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuICAgICAgX3hoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuXG4gICAgICBfeGhyLnNlbmQodGhpcy5yZXF1ZXN0LmdldEJvZHkoKSk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIF94aHIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIG9uTG9hZCk7XG4gICAgICAgIF94aHIucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgX3hoci5hYm9ydCgpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldERldGVjdGVkQ29udGVudFR5cGUocmVxOiBhbnkgLyoqIFRPRE8gUmVxdWVzdCAqLywgX3hocjogYW55IC8qKiBYTUxIdHRwUmVxdWVzdCAqLykge1xuICAgIC8vIFNraXAgaWYgYSBjdXN0b20gQ29udGVudC1UeXBlIGhlYWRlciBpcyBwcm92aWRlZFxuICAgIGlmIChyZXEuaGVhZGVycyAhPSBudWxsICYmIHJlcS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgZGV0ZWN0ZWQgY29udGVudCB0eXBlXG4gICAgc3dpdGNoIChyZXEuY29udGVudFR5cGUpIHtcbiAgICAgIGNhc2UgQ29udGVudFR5cGUuTk9ORTpcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlLkpTT046XG4gICAgICAgIF94aHIuc2V0UmVxdWVzdEhlYWRlcignY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENvbnRlbnRUeXBlLkZPUk06XG4gICAgICAgIF94aHIuc2V0UmVxdWVzdEhlYWRlcignY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb250ZW50VHlwZS5URVhUOlxuICAgICAgICBfeGhyLnNldFJlcXVlc3RIZWFkZXIoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDb250ZW50VHlwZS5CTE9COlxuICAgICAgICBjb25zdCBibG9iID0gcmVxLmJsb2IoKTtcbiAgICAgICAgaWYgKGJsb2IudHlwZSkge1xuICAgICAgICAgIF94aHIuc2V0UmVxdWVzdEhlYWRlcignY29udGVudC10eXBlJywgYmxvYi50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBgWFNSRkNvbmZpZ3VyYXRpb25gIHNldHMgdXAgQ3Jvc3MgU2l0ZSBSZXF1ZXN0IEZvcmdlcnkgKFhTUkYpIHByb3RlY3Rpb24gZm9yIHRoZSBhcHBsaWNhdGlvblxuICogdXNpbmcgYSBjb29raWUuIFNlZSBodHRwczovL3d3dy5vd2FzcC5vcmcvaW5kZXgucGhwL0Nyb3NzLVNpdGVfUmVxdWVzdF9Gb3JnZXJ5XyhDU1JGKVxuICogZm9yIG1vcmUgaW5mb3JtYXRpb24gb24gWFNSRi5cbiAqXG4gKiBBcHBsaWNhdGlvbnMgY2FuIGNvbmZpZ3VyZSBjdXN0b20gY29va2llIGFuZCBoZWFkZXIgbmFtZXMgYnkgYmluZGluZyBhbiBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzXG4gKiB3aXRoIGRpZmZlcmVudCBgY29va2llTmFtZWAgYW5kIGBoZWFkZXJOYW1lYCB2YWx1ZXMuIFNlZSB0aGUgbWFpbiBIVFRQIGRvY3VtZW50YXRpb24gZm9yIG1vcmVcbiAqIGRldGFpbHMuXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBDb29raWVYU1JGU3RyYXRlZ3kgaW1wbGVtZW50cyBYU1JGU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2Nvb2tpZU5hbWU6IHN0cmluZyA9ICdYU1JGLVRPS0VOJywgcHJpdmF0ZSBfaGVhZGVyTmFtZTogc3RyaW5nID0gJ1gtWFNSRi1UT0tFTicpIHt9XG5cbiAgY29uZmlndXJlUmVxdWVzdChyZXE6IFJlcXVlc3QpOiB2b2lkIHtcbiAgICBjb25zdCB4c3JmVG9rZW4gPSBnZXRET00oKS5nZXRDb29raWUodGhpcy5fY29va2llTmFtZSk7XG4gICAgaWYgKHhzcmZUb2tlbikge1xuICAgICAgcmVxLmhlYWRlcnMuc2V0KHRoaXMuX2hlYWRlck5hbWUsIHhzcmZUb2tlbik7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlcyB7QGxpbmsgWEhSQ29ubmVjdGlvbn0gaW5zdGFuY2VzLlxuICpcbiAqIFRoaXMgY2xhc3Mgd291bGQgdHlwaWNhbGx5IG5vdCBiZSB1c2VkIGJ5IGVuZCB1c2VycywgYnV0IGNvdWxkIGJlXG4gKiBvdmVycmlkZGVuIGlmIGEgZGlmZmVyZW50IGJhY2tlbmQgaW1wbGVtZW50YXRpb24gc2hvdWxkIGJlIHVzZWQsXG4gKiBzdWNoIGFzIGluIGEgbm9kZSBiYWNrZW5kLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtIdHRwLCBNeU5vZGVCYWNrZW5kLCBIVFRQX1BST1ZJREVSUywgQmFzZVJlcXVlc3RPcHRpb25zfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqIEBDb21wb25lbnQoe1xuICogICB2aWV3UHJvdmlkZXJzOiBbXG4gKiAgICAgSFRUUF9QUk9WSURFUlMsXG4gKiAgICAge3Byb3ZpZGU6IEh0dHAsIHVzZUZhY3Rvcnk6IChiYWNrZW5kLCBvcHRpb25zKSA9PiB7XG4gKiAgICAgICByZXR1cm4gbmV3IEh0dHAoYmFja2VuZCwgb3B0aW9ucyk7XG4gKiAgICAgfSwgZGVwczogW015Tm9kZUJhY2tlbmQsIEJhc2VSZXF1ZXN0T3B0aW9uc119XVxuICogfSlcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3IoaHR0cDpIdHRwKSB7XG4gKiAgICAgaHR0cC5yZXF1ZXN0KCdwZW9wbGUuanNvbicpLnN1YnNjcmliZShyZXMgPT4gdGhpcy5wZW9wbGUgPSByZXMuanNvbigpKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFhIUkJhY2tlbmQgaW1wbGVtZW50cyBDb25uZWN0aW9uQmFja2VuZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfYnJvd3NlclhIUjogQnJvd3NlclhociwgcHJpdmF0ZSBfYmFzZVJlc3BvbnNlT3B0aW9uczogUmVzcG9uc2VPcHRpb25zLFxuICAgICAgcHJpdmF0ZSBfeHNyZlN0cmF0ZWd5OiBYU1JGU3RyYXRlZ3kpIHt9XG5cbiAgY3JlYXRlQ29ubmVjdGlvbihyZXF1ZXN0OiBSZXF1ZXN0KTogWEhSQ29ubmVjdGlvbiB7XG4gICAgdGhpcy5feHNyZlN0cmF0ZWd5LmNvbmZpZ3VyZVJlcXVlc3QocmVxdWVzdCk7XG4gICAgcmV0dXJuIG5ldyBYSFJDb25uZWN0aW9uKHJlcXVlc3QsIHRoaXMuX2Jyb3dzZXJYSFIsIHRoaXMuX2Jhc2VSZXNwb25zZU9wdGlvbnMpO1xuICB9XG59XG4iXX0=
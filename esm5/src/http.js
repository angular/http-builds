/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { RequestOptions } from './base_request_options';
import { RequestMethod } from './enums';
import { ConnectionBackend } from './interfaces';
import { Request } from './static_request';
function httpRequest(backend, request) {
    return backend.createConnection(request).response;
}
function mergeOptions(defaultOpts, providedOpts, method, url) {
    var newOptions = defaultOpts;
    if (providedOpts) {
        // Hack so Dart can used named parameters
        return newOptions.merge(new RequestOptions({
            method: providedOpts.method || method,
            url: providedOpts.url || url,
            search: providedOpts.search,
            params: providedOpts.params,
            headers: providedOpts.headers,
            body: providedOpts.body,
            withCredentials: providedOpts.withCredentials,
            responseType: providedOpts.responseType
        }));
    }
    return newOptions.merge(new RequestOptions({ method: method, url: url }));
}
/**
 * Performs http requests using `XMLHttpRequest` as the default backend.
 *
 * `Http` is available as an injectable class, with methods to perform http requests. Calling
 * `request` returns an `Observable` which will emit a single {@link Response} when a
 * response is received.
 *
 * ### Example
 *
 * ```typescript
 * import {Http, HTTP_PROVIDERS} from '@angular/http';
 * import {map} from 'rxjs/operators';
 *
 * @Component({
 *   selector: 'http-app',
 *   viewProviders: [HTTP_PROVIDERS],
 *   templateUrl: 'people.html'
 * })
 * class PeopleComponent {
 *   constructor(http: Http) {
 *     http.get('people.json')
 *       // Call map on the response observable to get the parsed people object
 *       .pipe(map(res => res.json()))
 *       // Subscribe to the observable to get the parsed people object and attach it to the
 *       // component
 *       .subscribe(people => this.people = people);
 *   }
 * }
 * ```
 *
 *
 * ### Example
 *
 * ```
 * http.get('people.json').subscribe((res:Response) => this.people = res.json());
 * ```
 *
 * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
 * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
 * the {@link XHRBackend} provider, as in the following example:
 *
 * ### Example
 *
 * ```typescript
 * import {BaseRequestOptions, Http} from '@angular/http';
 * import {MockBackend} from '@angular/http/testing';
 * var injector = Injector.resolveAndCreate([
 *   BaseRequestOptions,
 *   MockBackend,
 *   {provide: Http, useFactory:
 *       function(backend, defaultOptions) {
 *         return new Http(backend, defaultOptions);
 *       },
 *       deps: [MockBackend, BaseRequestOptions]}
 * ]);
 * var http = injector.get(Http);
 * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 */
var Http = /** @class */ (function () {
    function Http(_backend, _defaultOptions) {
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     */
    /**
       * Performs any type of http request. First argument is required, and can either be a url or
       * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
       * object can be provided as the 2nd argument. The options object will be merged with the values
       * of {@link BaseRequestOptions} before performing the request.
       */
    Http.prototype.request = /**
       * Performs any type of http request. First argument is required, and can either be a url or
       * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
       * object can be provided as the 2nd argument. The options object will be merged with the values
       * of {@link BaseRequestOptions} before performing the request.
       */
    function (url, options) {
        var responseObservable;
        if (typeof url === 'string') {
            responseObservable = httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
        }
        else if (url instanceof Request) {
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    /**
     * Performs a request with `get` http method.
     */
    /**
       * Performs a request with `get` http method.
       */
    Http.prototype.get = /**
       * Performs a request with `get` http method.
       */
    function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
    };
    /**
     * Performs a request with `post` http method.
     */
    /**
       * Performs a request with `post` http method.
       */
    Http.prototype.post = /**
       * Performs a request with `post` http method.
       */
    function (url, body, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Post, url)));
    };
    /**
     * Performs a request with `put` http method.
     */
    /**
       * Performs a request with `put` http method.
       */
    Http.prototype.put = /**
       * Performs a request with `put` http method.
       */
    function (url, body, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Put, url)));
    };
    /**
     * Performs a request with `delete` http method.
     */
    /**
       * Performs a request with `delete` http method.
       */
    Http.prototype.delete = /**
       * Performs a request with `delete` http method.
       */
    function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Delete, url)));
    };
    /**
     * Performs a request with `patch` http method.
     */
    /**
       * Performs a request with `patch` http method.
       */
    Http.prototype.patch = /**
       * Performs a request with `patch` http method.
       */
    function (url, body, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Patch, url)));
    };
    /**
     * Performs a request with `head` http method.
     */
    /**
       * Performs a request with `head` http method.
       */
    Http.prototype.head = /**
       * Performs a request with `head` http method.
       */
    function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Head, url)));
    };
    /**
     * Performs a request with `options` http method.
     */
    /**
       * Performs a request with `options` http method.
       */
    Http.prototype.options = /**
       * Performs a request with `options` http method.
       */
    function (url, options) {
        return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Options, url)));
    };
    Http.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Http.ctorParameters = function () { return [
        { type: ConnectionBackend, },
        { type: RequestOptions, },
    ]; };
    return Http;
}());
export { Http };
/**
 * @deprecated see https://angular.io/guide/http
 */
var Jsonp = /** @class */ (function (_super) {
    tslib_1.__extends(Jsonp, _super);
    function Jsonp(backend, defaultOptions) {
        return _super.call(this, backend, defaultOptions) || this;
    }
    /**
     * Performs any type of http request. First argument is required, and can either be a url or
     * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
     * object can be provided as the 2nd argument. The options object will be merged with the values
     * of {@link BaseRequestOptions} before performing the request.
     *
     * @security Regular XHR is the safest alternative to JSONP for most applications, and is
     * supported by all current browsers. Because JSONP creates a `<script>` element with
     * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
     * source could expose your application to XSS risks. Data exposed by JSONP may also be
     * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
     * future security issues (e.g. content sniffing).  For more detail, see the
     * [Security Guide](http://g.co/ng/security).
     */
    /**
       * Performs any type of http request. First argument is required, and can either be a url or
       * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
       * object can be provided as the 2nd argument. The options object will be merged with the values
       * of {@link BaseRequestOptions} before performing the request.
       *
       * @security Regular XHR is the safest alternative to JSONP for most applications, and is
       * supported by all current browsers. Because JSONP creates a `<script>` element with
       * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
       * source could expose your application to XSS risks. Data exposed by JSONP may also be
       * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
       * future security issues (e.g. content sniffing).  For more detail, see the
       * [Security Guide](http://g.co/ng/security).
       */
    Jsonp.prototype.request = /**
       * Performs any type of http request. First argument is required, and can either be a url or
       * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
       * object can be provided as the 2nd argument. The options object will be merged with the values
       * of {@link BaseRequestOptions} before performing the request.
       *
       * @security Regular XHR is the safest alternative to JSONP for most applications, and is
       * supported by all current browsers. Because JSONP creates a `<script>` element with
       * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
       * source could expose your application to XSS risks. Data exposed by JSONP may also be
       * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
       * future security issues (e.g. content sniffing).  For more detail, see the
       * [Security Guide](http://g.co/ng/security).
       */
    function (url, options) {
        var responseObservable;
        if (typeof url === 'string') {
            url =
                new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url));
        }
        if (url instanceof Request) {
            if (url.method !== RequestMethod.Get) {
                throw new Error('JSONP requests must use GET request method.');
            }
            responseObservable = httpRequest(this._backend, url);
        }
        else {
            throw new Error('First argument must be a url string or Request instance.');
        }
        return responseObservable;
    };
    Jsonp.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Jsonp.ctorParameters = function () { return [
        { type: ConnectionBackend, },
        { type: RequestOptions, },
    ]; };
    return Jsonp;
}(Http));
export { Jsonp };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2h0dHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDLE9BQU8sRUFBcUIsY0FBYyxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUN0QyxPQUFPLEVBQUMsaUJBQWlCLEVBQWtDLE1BQU0sY0FBYyxDQUFDO0FBQ2hGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUd6QyxxQkFBcUIsT0FBMEIsRUFBRSxPQUFnQjtJQUMvRCxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztDQUNuRDtBQUVELHNCQUNJLFdBQStCLEVBQUUsWUFBNEMsRUFDN0UsTUFBcUIsRUFBRSxHQUFXO0lBQ3BDLElBQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQztJQUMvQixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztRQUVqQixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLGNBQWMsQ0FBQztZQUN6QyxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sSUFBSSxNQUFNO1lBQ3JDLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRyxJQUFJLEdBQUc7WUFDNUIsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNO1lBQzNCLE1BQU0sRUFBRSxZQUFZLENBQUMsTUFBTTtZQUMzQixPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU87WUFDN0IsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO1lBQ3ZCLGVBQWUsRUFBRSxZQUFZLENBQUMsZUFBZTtZQUM3QyxZQUFZLEVBQUUsWUFBWSxDQUFDLFlBQVk7U0FD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LENBQUMsQ0FBQztZQUM1QixHQUFHO2dCQUNDLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxFQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDOUY7UUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7YUFDaEU7WUFDRCxrQkFBa0IsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0RDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1NBQzdFO1FBQ0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0tBQzNCOztnQkFuQ0YsVUFBVTs7OztnQkFsTEgsaUJBQWlCO2dCQUZHLGNBQWM7O2dCQVgxQztFQWdNMkIsSUFBSTtTQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtCYXNlUmVxdWVzdE9wdGlvbnMsIFJlcXVlc3RPcHRpb25zfSBmcm9tICcuL2Jhc2VfcmVxdWVzdF9vcHRpb25zJztcbmltcG9ydCB7UmVxdWVzdE1ldGhvZH0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge0Nvbm5lY3Rpb25CYWNrZW5kLCBSZXF1ZXN0QXJncywgUmVxdWVzdE9wdGlvbnNBcmdzfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtSZXF1ZXN0fSBmcm9tICcuL3N0YXRpY19yZXF1ZXN0JztcbmltcG9ydCB7UmVzcG9uc2V9IGZyb20gJy4vc3RhdGljX3Jlc3BvbnNlJztcblxuZnVuY3Rpb24gaHR0cFJlcXVlc3QoYmFja2VuZDogQ29ubmVjdGlvbkJhY2tlbmQsIHJlcXVlc3Q6IFJlcXVlc3QpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gIHJldHVybiBiYWNrZW5kLmNyZWF0ZUNvbm5lY3Rpb24ocmVxdWVzdCkucmVzcG9uc2U7XG59XG5cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhcbiAgICBkZWZhdWx0T3B0czogQmFzZVJlcXVlc3RPcHRpb25zLCBwcm92aWRlZE9wdHM6IFJlcXVlc3RPcHRpb25zQXJncyB8IHVuZGVmaW5lZCxcbiAgICBtZXRob2Q6IFJlcXVlc3RNZXRob2QsIHVybDogc3RyaW5nKTogUmVxdWVzdEFyZ3Mge1xuICBjb25zdCBuZXdPcHRpb25zID0gZGVmYXVsdE9wdHM7XG4gIGlmIChwcm92aWRlZE9wdHMpIHtcbiAgICAvLyBIYWNrIHNvIERhcnQgY2FuIHVzZWQgbmFtZWQgcGFyYW1ldGVyc1xuICAgIHJldHVybiBuZXdPcHRpb25zLm1lcmdlKG5ldyBSZXF1ZXN0T3B0aW9ucyh7XG4gICAgICBtZXRob2Q6IHByb3ZpZGVkT3B0cy5tZXRob2QgfHwgbWV0aG9kLFxuICAgICAgdXJsOiBwcm92aWRlZE9wdHMudXJsIHx8IHVybCxcbiAgICAgIHNlYXJjaDogcHJvdmlkZWRPcHRzLnNlYXJjaCxcbiAgICAgIHBhcmFtczogcHJvdmlkZWRPcHRzLnBhcmFtcyxcbiAgICAgIGhlYWRlcnM6IHByb3ZpZGVkT3B0cy5oZWFkZXJzLFxuICAgICAgYm9keTogcHJvdmlkZWRPcHRzLmJvZHksXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6IHByb3ZpZGVkT3B0cy53aXRoQ3JlZGVudGlhbHMsXG4gICAgICByZXNwb25zZVR5cGU6IHByb3ZpZGVkT3B0cy5yZXNwb25zZVR5cGVcbiAgICB9KSkgYXMgUmVxdWVzdEFyZ3M7XG4gIH1cblxuICByZXR1cm4gbmV3T3B0aW9ucy5tZXJnZShuZXcgUmVxdWVzdE9wdGlvbnMoe21ldGhvZCwgdXJsfSkpIGFzIFJlcXVlc3RBcmdzO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGh0dHAgcmVxdWVzdHMgdXNpbmcgYFhNTEh0dHBSZXF1ZXN0YCBhcyB0aGUgZGVmYXVsdCBiYWNrZW5kLlxuICpcbiAqIGBIdHRwYCBpcyBhdmFpbGFibGUgYXMgYW4gaW5qZWN0YWJsZSBjbGFzcywgd2l0aCBtZXRob2RzIHRvIHBlcmZvcm0gaHR0cCByZXF1ZXN0cy4gQ2FsbGluZ1xuICogYHJlcXVlc3RgIHJldHVybnMgYW4gYE9ic2VydmFibGVgIHdoaWNoIHdpbGwgZW1pdCBhIHNpbmdsZSB7QGxpbmsgUmVzcG9uc2V9IHdoZW4gYVxuICogcmVzcG9uc2UgaXMgcmVjZWl2ZWQuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge0h0dHAsIEhUVFBfUFJPVklERVJTfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqIGltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnaHR0cC1hcHAnLFxuICogICB2aWV3UHJvdmlkZXJzOiBbSFRUUF9QUk9WSURFUlNdLFxuICogICB0ZW1wbGF0ZVVybDogJ3Blb3BsZS5odG1sJ1xuICogfSlcbiAqIGNsYXNzIFBlb3BsZUNvbXBvbmVudCB7XG4gKiAgIGNvbnN0cnVjdG9yKGh0dHA6IEh0dHApIHtcbiAqICAgICBodHRwLmdldCgncGVvcGxlLmpzb24nKVxuICogICAgICAgLy8gQ2FsbCBtYXAgb24gdGhlIHJlc3BvbnNlIG9ic2VydmFibGUgdG8gZ2V0IHRoZSBwYXJzZWQgcGVvcGxlIG9iamVjdFxuICogICAgICAgLnBpcGUobWFwKHJlcyA9PiByZXMuanNvbigpKSlcbiAqICAgICAgIC8vIFN1YnNjcmliZSB0byB0aGUgb2JzZXJ2YWJsZSB0byBnZXQgdGhlIHBhcnNlZCBwZW9wbGUgb2JqZWN0IGFuZCBhdHRhY2ggaXQgdG8gdGhlXG4gKiAgICAgICAvLyBjb21wb25lbnRcbiAqICAgICAgIC5zdWJzY3JpYmUocGVvcGxlID0+IHRoaXMucGVvcGxlID0gcGVvcGxlKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBodHRwLmdldCgncGVvcGxlLmpzb24nKS5zdWJzY3JpYmUoKHJlczpSZXNwb25zZSkgPT4gdGhpcy5wZW9wbGUgPSByZXMuanNvbigpKTtcbiAqIGBgYFxuICpcbiAqIFRoZSBkZWZhdWx0IGNvbnN0cnVjdCB1c2VkIHRvIHBlcmZvcm0gcmVxdWVzdHMsIGBYTUxIdHRwUmVxdWVzdGAsIGlzIGFic3RyYWN0ZWQgYXMgYSBcIkJhY2tlbmRcIiAoXG4gKiB7QGxpbmsgWEhSQmFja2VuZH0gaW4gdGhpcyBjYXNlKSwgd2hpY2ggY291bGQgYmUgbW9ja2VkIHdpdGggZGVwZW5kZW5jeSBpbmplY3Rpb24gYnkgcmVwbGFjaW5nXG4gKiB0aGUge0BsaW5rIFhIUkJhY2tlbmR9IHByb3ZpZGVyLCBhcyBpbiB0aGUgZm9sbG93aW5nIGV4YW1wbGU6XG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgSHR0cH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKiBpbXBvcnQge01vY2tCYWNrZW5kfSBmcm9tICdAYW5ndWxhci9odHRwL3Rlc3RpbmcnO1xuICogdmFyIGluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShbXG4gKiAgIEJhc2VSZXF1ZXN0T3B0aW9ucyxcbiAqICAgTW9ja0JhY2tlbmQsXG4gKiAgIHtwcm92aWRlOiBIdHRwLCB1c2VGYWN0b3J5OlxuICogICAgICAgZnVuY3Rpb24oYmFja2VuZCwgZGVmYXVsdE9wdGlvbnMpIHtcbiAqICAgICAgICAgcmV0dXJuIG5ldyBIdHRwKGJhY2tlbmQsIGRlZmF1bHRPcHRpb25zKTtcbiAqICAgICAgIH0sXG4gKiAgICAgICBkZXBzOiBbTW9ja0JhY2tlbmQsIEJhc2VSZXF1ZXN0T3B0aW9uc119XG4gKiBdKTtcbiAqIHZhciBodHRwID0gaW5qZWN0b3IuZ2V0KEh0dHApO1xuICogaHR0cC5nZXQoJ3JlcXVlc3QtZnJvbS1tb2NrLWJhY2tlbmQuanNvbicpLnN1YnNjcmliZSgocmVzOlJlc3BvbnNlKSA9PiBkb1NvbWV0aGluZyhyZXMpKTtcbiAqIGBgYFxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSHR0cCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfYmFja2VuZDogQ29ubmVjdGlvbkJhY2tlbmQsIHByb3RlY3RlZCBfZGVmYXVsdE9wdGlvbnM6IFJlcXVlc3RPcHRpb25zKSB7fVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhbnkgdHlwZSBvZiBodHRwIHJlcXVlc3QuIEZpcnN0IGFyZ3VtZW50IGlzIHJlcXVpcmVkLCBhbmQgY2FuIGVpdGhlciBiZSBhIHVybCBvclxuICAgKiBhIHtAbGluayBSZXF1ZXN0fSBpbnN0YW5jZS4gSWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGEgdXJsLCBhbiBvcHRpb25hbCB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9XG4gICAqIG9iamVjdCBjYW4gYmUgcHJvdmlkZWQgYXMgdGhlIDJuZCBhcmd1bWVudC4gVGhlIG9wdGlvbnMgb2JqZWN0IHdpbGwgYmUgbWVyZ2VkIHdpdGggdGhlIHZhbHVlc1xuICAgKiBvZiB7QGxpbmsgQmFzZVJlcXVlc3RPcHRpb25zfSBiZWZvcmUgcGVyZm9ybWluZyB0aGUgcmVxdWVzdC5cbiAgICovXG4gIHJlcXVlc3QodXJsOiBzdHJpbmd8UmVxdWVzdCwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICBsZXQgcmVzcG9uc2VPYnNlcnZhYmxlOiBhbnk7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXNwb25zZU9ic2VydmFibGUgPSBodHRwUmVxdWVzdChcbiAgICAgICAgICB0aGlzLl9iYWNrZW5kLFxuICAgICAgICAgIG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyh0aGlzLl9kZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgUmVxdWVzdE1ldGhvZC5HZXQsIDxzdHJpbmc+dXJsKSkpO1xuICAgIH0gZWxzZSBpZiAodXJsIGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgcmVzcG9uc2VPYnNlcnZhYmxlID0gaHR0cFJlcXVlc3QodGhpcy5fYmFja2VuZCwgdXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgdXJsIHN0cmluZyBvciBSZXF1ZXN0IGluc3RhbmNlLicpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2VPYnNlcnZhYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgcmVxdWVzdCB3aXRoIGBnZXRgIGh0dHAgbWV0aG9kLlxuICAgKi9cbiAgZ2V0KHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICAgIG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyh0aGlzLl9kZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgUmVxdWVzdE1ldGhvZC5HZXQsIHVybCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHJlcXVlc3Qgd2l0aCBgcG9zdGAgaHR0cCBtZXRob2QuXG4gICAqL1xuICBwb3N0KHVybDogc3RyaW5nLCBib2R5OiBhbnksIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChuZXcgUmVxdWVzdChtZXJnZU9wdGlvbnMoXG4gICAgICAgIHRoaXMuX2RlZmF1bHRPcHRpb25zLm1lcmdlKG5ldyBSZXF1ZXN0T3B0aW9ucyh7Ym9keTogYm9keX0pKSwgb3B0aW9ucywgUmVxdWVzdE1ldGhvZC5Qb3N0LFxuICAgICAgICB1cmwpKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSByZXF1ZXN0IHdpdGggYHB1dGAgaHR0cCBtZXRob2QuXG4gICAqL1xuICBwdXQodXJsOiBzdHJpbmcsIGJvZHk6IGFueSwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyhcbiAgICAgICAgdGhpcy5fZGVmYXVsdE9wdGlvbnMubWVyZ2UobmV3IFJlcXVlc3RPcHRpb25zKHtib2R5OiBib2R5fSkpLCBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLlB1dCxcbiAgICAgICAgdXJsKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgcmVxdWVzdCB3aXRoIGBkZWxldGVgIGh0dHAgbWV0aG9kLlxuICAgKi9cbiAgZGVsZXRlICh1cmw6IHN0cmluZywgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KFxuICAgICAgICBuZXcgUmVxdWVzdChtZXJnZU9wdGlvbnModGhpcy5fZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIFJlcXVlc3RNZXRob2QuRGVsZXRlLCB1cmwpKSk7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSByZXF1ZXN0IHdpdGggYHBhdGNoYCBodHRwIG1ldGhvZC5cbiAgICovXG4gIHBhdGNoKHVybDogc3RyaW5nLCBib2R5OiBhbnksIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChuZXcgUmVxdWVzdChtZXJnZU9wdGlvbnMoXG4gICAgICAgIHRoaXMuX2RlZmF1bHRPcHRpb25zLm1lcmdlKG5ldyBSZXF1ZXN0T3B0aW9ucyh7Ym9keTogYm9keX0pKSwgb3B0aW9ucywgUmVxdWVzdE1ldGhvZC5QYXRjaCxcbiAgICAgICAgdXJsKSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgcmVxdWVzdCB3aXRoIGBoZWFkYCBodHRwIG1ldGhvZC5cbiAgICovXG4gIGhlYWQodXJsOiBzdHJpbmcsIG9wdGlvbnM/OiBSZXF1ZXN0T3B0aW9uc0FyZ3MpOiBPYnNlcnZhYmxlPFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChcbiAgICAgICAgbmV3IFJlcXVlc3QobWVyZ2VPcHRpb25zKHRoaXMuX2RlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBSZXF1ZXN0TWV0aG9kLkhlYWQsIHVybCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHJlcXVlc3Qgd2l0aCBgb3B0aW9uc2AgaHR0cCBtZXRob2QuXG4gICAqL1xuICBvcHRpb25zKHVybDogc3RyaW5nLCBvcHRpb25zPzogUmVxdWVzdE9wdGlvbnNBcmdzKTogT2JzZXJ2YWJsZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoXG4gICAgICAgIG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyh0aGlzLl9kZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgUmVxdWVzdE1ldGhvZC5PcHRpb25zLCB1cmwpKSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnNvbnAgZXh0ZW5kcyBIdHRwIHtcbiAgY29uc3RydWN0b3IoYmFja2VuZDogQ29ubmVjdGlvbkJhY2tlbmQsIGRlZmF1bHRPcHRpb25zOiBSZXF1ZXN0T3B0aW9ucykge1xuICAgIHN1cGVyKGJhY2tlbmQsIGRlZmF1bHRPcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhbnkgdHlwZSBvZiBodHRwIHJlcXVlc3QuIEZpcnN0IGFyZ3VtZW50IGlzIHJlcXVpcmVkLCBhbmQgY2FuIGVpdGhlciBiZSBhIHVybCBvclxuICAgKiBhIHtAbGluayBSZXF1ZXN0fSBpbnN0YW5jZS4gSWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGEgdXJsLCBhbiBvcHRpb25hbCB7QGxpbmsgUmVxdWVzdE9wdGlvbnN9XG4gICAqIG9iamVjdCBjYW4gYmUgcHJvdmlkZWQgYXMgdGhlIDJuZCBhcmd1bWVudC4gVGhlIG9wdGlvbnMgb2JqZWN0IHdpbGwgYmUgbWVyZ2VkIHdpdGggdGhlIHZhbHVlc1xuICAgKiBvZiB7QGxpbmsgQmFzZVJlcXVlc3RPcHRpb25zfSBiZWZvcmUgcGVyZm9ybWluZyB0aGUgcmVxdWVzdC5cbiAgICpcbiAgICogQHNlY3VyaXR5IFJlZ3VsYXIgWEhSIGlzIHRoZSBzYWZlc3QgYWx0ZXJuYXRpdmUgdG8gSlNPTlAgZm9yIG1vc3QgYXBwbGljYXRpb25zLCBhbmQgaXNcbiAgICogc3VwcG9ydGVkIGJ5IGFsbCBjdXJyZW50IGJyb3dzZXJzLiBCZWNhdXNlIEpTT05QIGNyZWF0ZXMgYSBgPHNjcmlwdD5gIGVsZW1lbnQgd2l0aFxuICAgKiBjb250ZW50cyByZXRyaWV2ZWQgZnJvbSBhIHJlbW90ZSBzb3VyY2UsIGF0dGFja2VyLWNvbnRyb2xsZWQgZGF0YSBpbnRyb2R1Y2VkIGJ5IGFuIHVudHJ1c3RlZFxuICAgKiBzb3VyY2UgY291bGQgZXhwb3NlIHlvdXIgYXBwbGljYXRpb24gdG8gWFNTIHJpc2tzLiBEYXRhIGV4cG9zZWQgYnkgSlNPTlAgbWF5IGFsc28gYmVcbiAgICogcmVhZGFibGUgYnkgbWFsaWNpb3VzIHRoaXJkLXBhcnR5IHdlYnNpdGVzLiBJbiBhZGRpdGlvbiwgSlNPTlAgaW50cm9kdWNlcyBwb3RlbnRpYWwgcmlzayBmb3JcbiAgICogZnV0dXJlIHNlY3VyaXR5IGlzc3VlcyAoZS5nLiBjb250ZW50IHNuaWZmaW5nKS4gIEZvciBtb3JlIGRldGFpbCwgc2VlIHRoZVxuICAgKiBbU2VjdXJpdHkgR3VpZGVdKGh0dHA6Ly9nLmNvL25nL3NlY3VyaXR5KS5cbiAgICovXG4gIHJlcXVlc3QodXJsOiBzdHJpbmd8UmVxdWVzdCwgb3B0aW9ucz86IFJlcXVlc3RPcHRpb25zQXJncyk6IE9ic2VydmFibGU8UmVzcG9uc2U+IHtcbiAgICBsZXQgcmVzcG9uc2VPYnNlcnZhYmxlOiBhbnk7XG4gICAgaWYgKHR5cGVvZiB1cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB1cmwgPVxuICAgICAgICAgIG5ldyBSZXF1ZXN0KG1lcmdlT3B0aW9ucyh0aGlzLl9kZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgUmVxdWVzdE1ldGhvZC5HZXQsIDxzdHJpbmc+dXJsKSk7XG4gICAgfVxuICAgIGlmICh1cmwgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICBpZiAodXJsLm1ldGhvZCAhPT0gUmVxdWVzdE1ldGhvZC5HZXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdKU09OUCByZXF1ZXN0cyBtdXN0IHVzZSBHRVQgcmVxdWVzdCBtZXRob2QuJyk7XG4gICAgICB9XG4gICAgICByZXNwb25zZU9ic2VydmFibGUgPSBodHRwUmVxdWVzdCh0aGlzLl9iYWNrZW5kLCB1cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSB1cmwgc3RyaW5nIG9yIFJlcXVlc3QgaW5zdGFuY2UuJyk7XG4gICAgfVxuICAgIHJldHVybiByZXNwb25zZU9ic2VydmFibGU7XG4gIH1cbn1cbiJdfQ==
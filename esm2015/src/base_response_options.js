import { Injectable } from '@angular/core';
import { ResponseType } from './enums';
import { Headers } from './headers';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Creates a response options object to be optionally provided when instantiating a
 * {\@link Response}.
 *
 * This class is based on the `ResponseInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#responseinit).
 *
 * All values are null by default. Typical defaults can be found in the
 * {\@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
 *
 * This class may be used in tests to build {\@link Response Responses} for
 * mock responses (see {\@link MockBackend}).
 *
 * \@usageNotes
 * ### Example
 *
 * ```typescript
 * import {ResponseOptions, Response} from '\@angular/http';
 *
 * var options = new ResponseOptions({
 *   body: '{"name":"Jeff"}'
 * });
 * var res = new Response(options);
 *
 * console.log('res.json():', res.json()); // Object {name: "Jeff"}
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 * \@publicApi
 */
export class ResponseOptions {
    /**
     * @param {?=} opts
     */
    constructor(opts = {}) {
        const { body, status, headers, statusText, type, url } = opts;
        this.body = body != null ? body : null;
        this.status = status != null ? status : null;
        this.headers = headers != null ? headers : null;
        this.statusText = statusText != null ? statusText : null;
        this.type = type != null ? type : null;
        this.url = url != null ? url : null;
    }
    /**
     * Creates a copy of the `ResponseOptions` instance, using the optional input as values to
     * override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * This may be useful when sharing a base `ResponseOptions` object inside tests,
     * where certain properties may change from test to test.
     *
     * \@usageNotes
     * ### Example
     *
     * ```typescript
     * import {ResponseOptions, Response} from '\@angular/http';
     *
     * var options = new ResponseOptions({
     *   body: {name: 'Jeff'}
     * });
     * var res = new Response(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('options.url:', options.url); // null
     * console.log('res.json():', res.json()); // Object {name: "Jeff"}
     * console.log('res.url:', res.url); // https://google.com
     * ```
     * @param {?=} options
     * @return {?}
     */
    merge(options) {
        return new ResponseOptions({
            body: options && options.body != null ? options.body : this.body,
            status: options && options.status != null ? options.status : this.status,
            headers: options && options.headers != null ? options.headers : this.headers,
            statusText: options && options.statusText != null ? options.statusText : this.statusText,
            type: options && options.type != null ? options.type : this.type,
            url: options && options.url != null ? options.url : this.url,
        });
    }
}
if (false) {
    /**
     * String, Object, ArrayBuffer or Blob representing the body of the {\@link Response}.
     * @type {?}
     */
    ResponseOptions.prototype.body;
    /**
     * Http {\@link http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html status code}
     * associated with the response.
     * @type {?}
     */
    ResponseOptions.prototype.status;
    /**
     * Response {\@link Headers headers}
     * @type {?}
     */
    ResponseOptions.prototype.headers;
    /**
     * \@internal
     * @type {?}
     */
    ResponseOptions.prototype.statusText;
    /**
     * \@internal
     * @type {?}
     */
    ResponseOptions.prototype.type;
    /** @type {?} */
    ResponseOptions.prototype.url;
}
/**
 * Subclass of {\@link ResponseOptions}, with default values.
 *
 * Default values:
 *  * status: 200
 *  * headers: empty {\@link Headers} object
 *
 * This class could be extended and bound to the {\@link ResponseOptions} class
 * when configuring an {\@link Injector}, in order to override the default options
 * used by {\@link Http} to create {\@link Response Responses}.
 *
 * \@usageNotes
 * ### Example
 *
 * ```typescript
 * import {provide} from '\@angular/core';
 * import {bootstrap} from '\@angular/platform-browser/browser';
 * import {HTTP_PROVIDERS, Headers, Http, BaseResponseOptions, ResponseOptions} from
 * '\@angular/http';
 * import {App} from './myapp';
 *
 * class MyOptions extends BaseResponseOptions {
 *   headers:Headers = new Headers({network: 'github'});
 * }
 *
 * bootstrap(App, [HTTP_PROVIDERS, {provide: ResponseOptions, useClass: MyOptions}]);
 * ```
 *
 * The options could also be extended when manually creating a {\@link Response}
 * object.
 *
 * ### Example
 *
 * ```
 * import {BaseResponseOptions, Response} from '\@angular/http';
 *
 * var options = new BaseResponseOptions();
 * var res = new Response(options.merge({
 *   body: 'Angular',
 *   headers: new Headers({framework: 'angular'})
 * }));
 * console.log('res.headers.get("framework"):', res.headers.get('framework')); // angular
 * console.log('res.text():', res.text()); // Angular;
 * ```
 *
 * @deprecated see https://angular.io/guide/http
 * \@publicApi
 */
export class BaseResponseOptions extends ResponseOptions {
    constructor() {
        super({ status: 200, statusText: 'Ok', type: ResponseType.Default, headers: new Headers() });
    }
}
BaseResponseOptions.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BaseResponseOptions.ctorParameters = () => [];
BaseResponseOptions.ngInjectableDef = i0.defineInjectable({ token: BaseResponseOptions, factory: function BaseResponseOptions_Factory(t) { return new (t || BaseResponseOptions)(); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(BaseResponseOptions, [{
        type: Injectable
    }], function () { return []; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9yZXNwb25zZV9vcHRpb25zLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLyIsInNvdXJjZXMiOlsicGFja2FnZXMvaHR0cC9zcmMvYmFzZV9yZXNwb25zZV9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNyQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0NsQyxNQUFNLE9BQU8sZUFBZTs7OztJQXdCMUIsWUFBWSxPQUE0QixFQUFFO2NBQ2xDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsR0FBRyxJQUFJO1FBQzNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDekQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNEJELEtBQUssQ0FBQyxPQUE2QjtRQUNqQyxPQUFPLElBQUksZUFBZSxDQUFDO1lBQ3pCLElBQUksRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ2hFLE1BQU0sRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQ3hFLE9BQU8sRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQzVFLFVBQVUsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVO1lBQ3hGLElBQUksRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ2hFLEdBQUcsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHO1NBQzdELENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjs7Ozs7O0lBakVDLCtCQUEwQzs7Ozs7O0lBSzFDLGlDQUFvQjs7Ozs7SUFJcEIsa0NBQXNCOzs7OztJQUl0QixxQ0FBd0I7Ozs7O0lBSXhCLCtCQUF3Qjs7SUFDeEIsOEJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtHbkIsTUFBTSxPQUFPLG1CQUFvQixTQUFRLGVBQWU7SUFDdEQ7UUFDRSxLQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksT0FBTyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7OztZQUpGLFVBQVU7Ozs7bUVBQ0UsbUJBQW1CLHNFQUFuQixtQkFBbUI7bUNBQW5CLG1CQUFtQjtjQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1Jlc3BvbnNlVHlwZX0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5pbXBvcnQge1Jlc3BvbnNlT3B0aW9uc0FyZ3N9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cblxuLyoqXG4gKiBDcmVhdGVzIGEgcmVzcG9uc2Ugb3B0aW9ucyBvYmplY3QgdG8gYmUgb3B0aW9uYWxseSBwcm92aWRlZCB3aGVuIGluc3RhbnRpYXRpbmcgYVxuICoge0BsaW5rIFJlc3BvbnNlfS5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIGJhc2VkIG9uIHRoZSBgUmVzcG9uc2VJbml0YCBkZXNjcmlwdGlvbiBpbiB0aGUgW0ZldGNoXG4gKiBTcGVjXShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jcmVzcG9uc2Vpbml0KS5cbiAqXG4gKiBBbGwgdmFsdWVzIGFyZSBudWxsIGJ5IGRlZmF1bHQuIFR5cGljYWwgZGVmYXVsdHMgY2FuIGJlIGZvdW5kIGluIHRoZVxuICoge0BsaW5rIEJhc2VSZXNwb25zZU9wdGlvbnN9IGNsYXNzLCB3aGljaCBzdWItY2xhc3NlcyBgUmVzcG9uc2VPcHRpb25zYC5cbiAqXG4gKiBUaGlzIGNsYXNzIG1heSBiZSB1c2VkIGluIHRlc3RzIHRvIGJ1aWxkIHtAbGluayBSZXNwb25zZSBSZXNwb25zZXN9IGZvclxuICogbW9jayByZXNwb25zZXMgKHNlZSB7QGxpbmsgTW9ja0JhY2tlbmR9KS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge1Jlc3BvbnNlT3B0aW9ucywgUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuICpcbiAqIHZhciBvcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7XG4gKiAgIGJvZHk6ICd7XCJuYW1lXCI6XCJKZWZmXCJ9J1xuICogfSk7XG4gKiB2YXIgcmVzID0gbmV3IFJlc3BvbnNlKG9wdGlvbnMpO1xuICpcbiAqIGNvbnNvbGUubG9nKCdyZXMuanNvbigpOicsIHJlcy5qc29uKCkpOyAvLyBPYmplY3Qge25hbWU6IFwiSmVmZlwifVxuICogYGBgXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNwb25zZU9wdGlvbnMge1xuICAvLyBUT0RPOiBGb3JtRGF0YSB8IEJsb2JcbiAgLyoqXG4gICAqIFN0cmluZywgT2JqZWN0LCBBcnJheUJ1ZmZlciBvciBCbG9iIHJlcHJlc2VudGluZyB0aGUgYm9keSBvZiB0aGUge0BsaW5rIFJlc3BvbnNlfS5cbiAgICovXG4gIGJvZHk6IHN0cmluZ3xPYmplY3R8QXJyYXlCdWZmZXJ8QmxvYnxudWxsO1xuICAvKipcbiAgICogSHR0cCB7QGxpbmsgaHR0cDovL3d3dy53My5vcmcvUHJvdG9jb2xzL3JmYzI2MTYvcmZjMjYxNi1zZWMxMC5odG1sIHN0YXR1cyBjb2RlfVxuICAgKiBhc3NvY2lhdGVkIHdpdGggdGhlIHJlc3BvbnNlLlxuICAgKi9cbiAgc3RhdHVzOiBudW1iZXJ8bnVsbDtcbiAgLyoqXG4gICAqIFJlc3BvbnNlIHtAbGluayBIZWFkZXJzIGhlYWRlcnN9XG4gICAqL1xuICBoZWFkZXJzOiBIZWFkZXJzfG51bGw7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHN0YXR1c1RleHQ6IHN0cmluZ3xudWxsO1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICB0eXBlOiBSZXNwb25zZVR5cGV8bnVsbDtcbiAgdXJsOiBzdHJpbmd8bnVsbDtcbiAgY29uc3RydWN0b3Iob3B0czogUmVzcG9uc2VPcHRpb25zQXJncyA9IHt9KSB7XG4gICAgY29uc3Qge2JvZHksIHN0YXR1cywgaGVhZGVycywgc3RhdHVzVGV4dCwgdHlwZSwgdXJsfSA9IG9wdHM7XG4gICAgdGhpcy5ib2R5ID0gYm9keSAhPSBudWxsID8gYm9keSA6IG51bGw7XG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXMgIT0gbnVsbCA/IHN0YXR1cyA6IG51bGw7XG4gICAgdGhpcy5oZWFkZXJzID0gaGVhZGVycyAhPSBudWxsID8gaGVhZGVycyA6IG51bGw7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gc3RhdHVzVGV4dCAhPSBudWxsID8gc3RhdHVzVGV4dCA6IG51bGw7XG4gICAgdGhpcy50eXBlID0gdHlwZSAhPSBudWxsID8gdHlwZSA6IG51bGw7XG4gICAgdGhpcy51cmwgPSB1cmwgIT0gbnVsbCA/IHVybCA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhlIGBSZXNwb25zZU9wdGlvbnNgIGluc3RhbmNlLCB1c2luZyB0aGUgb3B0aW9uYWwgaW5wdXQgYXMgdmFsdWVzIHRvXG4gICAqIG92ZXJyaWRlXG4gICAqIGV4aXN0aW5nIHZhbHVlcy4gVGhpcyBtZXRob2Qgd2lsbCBub3QgY2hhbmdlIHRoZSB2YWx1ZXMgb2YgdGhlIGluc3RhbmNlIG9uIHdoaWNoIGl0IGlzIGJlaW5nXG4gICAqIGNhbGxlZC5cbiAgICpcbiAgICogVGhpcyBtYXkgYmUgdXNlZnVsIHdoZW4gc2hhcmluZyBhIGJhc2UgYFJlc3BvbnNlT3B0aW9uc2Agb2JqZWN0IGluc2lkZSB0ZXN0cyxcbiAgICogd2hlcmUgY2VydGFpbiBwcm9wZXJ0aWVzIG1heSBjaGFuZ2UgZnJvbSB0ZXN0IHRvIHRlc3QuXG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogaW1wb3J0IHtSZXNwb25zZU9wdGlvbnMsIFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAgICpcbiAgICogdmFyIG9wdGlvbnMgPSBuZXcgUmVzcG9uc2VPcHRpb25zKHtcbiAgICogICBib2R5OiB7bmFtZTogJ0plZmYnfVxuICAgKiB9KTtcbiAgICogdmFyIHJlcyA9IG5ldyBSZXNwb25zZShvcHRpb25zLm1lcmdlKHtcbiAgICogICB1cmw6ICdodHRwczovL2dvb2dsZS5jb20nXG4gICAqIH0pKTtcbiAgICogY29uc29sZS5sb2coJ29wdGlvbnMudXJsOicsIG9wdGlvbnMudXJsKTsgLy8gbnVsbFxuICAgKiBjb25zb2xlLmxvZygncmVzLmpzb24oKTonLCByZXMuanNvbigpKTsgLy8gT2JqZWN0IHtuYW1lOiBcIkplZmZcIn1cbiAgICogY29uc29sZS5sb2coJ3Jlcy51cmw6JywgcmVzLnVybCk7IC8vIGh0dHBzOi8vZ29vZ2xlLmNvbVxuICAgKiBgYGBcbiAgICovXG4gIG1lcmdlKG9wdGlvbnM/OiBSZXNwb25zZU9wdGlvbnNBcmdzKTogUmVzcG9uc2VPcHRpb25zIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlT3B0aW9ucyh7XG4gICAgICBib2R5OiBvcHRpb25zICYmIG9wdGlvbnMuYm9keSAhPSBudWxsID8gb3B0aW9ucy5ib2R5IDogdGhpcy5ib2R5LFxuICAgICAgc3RhdHVzOiBvcHRpb25zICYmIG9wdGlvbnMuc3RhdHVzICE9IG51bGwgPyBvcHRpb25zLnN0YXR1cyA6IHRoaXMuc3RhdHVzLFxuICAgICAgaGVhZGVyczogb3B0aW9ucyAmJiBvcHRpb25zLmhlYWRlcnMgIT0gbnVsbCA/IG9wdGlvbnMuaGVhZGVycyA6IHRoaXMuaGVhZGVycyxcbiAgICAgIHN0YXR1c1RleHQ6IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGF0dXNUZXh0ICE9IG51bGwgPyBvcHRpb25zLnN0YXR1c1RleHQgOiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICB0eXBlOiBvcHRpb25zICYmIG9wdGlvbnMudHlwZSAhPSBudWxsID8gb3B0aW9ucy50eXBlIDogdGhpcy50eXBlLFxuICAgICAgdXJsOiBvcHRpb25zICYmIG9wdGlvbnMudXJsICE9IG51bGwgPyBvcHRpb25zLnVybCA6IHRoaXMudXJsLFxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogU3ViY2xhc3Mgb2Yge0BsaW5rIFJlc3BvbnNlT3B0aW9uc30sIHdpdGggZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogRGVmYXVsdCB2YWx1ZXM6XG4gKiAgKiBzdGF0dXM6IDIwMFxuICogICogaGVhZGVyczogZW1wdHkge0BsaW5rIEhlYWRlcnN9IG9iamVjdFxuICpcbiAqIFRoaXMgY2xhc3MgY291bGQgYmUgZXh0ZW5kZWQgYW5kIGJvdW5kIHRvIHRoZSB7QGxpbmsgUmVzcG9uc2VPcHRpb25zfSBjbGFzc1xuICogd2hlbiBjb25maWd1cmluZyBhbiB7QGxpbmsgSW5qZWN0b3J9LCBpbiBvcmRlciB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBvcHRpb25zXG4gKiB1c2VkIGJ5IHtAbGluayBIdHRwfSB0byBjcmVhdGUge0BsaW5rIFJlc3BvbnNlIFJlc3BvbnNlc30uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtwcm92aWRlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqIGltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2Jyb3dzZXInO1xuICogaW1wb3J0IHtIVFRQX1BST1ZJREVSUywgSGVhZGVycywgSHR0cCwgQmFzZVJlc3BvbnNlT3B0aW9ucywgUmVzcG9uc2VPcHRpb25zfSBmcm9tXG4gKiAnQGFuZ3VsYXIvaHR0cCc7XG4gKiBpbXBvcnQge0FwcH0gZnJvbSAnLi9teWFwcCc7XG4gKlxuICogY2xhc3MgTXlPcHRpb25zIGV4dGVuZHMgQmFzZVJlc3BvbnNlT3B0aW9ucyB7XG4gKiAgIGhlYWRlcnM6SGVhZGVycyA9IG5ldyBIZWFkZXJzKHtuZXR3b3JrOiAnZ2l0aHViJ30pO1xuICogfVxuICpcbiAqIGJvb3RzdHJhcChBcHAsIFtIVFRQX1BST1ZJREVSUywge3Byb3ZpZGU6IFJlc3BvbnNlT3B0aW9ucywgdXNlQ2xhc3M6IE15T3B0aW9uc31dKTtcbiAqIGBgYFxuICpcbiAqIFRoZSBvcHRpb25zIGNvdWxkIGFsc28gYmUgZXh0ZW5kZWQgd2hlbiBtYW51YWxseSBjcmVhdGluZyBhIHtAbGluayBSZXNwb25zZX1cbiAqIG9iamVjdC5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaW1wb3J0IHtCYXNlUmVzcG9uc2VPcHRpb25zLCBSZXNwb25zZX0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKlxuICogdmFyIG9wdGlvbnMgPSBuZXcgQmFzZVJlc3BvbnNlT3B0aW9ucygpO1xuICogdmFyIHJlcyA9IG5ldyBSZXNwb25zZShvcHRpb25zLm1lcmdlKHtcbiAqICAgYm9keTogJ0FuZ3VsYXInLFxuICogICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7ZnJhbWV3b3JrOiAnYW5ndWxhcid9KVxuICogfSkpO1xuICogY29uc29sZS5sb2coJ3Jlcy5oZWFkZXJzLmdldChcImZyYW1ld29ya1wiKTonLCByZXMuaGVhZGVycy5nZXQoJ2ZyYW1ld29yaycpKTsgLy8gYW5ndWxhclxuICogY29uc29sZS5sb2coJ3Jlcy50ZXh0KCk6JywgcmVzLnRleHQoKSk7IC8vIEFuZ3VsYXI7XG4gKiBgYGBcbiAqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhc2VSZXNwb25zZU9wdGlvbnMgZXh0ZW5kcyBSZXNwb25zZU9wdGlvbnMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7c3RhdHVzOiAyMDAsIHN0YXR1c1RleHQ6ICdPaycsIHR5cGU6IFJlc3BvbnNlVHlwZS5EZWZhdWx0LCBoZWFkZXJzOiBuZXcgSGVhZGVycygpfSk7XG4gIH1cbn1cbiJdfQ==
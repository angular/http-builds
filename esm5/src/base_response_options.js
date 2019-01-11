import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { ResponseType } from './enums';
import { Headers } from './headers';
import * as i0 from "@angular/core";
/**
 * Creates a response options object to be optionally provided when instantiating a
 * {@link Response}.
 *
 * This class is based on the `ResponseInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#responseinit).
 *
 * All values are null by default. Typical defaults can be found in the
 * {@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
 *
 * This class may be used in tests to build {@link Response Responses} for
 * mock responses (see {@link MockBackend}).
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import {ResponseOptions, Response} from '@angular/http';
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
 * @publicApi
 */
var ResponseOptions = /** @class */ (function () {
    function ResponseOptions(opts) {
        if (opts === void 0) { opts = {}; }
        var body = opts.body, status = opts.status, headers = opts.headers, statusText = opts.statusText, type = opts.type, url = opts.url;
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
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * import {ResponseOptions, Response} from '@angular/http';
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
     */
    ResponseOptions.prototype.merge = function (options) {
        return new ResponseOptions({
            body: options && options.body != null ? options.body : this.body,
            status: options && options.status != null ? options.status : this.status,
            headers: options && options.headers != null ? options.headers : this.headers,
            statusText: options && options.statusText != null ? options.statusText : this.statusText,
            type: options && options.type != null ? options.type : this.type,
            url: options && options.url != null ? options.url : this.url,
        });
    };
    return ResponseOptions;
}());
export { ResponseOptions };
/**
 * Subclass of {@link ResponseOptions}, with default values.
 *
 * Default values:
 *  * status: 200
 *  * headers: empty {@link Headers} object
 *
 * This class could be extended and bound to the {@link ResponseOptions} class
 * when configuring an {@link Injector}, in order to override the default options
 * used by {@link Http} to create {@link Response Responses}.
 *
 * @usageNotes
 * ### Example
 *
 * ```typescript
 * import {provide} from '@angular/core';
 * import {bootstrap} from '@angular/platform-browser/browser';
 * import {HTTP_PROVIDERS, Headers, Http, BaseResponseOptions, ResponseOptions} from
 * '@angular/http';
 * import {App} from './myapp';
 *
 * class MyOptions extends BaseResponseOptions {
 *   headers:Headers = new Headers({network: 'github'});
 * }
 *
 * bootstrap(App, [HTTP_PROVIDERS, {provide: ResponseOptions, useClass: MyOptions}]);
 * ```
 *
 * The options could also be extended when manually creating a {@link Response}
 * object.
 *
 * ### Example
 *
 * ```
 * import {BaseResponseOptions, Response} from '@angular/http';
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
 * @publicApi
 */
var BaseResponseOptions = /** @class */ (function (_super) {
    tslib_1.__extends(BaseResponseOptions, _super);
    function BaseResponseOptions() {
        return _super.call(this, { status: 200, statusText: 'Ok', type: ResponseType.Default, headers: new Headers() }) || this;
    }
    BaseResponseOptions.ngInjectableDef = i0.defineInjectable({ token: BaseResponseOptions, factory: function BaseResponseOptions_Factory(t) { return new (t || BaseResponseOptions)(); }, providedIn: null });
    return BaseResponseOptions;
}(ResponseOptions));
export { BaseResponseOptions };
/*@__PURE__*/ i0.ɵsetClassMetadata(BaseResponseOptions, [{
        type: Injectable
    }], function () { return []; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9yZXNwb25zZV9vcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvaHR0cC9zcmMvYmFzZV9yZXNwb25zZV9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDckMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQzs7QUFJbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0g7SUF3QkUseUJBQVksSUFBOEI7UUFBOUIscUJBQUEsRUFBQSxTQUE4QjtRQUNqQyxJQUFBLGdCQUFJLEVBQUUsb0JBQU0sRUFBRSxzQkFBTyxFQUFFLDRCQUFVLEVBQUUsZ0JBQUksRUFBRSxjQUFHLENBQVM7UUFDNUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN6RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsK0JBQUssR0FBTCxVQUFNLE9BQTZCO1FBQ2pDLE9BQU8sSUFBSSxlQUFlLENBQUM7WUFDekIsSUFBSSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUk7WUFDaEUsTUFBTSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDeEUsT0FBTyxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDNUUsVUFBVSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVU7WUFDeEYsSUFBSSxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUk7WUFDaEUsR0FBRyxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7U0FDN0QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQXRFRCxJQXNFQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ0c7QUFDSDtJQUN5QywrQ0FBZTtJQUN0RDtlQUNFLGtCQUFNLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLE9BQU8sRUFBRSxFQUFDLENBQUM7SUFDNUYsQ0FBQzt1RUFIVSxtQkFBbUIsc0VBQW5CLG1CQUFtQjs4QkF0S2hDO0NBMEtDLEFBTEQsQ0FDeUMsZUFBZSxHQUl2RDtTQUpZLG1CQUFtQjttQ0FBbkIsbUJBQW1CO2NBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7UmVzcG9uc2VUeXBlfSBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7SGVhZGVyc30gZnJvbSAnLi9oZWFkZXJzJztcbmltcG9ydCB7UmVzcG9uc2VPcHRpb25zQXJnc30gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuXG4vKipcbiAqIENyZWF0ZXMgYSByZXNwb25zZSBvcHRpb25zIG9iamVjdCB0byBiZSBvcHRpb25hbGx5IHByb3ZpZGVkIHdoZW4gaW5zdGFudGlhdGluZyBhXG4gKiB7QGxpbmsgUmVzcG9uc2V9LlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgYmFzZWQgb24gdGhlIGBSZXNwb25zZUluaXRgIGRlc2NyaXB0aW9uIGluIHRoZSBbRmV0Y2hcbiAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXNwb25zZWluaXQpLlxuICpcbiAqIEFsbCB2YWx1ZXMgYXJlIG51bGwgYnkgZGVmYXVsdC4gVHlwaWNhbCBkZWZhdWx0cyBjYW4gYmUgZm91bmQgaW4gdGhlXG4gKiB7QGxpbmsgQmFzZVJlc3BvbnNlT3B0aW9uc30gY2xhc3MsIHdoaWNoIHN1Yi1jbGFzc2VzIGBSZXNwb25zZU9wdGlvbnNgLlxuICpcbiAqIFRoaXMgY2xhc3MgbWF5IGJlIHVzZWQgaW4gdGVzdHMgdG8gYnVpbGQge0BsaW5rIFJlc3BvbnNlIFJlc3BvbnNlc30gZm9yXG4gKiBtb2NrIHJlc3BvbnNlcyAoc2VlIHtAbGluayBNb2NrQmFja2VuZH0pLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7UmVzcG9uc2VPcHRpb25zLCBSZXNwb25zZX0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKlxuICogdmFyIG9wdGlvbnMgPSBuZXcgUmVzcG9uc2VPcHRpb25zKHtcbiAqICAgYm9keTogJ3tcIm5hbWVcIjpcIkplZmZcIn0nXG4gKiB9KTtcbiAqIHZhciByZXMgPSBuZXcgUmVzcG9uc2Uob3B0aW9ucyk7XG4gKlxuICogY29uc29sZS5sb2coJ3Jlcy5qc29uKCk6JywgcmVzLmpzb24oKSk7IC8vIE9iamVjdCB7bmFtZTogXCJKZWZmXCJ9XG4gKiBgYGBcbiAqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc3BvbnNlT3B0aW9ucyB7XG4gIC8vIFRPRE86IEZvcm1EYXRhIHwgQmxvYlxuICAvKipcbiAgICogU3RyaW5nLCBPYmplY3QsIEFycmF5QnVmZmVyIG9yIEJsb2IgcmVwcmVzZW50aW5nIHRoZSBib2R5IG9mIHRoZSB7QGxpbmsgUmVzcG9uc2V9LlxuICAgKi9cbiAgYm9keTogc3RyaW5nfE9iamVjdHxBcnJheUJ1ZmZlcnxCbG9ifG51bGw7XG4gIC8qKlxuICAgKiBIdHRwIHtAbGluayBodHRwOi8vd3d3LnczLm9yZy9Qcm90b2NvbHMvcmZjMjYxNi9yZmMyNjE2LXNlYzEwLmh0bWwgc3RhdHVzIGNvZGV9XG4gICAqIGFzc29jaWF0ZWQgd2l0aCB0aGUgcmVzcG9uc2UuXG4gICAqL1xuICBzdGF0dXM6IG51bWJlcnxudWxsO1xuICAvKipcbiAgICogUmVzcG9uc2Uge0BsaW5rIEhlYWRlcnMgaGVhZGVyc31cbiAgICovXG4gIGhlYWRlcnM6IEhlYWRlcnN8bnVsbDtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgc3RhdHVzVGV4dDogc3RyaW5nfG51bGw7XG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHR5cGU6IFJlc3BvbnNlVHlwZXxudWxsO1xuICB1cmw6IHN0cmluZ3xudWxsO1xuICBjb25zdHJ1Y3RvcihvcHRzOiBSZXNwb25zZU9wdGlvbnNBcmdzID0ge30pIHtcbiAgICBjb25zdCB7Ym9keSwgc3RhdHVzLCBoZWFkZXJzLCBzdGF0dXNUZXh0LCB0eXBlLCB1cmx9ID0gb3B0cztcbiAgICB0aGlzLmJvZHkgPSBib2R5ICE9IG51bGwgPyBib2R5IDogbnVsbDtcbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cyAhPSBudWxsID8gc3RhdHVzIDogbnVsbDtcbiAgICB0aGlzLmhlYWRlcnMgPSBoZWFkZXJzICE9IG51bGwgPyBoZWFkZXJzIDogbnVsbDtcbiAgICB0aGlzLnN0YXR1c1RleHQgPSBzdGF0dXNUZXh0ICE9IG51bGwgPyBzdGF0dXNUZXh0IDogbnVsbDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlICE9IG51bGwgPyB0eXBlIDogbnVsbDtcbiAgICB0aGlzLnVybCA9IHVybCAhPSBudWxsID8gdXJsIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGUgYFJlc3BvbnNlT3B0aW9uc2AgaW5zdGFuY2UsIHVzaW5nIHRoZSBvcHRpb25hbCBpbnB1dCBhcyB2YWx1ZXMgdG9cbiAgICogb3ZlcnJpZGVcbiAgICogZXhpc3RpbmcgdmFsdWVzLiBUaGlzIG1ldGhvZCB3aWxsIG5vdCBjaGFuZ2UgdGhlIHZhbHVlcyBvZiB0aGUgaW5zdGFuY2Ugb24gd2hpY2ggaXQgaXMgYmVpbmdcbiAgICogY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIG1heSBiZSB1c2VmdWwgd2hlbiBzaGFyaW5nIGEgYmFzZSBgUmVzcG9uc2VPcHRpb25zYCBvYmplY3QgaW5zaWRlIHRlc3RzLFxuICAgKiB3aGVyZSBjZXJ0YWluIHByb3BlcnRpZXMgbWF5IGNoYW5nZSBmcm9tIHRlc3QgdG8gdGVzdC5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIEV4YW1wbGVcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBpbXBvcnQge1Jlc3BvbnNlT3B0aW9ucywgUmVzcG9uc2V9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuICAgKlxuICAgKiB2YXIgb3B0aW9ucyA9IG5ldyBSZXNwb25zZU9wdGlvbnMoe1xuICAgKiAgIGJvZHk6IHtuYW1lOiAnSmVmZid9XG4gICAqIH0pO1xuICAgKiB2YXIgcmVzID0gbmV3IFJlc3BvbnNlKG9wdGlvbnMubWVyZ2Uoe1xuICAgKiAgIHVybDogJ2h0dHBzOi8vZ29vZ2xlLmNvbSdcbiAgICogfSkpO1xuICAgKiBjb25zb2xlLmxvZygnb3B0aW9ucy51cmw6Jywgb3B0aW9ucy51cmwpOyAvLyBudWxsXG4gICAqIGNvbnNvbGUubG9nKCdyZXMuanNvbigpOicsIHJlcy5qc29uKCkpOyAvLyBPYmplY3Qge25hbWU6IFwiSmVmZlwifVxuICAgKiBjb25zb2xlLmxvZygncmVzLnVybDonLCByZXMudXJsKTsgLy8gaHR0cHM6Ly9nb29nbGUuY29tXG4gICAqIGBgYFxuICAgKi9cbiAgbWVyZ2Uob3B0aW9ucz86IFJlc3BvbnNlT3B0aW9uc0FyZ3MpOiBSZXNwb25zZU9wdGlvbnMge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2VPcHRpb25zKHtcbiAgICAgIGJvZHk6IG9wdGlvbnMgJiYgb3B0aW9ucy5ib2R5ICE9IG51bGwgPyBvcHRpb25zLmJvZHkgOiB0aGlzLmJvZHksXG4gICAgICBzdGF0dXM6IG9wdGlvbnMgJiYgb3B0aW9ucy5zdGF0dXMgIT0gbnVsbCA/IG9wdGlvbnMuc3RhdHVzIDogdGhpcy5zdGF0dXMsXG4gICAgICBoZWFkZXJzOiBvcHRpb25zICYmIG9wdGlvbnMuaGVhZGVycyAhPSBudWxsID8gb3B0aW9ucy5oZWFkZXJzIDogdGhpcy5oZWFkZXJzLFxuICAgICAgc3RhdHVzVGV4dDogb3B0aW9ucyAmJiBvcHRpb25zLnN0YXR1c1RleHQgIT0gbnVsbCA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIHR5cGU6IG9wdGlvbnMgJiYgb3B0aW9ucy50eXBlICE9IG51bGwgPyBvcHRpb25zLnR5cGUgOiB0aGlzLnR5cGUsXG4gICAgICB1cmw6IG9wdGlvbnMgJiYgb3B0aW9ucy51cmwgIT0gbnVsbCA/IG9wdGlvbnMudXJsIDogdGhpcy51cmwsXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTdWJjbGFzcyBvZiB7QGxpbmsgUmVzcG9uc2VPcHRpb25zfSwgd2l0aCBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBEZWZhdWx0IHZhbHVlczpcbiAqICAqIHN0YXR1czogMjAwXG4gKiAgKiBoZWFkZXJzOiBlbXB0eSB7QGxpbmsgSGVhZGVyc30gb2JqZWN0XG4gKlxuICogVGhpcyBjbGFzcyBjb3VsZCBiZSBleHRlbmRlZCBhbmQgYm91bmQgdG8gdGhlIHtAbGluayBSZXNwb25zZU9wdGlvbnN9IGNsYXNzXG4gKiB3aGVuIGNvbmZpZ3VyaW5nIGFuIHtAbGluayBJbmplY3Rvcn0sIGluIG9yZGVyIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAqIHVzZWQgYnkge0BsaW5rIEh0dHB9IHRvIGNyZWF0ZSB7QGxpbmsgUmVzcG9uc2UgUmVzcG9uc2VzfS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge3Byb3ZpZGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYnJvd3Nlcic7XG4gKiBpbXBvcnQge0hUVFBfUFJPVklERVJTLCBIZWFkZXJzLCBIdHRwLCBCYXNlUmVzcG9uc2VPcHRpb25zLCBSZXNwb25zZU9wdGlvbnN9IGZyb21cbiAqICdAYW5ndWxhci9odHRwJztcbiAqIGltcG9ydCB7QXBwfSBmcm9tICcuL215YXBwJztcbiAqXG4gKiBjbGFzcyBNeU9wdGlvbnMgZXh0ZW5kcyBCYXNlUmVzcG9uc2VPcHRpb25zIHtcbiAqICAgaGVhZGVyczpIZWFkZXJzID0gbmV3IEhlYWRlcnMoe25ldHdvcms6ICdnaXRodWInfSk7XG4gKiB9XG4gKlxuICogYm9vdHN0cmFwKEFwcCwgW0hUVFBfUFJPVklERVJTLCB7cHJvdmlkZTogUmVzcG9uc2VPcHRpb25zLCB1c2VDbGFzczogTXlPcHRpb25zfV0pO1xuICogYGBgXG4gKlxuICogVGhlIG9wdGlvbnMgY291bGQgYWxzbyBiZSBleHRlbmRlZCB3aGVuIG1hbnVhbGx5IGNyZWF0aW5nIGEge0BsaW5rIFJlc3BvbnNlfVxuICogb2JqZWN0LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge0Jhc2VSZXNwb25zZU9wdGlvbnMsIFJlc3BvbnNlfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqXG4gKiB2YXIgb3B0aW9ucyA9IG5ldyBCYXNlUmVzcG9uc2VPcHRpb25zKCk7XG4gKiB2YXIgcmVzID0gbmV3IFJlc3BvbnNlKG9wdGlvbnMubWVyZ2Uoe1xuICogICBib2R5OiAnQW5ndWxhcicsXG4gKiAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtmcmFtZXdvcms6ICdhbmd1bGFyJ30pXG4gKiB9KSk7XG4gKiBjb25zb2xlLmxvZygncmVzLmhlYWRlcnMuZ2V0KFwiZnJhbWV3b3JrXCIpOicsIHJlcy5oZWFkZXJzLmdldCgnZnJhbWV3b3JrJykpOyAvLyBhbmd1bGFyXG4gKiBjb25zb2xlLmxvZygncmVzLnRleHQoKTonLCByZXMudGV4dCgpKTsgLy8gQW5ndWxhcjtcbiAqIGBgYFxuICpcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFzZVJlc3BvbnNlT3B0aW9ucyBleHRlbmRzIFJlc3BvbnNlT3B0aW9ucyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtzdGF0dXM6IDIwMCwgc3RhdHVzVGV4dDogJ09rJywgdHlwZTogUmVzcG9uc2VUeXBlLkRlZmF1bHQsIGhlYWRlcnM6IG5ldyBIZWFkZXJzKCl9KTtcbiAgfVxufVxuIl19
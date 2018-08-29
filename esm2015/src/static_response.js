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
import { Body } from './body';
/**
 * Creates `Response` instances from provided values.
 *
 * Though this object isn't
 * usually instantiated by end-users, it is the primary object interacted with when it comes time to
 * add data to a view.
 *
 * ### Example
 *
 * ```
 * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
 * ```
 *
 * The Response's interface is inspired by the Response constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
 * can be accessed many times. There are other differences in the implementation, but this is the
 * most significant.
 *
 * @deprecated see https://angular.io/guide/http
 */
export class Response extends Body {
    /**
     * @param {?} responseOptions
     */
    constructor(responseOptions) {
        super();
        this._body = responseOptions.body;
        this.status = /** @type {?} */ ((responseOptions.status));
        this.ok = (this.status >= 200 && this.status <= 299);
        this.statusText = responseOptions.statusText;
        this.headers = responseOptions.headers;
        this.type = /** @type {?} */ ((responseOptions.type));
        this.url = /** @type {?} */ ((responseOptions.url));
    }
    /**
     * @return {?}
     */
    toString() {
        return `Response with status: ${this.status} ${this.statusText} for URL: ${this.url}`;
    }
}
if (false) {
    /**
     * One of "basic", "cors", "default", "error", or "opaque".
     *
     * Defaults to "default".
     * @type {?}
     */
    Response.prototype.type;
    /**
     * True if the response's status is within 200-299
     * @type {?}
     */
    Response.prototype.ok;
    /**
     * URL of response.
     *
     * Defaults to empty string.
     * @type {?}
     */
    Response.prototype.url;
    /**
     * Status code returned by server.
     *
     * Defaults to 200.
     * @type {?}
     */
    Response.prototype.status;
    /**
     * Text representing the corresponding reason phrase to the `status`, as defined in [ietf rfc 2616
     * section 6.1.1](https://tools.ietf.org/html/rfc2616#section-6.1.1)
     *
     * Defaults to "OK"
     * @type {?}
     */
    Response.prototype.statusText;
    /**
     * Non-standard property
     *
     * Denotes how many of the response body's bytes have been loaded, for example if the response is
     * the result of a progress event.
     * @type {?}
     */
    Response.prototype.bytesLoaded;
    /**
     * Non-standard property
     *
     * Denotes how many bytes are expected in the final response body.
     * @type {?}
     */
    Response.prototype.totalBytes;
    /**
     * Headers object based on the `Headers` class in the [Fetch
     * Spec](https://fetch.spec.whatwg.org/#headers-class).
     * @type {?}
     */
    Response.prototype.headers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvaHR0cC9zcmMvc3RhdGljX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBV0EsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUI1QixNQUFNLE9BQU8sUUFBUyxTQUFRLElBQUk7Ozs7SUFtRGhDLFlBQVksZUFBZ0M7UUFDMUMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLE1BQU0sc0JBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksc0JBQUcsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLHNCQUFHLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUNsQzs7OztJQUVELFFBQVE7UUFDTixPQUFPLHlCQUF5QixJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLGFBQWEsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ3ZGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuXG5pbXBvcnQge1Jlc3BvbnNlT3B0aW9uc30gZnJvbSAnLi9iYXNlX3Jlc3BvbnNlX29wdGlvbnMnO1xuaW1wb3J0IHtCb2R5fSBmcm9tICcuL2JvZHknO1xuaW1wb3J0IHtSZXNwb25zZVR5cGV9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IHtIZWFkZXJzfSBmcm9tICcuL2hlYWRlcnMnO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBgUmVzcG9uc2VgIGluc3RhbmNlcyBmcm9tIHByb3ZpZGVkIHZhbHVlcy5cbiAqXG4gKiBUaG91Z2ggdGhpcyBvYmplY3QgaXNuJ3RcbiAqIHVzdWFsbHkgaW5zdGFudGlhdGVkIGJ5IGVuZC11c2VycywgaXQgaXMgdGhlIHByaW1hcnkgb2JqZWN0IGludGVyYWN0ZWQgd2l0aCB3aGVuIGl0IGNvbWVzIHRpbWUgdG9cbiAqIGFkZCBkYXRhIHRvIGEgdmlldy5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaHR0cC5yZXF1ZXN0KCdteS1mcmllbmRzLnR4dCcpLnN1YnNjcmliZShyZXNwb25zZSA9PiB0aGlzLmZyaWVuZHMgPSByZXNwb25zZS50ZXh0KCkpO1xuICogYGBgXG4gKlxuICogVGhlIFJlc3BvbnNlJ3MgaW50ZXJmYWNlIGlzIGluc3BpcmVkIGJ5IHRoZSBSZXNwb25zZSBjb25zdHJ1Y3RvciBkZWZpbmVkIGluIHRoZSBbRmV0Y2hcbiAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXNwb25zZS1jbGFzcyksIGJ1dCBpcyBjb25zaWRlcmVkIGEgc3RhdGljIHZhbHVlIHdob3NlIGJvZHlcbiAqIGNhbiBiZSBhY2Nlc3NlZCBtYW55IHRpbWVzLiBUaGVyZSBhcmUgb3RoZXIgZGlmZmVyZW5jZXMgaW4gdGhlIGltcGxlbWVudGF0aW9uLCBidXQgdGhpcyBpcyB0aGVcbiAqIG1vc3Qgc2lnbmlmaWNhbnQuXG4gKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXNwb25zZSBleHRlbmRzIEJvZHkge1xuICAvKipcbiAgICogT25lIG9mIFwiYmFzaWNcIiwgXCJjb3JzXCIsIFwiZGVmYXVsdFwiLCBcImVycm9yXCIsIG9yIFwib3BhcXVlXCIuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIFwiZGVmYXVsdFwiLlxuICAgKi9cbiAgdHlwZTogUmVzcG9uc2VUeXBlO1xuICAvKipcbiAgICogVHJ1ZSBpZiB0aGUgcmVzcG9uc2UncyBzdGF0dXMgaXMgd2l0aGluIDIwMC0yOTlcbiAgICovXG4gIG9rOiBib29sZWFuO1xuICAvKipcbiAgICogVVJMIG9mIHJlc3BvbnNlLlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBlbXB0eSBzdHJpbmcuXG4gICAqL1xuICB1cmw6IHN0cmluZztcbiAgLyoqXG4gICAqIFN0YXR1cyBjb2RlIHJldHVybmVkIGJ5IHNlcnZlci5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gMjAwLlxuICAgKi9cbiAgc3RhdHVzOiBudW1iZXI7XG4gIC8qKlxuICAgKiBUZXh0IHJlcHJlc2VudGluZyB0aGUgY29ycmVzcG9uZGluZyByZWFzb24gcGhyYXNlIHRvIHRoZSBgc3RhdHVzYCwgYXMgZGVmaW5lZCBpbiBbaWV0ZiByZmMgMjYxNlxuICAgKiBzZWN0aW9uIDYuMS4xXShodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjYxNiNzZWN0aW9uLTYuMS4xKVxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBcIk9LXCJcbiAgICovXG4gIHN0YXR1c1RleHQ6IHN0cmluZ3xudWxsO1xuICAvKipcbiAgICogTm9uLXN0YW5kYXJkIHByb3BlcnR5XG4gICAqXG4gICAqIERlbm90ZXMgaG93IG1hbnkgb2YgdGhlIHJlc3BvbnNlIGJvZHkncyBieXRlcyBoYXZlIGJlZW4gbG9hZGVkLCBmb3IgZXhhbXBsZSBpZiB0aGUgcmVzcG9uc2UgaXNcbiAgICogdGhlIHJlc3VsdCBvZiBhIHByb2dyZXNzIGV2ZW50LlxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIGJ5dGVzTG9hZGVkICE6IG51bWJlcjtcbiAgLyoqXG4gICAqIE5vbi1zdGFuZGFyZCBwcm9wZXJ0eVxuICAgKlxuICAgKiBEZW5vdGVzIGhvdyBtYW55IGJ5dGVzIGFyZSBleHBlY3RlZCBpbiB0aGUgZmluYWwgcmVzcG9uc2UgYm9keS5cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICB0b3RhbEJ5dGVzICE6IG51bWJlcjtcbiAgLyoqXG4gICAqIEhlYWRlcnMgb2JqZWN0IGJhc2VkIG9uIHRoZSBgSGVhZGVyc2AgY2xhc3MgaW4gdGhlIFtGZXRjaFxuICAgKiBTcGVjXShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jaGVhZGVycy1jbGFzcykuXG4gICAqL1xuICBoZWFkZXJzOiBIZWFkZXJzfG51bGw7XG5cbiAgY29uc3RydWN0b3IocmVzcG9uc2VPcHRpb25zOiBSZXNwb25zZU9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2JvZHkgPSByZXNwb25zZU9wdGlvbnMuYm9keTtcbiAgICB0aGlzLnN0YXR1cyA9IHJlc3BvbnNlT3B0aW9ucy5zdGF0dXMgITtcbiAgICB0aGlzLm9rID0gKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8PSAyOTkpO1xuICAgIHRoaXMuc3RhdHVzVGV4dCA9IHJlc3BvbnNlT3B0aW9ucy5zdGF0dXNUZXh0O1xuICAgIHRoaXMuaGVhZGVycyA9IHJlc3BvbnNlT3B0aW9ucy5oZWFkZXJzO1xuICAgIHRoaXMudHlwZSA9IHJlc3BvbnNlT3B0aW9ucy50eXBlICE7XG4gICAgdGhpcy51cmwgPSByZXNwb25zZU9wdGlvbnMudXJsICE7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgUmVzcG9uc2Ugd2l0aCBzdGF0dXM6ICR7dGhpcy5zdGF0dXN9ICR7dGhpcy5zdGF0dXNUZXh0fSBmb3IgVVJMOiAke3RoaXMudXJsfWA7XG4gIH1cbn1cbiJdfQ==
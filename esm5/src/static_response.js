/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
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
var /**
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
Response = /** @class */ (function (_super) {
    tslib_1.__extends(Response, _super);
    function Response(responseOptions) {
        var _this = _super.call(this) || this;
        _this._body = responseOptions.body;
        _this.status = (responseOptions.status);
        _this.ok = (_this.status >= 200 && _this.status <= 299);
        _this.statusText = responseOptions.statusText;
        _this.headers = responseOptions.headers;
        _this.type = (responseOptions.type);
        _this.url = (responseOptions.url);
        return _this;
    }
    Response.prototype.toString = function () {
        return "Response with status: " + this.status + " " + this.statusText + " for URL: " + this.url;
    };
    return Response;
}(Body));
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
export { Response };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvaHR0cC9zcmMvc3RhdGljX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBV0EsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUI1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUE4QixvQ0FBSTtJQWlEaEMsa0JBQVksZUFBZ0M7UUFBNUMsWUFDRSxpQkFBTyxTQVFSO1FBUEMsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxNQUFNLElBQUcsZUFBZSxDQUFDLE1BQVEsQ0FBQSxDQUFDO1FBQ3ZDLEtBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELEtBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUM3QyxLQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFDdkMsS0FBSSxDQUFDLElBQUksSUFBRyxlQUFlLENBQUMsSUFBTSxDQUFBLENBQUM7UUFDbkMsS0FBSSxDQUFDLEdBQUcsSUFBRyxlQUFlLENBQUMsR0FBSyxDQUFBLENBQUM7O0tBQ2xDO0lBRUQsMkJBQVEsR0FBUjtRQUNFLE1BQU0sQ0FBQywyQkFBeUIsSUFBSSxDQUFDLE1BQU0sU0FBSSxJQUFJLENBQUMsVUFBVSxrQkFBYSxJQUFJLENBQUMsR0FBSyxDQUFDO0tBQ3ZGO21CQWxHSDtFQW9DOEIsSUFBSSxFQStEakMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBL0RELG9CQStEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuXG5cbmltcG9ydCB7UmVzcG9uc2VPcHRpb25zfSBmcm9tICcuL2Jhc2VfcmVzcG9uc2Vfb3B0aW9ucyc7XG5pbXBvcnQge0JvZHl9IGZyb20gJy4vYm9keSc7XG5pbXBvcnQge1Jlc3BvbnNlVHlwZX0gZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQge0hlYWRlcnN9IGZyb20gJy4vaGVhZGVycyc7XG5cblxuLyoqXG4gKiBDcmVhdGVzIGBSZXNwb25zZWAgaW5zdGFuY2VzIGZyb20gcHJvdmlkZWQgdmFsdWVzLlxuICpcbiAqIFRob3VnaCB0aGlzIG9iamVjdCBpc24ndFxuICogdXN1YWxseSBpbnN0YW50aWF0ZWQgYnkgZW5kLXVzZXJzLCBpdCBpcyB0aGUgcHJpbWFyeSBvYmplY3QgaW50ZXJhY3RlZCB3aXRoIHdoZW4gaXQgY29tZXMgdGltZSB0b1xuICogYWRkIGRhdGEgdG8gYSB2aWV3LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBodHRwLnJlcXVlc3QoJ215LWZyaWVuZHMudHh0Jykuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHRoaXMuZnJpZW5kcyA9IHJlc3BvbnNlLnRleHQoKSk7XG4gKiBgYGBcbiAqXG4gKiBUaGUgUmVzcG9uc2UncyBpbnRlcmZhY2UgaXMgaW5zcGlyZWQgYnkgdGhlIFJlc3BvbnNlIGNvbnN0cnVjdG9yIGRlZmluZWQgaW4gdGhlIFtGZXRjaFxuICogU3BlY10oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI3Jlc3BvbnNlLWNsYXNzKSwgYnV0IGlzIGNvbnNpZGVyZWQgYSBzdGF0aWMgdmFsdWUgd2hvc2UgYm9keVxuICogY2FuIGJlIGFjY2Vzc2VkIG1hbnkgdGltZXMuIFRoZXJlIGFyZSBvdGhlciBkaWZmZXJlbmNlcyBpbiB0aGUgaW1wbGVtZW50YXRpb24sIGJ1dCB0aGlzIGlzIHRoZVxuICogbW9zdCBzaWduaWZpY2FudC5cbiAqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc3BvbnNlIGV4dGVuZHMgQm9keSB7XG4gIC8qKlxuICAgKiBPbmUgb2YgXCJiYXNpY1wiLCBcImNvcnNcIiwgXCJkZWZhdWx0XCIsIFwiZXJyb3JcIiwgb3IgXCJvcGFxdWVcIi5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gXCJkZWZhdWx0XCIuXG4gICAqL1xuICB0eXBlOiBSZXNwb25zZVR5cGU7XG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSByZXNwb25zZSdzIHN0YXR1cyBpcyB3aXRoaW4gMjAwLTI5OVxuICAgKi9cbiAgb2s6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBVUkwgb2YgcmVzcG9uc2UuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGVtcHR5IHN0cmluZy5cbiAgICovXG4gIHVybDogc3RyaW5nO1xuICAvKipcbiAgICogU3RhdHVzIGNvZGUgcmV0dXJuZWQgYnkgc2VydmVyLlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byAyMDAuXG4gICAqL1xuICBzdGF0dXM6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRleHQgcmVwcmVzZW50aW5nIHRoZSBjb3JyZXNwb25kaW5nIHJlYXNvbiBwaHJhc2UgdG8gdGhlIGBzdGF0dXNgLCBhcyBkZWZpbmVkIGluIFtpZXRmIHJmYyAyNjE2XG4gICAqIHNlY3Rpb24gNi4xLjFdKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyNjE2I3NlY3Rpb24tNi4xLjEpXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIFwiT0tcIlxuICAgKi9cbiAgc3RhdHVzVGV4dDogc3RyaW5nfG51bGw7XG4gIC8qKlxuICAgKiBOb24tc3RhbmRhcmQgcHJvcGVydHlcbiAgICpcbiAgICogRGVub3RlcyBob3cgbWFueSBvZiB0aGUgcmVzcG9uc2UgYm9keSdzIGJ5dGVzIGhhdmUgYmVlbiBsb2FkZWQsIGZvciBleGFtcGxlIGlmIHRoZSByZXNwb25zZSBpc1xuICAgKiB0aGUgcmVzdWx0IG9mIGEgcHJvZ3Jlc3MgZXZlbnQuXG4gICAqL1xuICBieXRlc0xvYWRlZDogbnVtYmVyO1xuICAvKipcbiAgICogTm9uLXN0YW5kYXJkIHByb3BlcnR5XG4gICAqXG4gICAqIERlbm90ZXMgaG93IG1hbnkgYnl0ZXMgYXJlIGV4cGVjdGVkIGluIHRoZSBmaW5hbCByZXNwb25zZSBib2R5LlxuICAgKi9cbiAgdG90YWxCeXRlczogbnVtYmVyO1xuICAvKipcbiAgICogSGVhZGVycyBvYmplY3QgYmFzZWQgb24gdGhlIGBIZWFkZXJzYCBjbGFzcyBpbiB0aGUgW0ZldGNoXG4gICAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNoZWFkZXJzLWNsYXNzKS5cbiAgICovXG4gIGhlYWRlcnM6IEhlYWRlcnN8bnVsbDtcblxuICBjb25zdHJ1Y3RvcihyZXNwb25zZU9wdGlvbnM6IFJlc3BvbnNlT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYm9keSA9IHJlc3BvbnNlT3B0aW9ucy5ib2R5O1xuICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2VPcHRpb25zLnN0YXR1cyAhO1xuICAgIHRoaXMub2sgPSAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDw9IDI5OSk7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gcmVzcG9uc2VPcHRpb25zLnN0YXR1c1RleHQ7XG4gICAgdGhpcy5oZWFkZXJzID0gcmVzcG9uc2VPcHRpb25zLmhlYWRlcnM7XG4gICAgdGhpcy50eXBlID0gcmVzcG9uc2VPcHRpb25zLnR5cGUgITtcbiAgICB0aGlzLnVybCA9IHJlc3BvbnNlT3B0aW9ucy51cmwgITtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBSZXNwb25zZSB3aXRoIHN0YXR1czogJHt0aGlzLnN0YXR1c30gJHt0aGlzLnN0YXR1c1RleHR9IGZvciBVUkw6ICR7dGhpcy51cmx9YDtcbiAgfVxufVxuIl19
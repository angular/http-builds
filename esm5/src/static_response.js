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
 * @deprecated use @angular/common/http instead
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
 * @deprecated use @angular/common/http instead
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
 * @deprecated use @angular/common/http instead
 */
export { Response };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvaHR0cC9zcmMvc3RhdGljX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBV0EsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUI1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUE4QixvQ0FBSTtJQWlEaEMsa0JBQVksZUFBZ0M7UUFBNUMsWUFDRSxpQkFBTyxTQVFSO1FBUEMsS0FBSSxDQUFDLEtBQUssR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxNQUFNLElBQUcsZUFBZSxDQUFDLE1BQVEsQ0FBQSxDQUFDO1FBQ3ZDLEtBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELEtBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUM3QyxLQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7UUFDdkMsS0FBSSxDQUFDLElBQUksSUFBRyxlQUFlLENBQUMsSUFBTSxDQUFBLENBQUM7UUFDbkMsS0FBSSxDQUFDLEdBQUcsSUFBRyxlQUFlLENBQUMsR0FBSyxDQUFBLENBQUM7O0tBQ2xDO0lBRUQsMkJBQVEsR0FBUjtRQUNFLE9BQU8sMkJBQXlCLElBQUksQ0FBQyxNQUFNLFNBQUksSUFBSSxDQUFDLFVBQVUsa0JBQWEsSUFBSSxDQUFDLEdBQUssQ0FBQztLQUN2RjttQkFsR0g7RUFvQzhCLElBQUksRUErRGpDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQS9ERCxvQkErREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuXG5pbXBvcnQge1Jlc3BvbnNlT3B0aW9uc30gZnJvbSAnLi9iYXNlX3Jlc3BvbnNlX29wdGlvbnMnO1xuaW1wb3J0IHtCb2R5fSBmcm9tICcuL2JvZHknO1xuaW1wb3J0IHtSZXNwb25zZVR5cGV9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IHtIZWFkZXJzfSBmcm9tICcuL2hlYWRlcnMnO1xuXG5cbi8qKlxuICogQ3JlYXRlcyBgUmVzcG9uc2VgIGluc3RhbmNlcyBmcm9tIHByb3ZpZGVkIHZhbHVlcy5cbiAqXG4gKiBUaG91Z2ggdGhpcyBvYmplY3QgaXNuJ3RcbiAqIHVzdWFsbHkgaW5zdGFudGlhdGVkIGJ5IGVuZC11c2VycywgaXQgaXMgdGhlIHByaW1hcnkgb2JqZWN0IGludGVyYWN0ZWQgd2l0aCB3aGVuIGl0IGNvbWVzIHRpbWUgdG9cbiAqIGFkZCBkYXRhIHRvIGEgdmlldy5cbiAqXG4gKiAjIyMgRXhhbXBsZVxuICpcbiAqIGBgYFxuICogaHR0cC5yZXF1ZXN0KCdteS1mcmllbmRzLnR4dCcpLnN1YnNjcmliZShyZXNwb25zZSA9PiB0aGlzLmZyaWVuZHMgPSByZXNwb25zZS50ZXh0KCkpO1xuICogYGBgXG4gKlxuICogVGhlIFJlc3BvbnNlJ3MgaW50ZXJmYWNlIGlzIGluc3BpcmVkIGJ5IHRoZSBSZXNwb25zZSBjb25zdHJ1Y3RvciBkZWZpbmVkIGluIHRoZSBbRmV0Y2hcbiAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXNwb25zZS1jbGFzcyksIGJ1dCBpcyBjb25zaWRlcmVkIGEgc3RhdGljIHZhbHVlIHdob3NlIGJvZHlcbiAqIGNhbiBiZSBhY2Nlc3NlZCBtYW55IHRpbWVzLiBUaGVyZSBhcmUgb3RoZXIgZGlmZmVyZW5jZXMgaW4gdGhlIGltcGxlbWVudGF0aW9uLCBidXQgdGhpcyBpcyB0aGVcbiAqIG1vc3Qgc2lnbmlmaWNhbnQuXG4gKlxuICogQGRlcHJlY2F0ZWQgdXNlIEBhbmd1bGFyL2NvbW1vbi9odHRwIGluc3RlYWRcbiAqL1xuZXhwb3J0IGNsYXNzIFJlc3BvbnNlIGV4dGVuZHMgQm9keSB7XG4gIC8qKlxuICAgKiBPbmUgb2YgXCJiYXNpY1wiLCBcImNvcnNcIiwgXCJkZWZhdWx0XCIsIFwiZXJyb3JcIiwgb3IgXCJvcGFxdWVcIi5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gXCJkZWZhdWx0XCIuXG4gICAqL1xuICB0eXBlOiBSZXNwb25zZVR5cGU7XG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSByZXNwb25zZSdzIHN0YXR1cyBpcyB3aXRoaW4gMjAwLTI5OVxuICAgKi9cbiAgb2s6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBVUkwgb2YgcmVzcG9uc2UuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGVtcHR5IHN0cmluZy5cbiAgICovXG4gIHVybDogc3RyaW5nO1xuICAvKipcbiAgICogU3RhdHVzIGNvZGUgcmV0dXJuZWQgYnkgc2VydmVyLlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byAyMDAuXG4gICAqL1xuICBzdGF0dXM6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRleHQgcmVwcmVzZW50aW5nIHRoZSBjb3JyZXNwb25kaW5nIHJlYXNvbiBwaHJhc2UgdG8gdGhlIGBzdGF0dXNgLCBhcyBkZWZpbmVkIGluIFtpZXRmIHJmYyAyNjE2XG4gICAqIHNlY3Rpb24gNi4xLjFdKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyNjE2I3NlY3Rpb24tNi4xLjEpXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIFwiT0tcIlxuICAgKi9cbiAgc3RhdHVzVGV4dDogc3RyaW5nfG51bGw7XG4gIC8qKlxuICAgKiBOb24tc3RhbmRhcmQgcHJvcGVydHlcbiAgICpcbiAgICogRGVub3RlcyBob3cgbWFueSBvZiB0aGUgcmVzcG9uc2UgYm9keSdzIGJ5dGVzIGhhdmUgYmVlbiBsb2FkZWQsIGZvciBleGFtcGxlIGlmIHRoZSByZXNwb25zZSBpc1xuICAgKiB0aGUgcmVzdWx0IG9mIGEgcHJvZ3Jlc3MgZXZlbnQuXG4gICAqL1xuICBieXRlc0xvYWRlZDogbnVtYmVyO1xuICAvKipcbiAgICogTm9uLXN0YW5kYXJkIHByb3BlcnR5XG4gICAqXG4gICAqIERlbm90ZXMgaG93IG1hbnkgYnl0ZXMgYXJlIGV4cGVjdGVkIGluIHRoZSBmaW5hbCByZXNwb25zZSBib2R5LlxuICAgKi9cbiAgdG90YWxCeXRlczogbnVtYmVyO1xuICAvKipcbiAgICogSGVhZGVycyBvYmplY3QgYmFzZWQgb24gdGhlIGBIZWFkZXJzYCBjbGFzcyBpbiB0aGUgW0ZldGNoXG4gICAqIFNwZWNdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNoZWFkZXJzLWNsYXNzKS5cbiAgICovXG4gIGhlYWRlcnM6IEhlYWRlcnN8bnVsbDtcblxuICBjb25zdHJ1Y3RvcihyZXNwb25zZU9wdGlvbnM6IFJlc3BvbnNlT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYm9keSA9IHJlc3BvbnNlT3B0aW9ucy5ib2R5O1xuICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2VPcHRpb25zLnN0YXR1cyAhO1xuICAgIHRoaXMub2sgPSAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDw9IDI5OSk7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gcmVzcG9uc2VPcHRpb25zLnN0YXR1c1RleHQ7XG4gICAgdGhpcy5oZWFkZXJzID0gcmVzcG9uc2VPcHRpb25zLmhlYWRlcnM7XG4gICAgdGhpcy50eXBlID0gcmVzcG9uc2VPcHRpb25zLnR5cGUgITtcbiAgICB0aGlzLnVybCA9IHJlc3BvbnNlT3B0aW9ucy51cmwgITtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBSZXNwb25zZSB3aXRoIHN0YXR1czogJHt0aGlzLnN0YXR1c30gJHt0aGlzLnN0YXR1c1RleHR9IGZvciBVUkw6ICR7dGhpcy51cmx9YDtcbiAgfVxufVxuIl19
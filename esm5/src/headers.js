/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
/**
 * Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
 * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
 *
 * The only known difference between this `Headers` implementation and the spec is the
 * lack of an `entries` method.
 *
 * ### Example
 *
 * ```
 * import {Headers} from '@angular/http';
 *
 * var firstHeaders = new Headers();
 * firstHeaders.append('Content-Type', 'image/jpeg');
 * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
 *
 * // Create headers from Plain Old JavaScript Object
 * var secondHeaders = new Headers({
 *   'X-My-Custom-Header': 'Angular'
 * });
 * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
 *
 * var thirdHeaders = new Headers(secondHeaders);
 * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
 * ```
 *
 * @deprecated use @angular/common/http instead
 */
var Headers = /** @class */ (function () {
    // TODO(vicb): any -> string|string[]
    function Headers(headers) {
        var _this = this;
        /** @internal header names are lower case */
        this._headers = new Map();
        /** @internal map lower case names to actual names */
        this._normalizedNames = new Map();
        if (!headers) {
            return;
        }
        if (headers instanceof Headers) {
            headers.forEach(function (values, name) {
                values.forEach(function (value) { return _this.append(name, value); });
            });
            return;
        }
        Object.keys(headers).forEach(function (name) {
            var values = Array.isArray(headers[name]) ? headers[name] : [headers[name]];
            _this.delete(name);
            values.forEach(function (value) { return _this.append(name, value); });
        });
    }
    /**
     * Returns a new Headers instance from the given DOMString of Response Headers
     */
    Headers.fromResponseHeaderString = function (headersString) {
        var headers = new Headers();
        headersString.split('\n').forEach(function (line) {
            var index = line.indexOf(':');
            if (index > 0) {
                var name_1 = line.slice(0, index);
                var value = line.slice(index + 1).trim();
                headers.set(name_1, value);
            }
        });
        return headers;
    };
    /**
     * Appends a header to existing list of header values for a given header name.
     */
    Headers.prototype.append = function (name, value) {
        var values = this.getAll(name);
        if (values === null) {
            this.set(name, value);
        }
        else {
            values.push(value);
        }
    };
    /**
     * Deletes all header values for the given name.
     */
    Headers.prototype.delete = function (name) {
        var lcName = name.toLowerCase();
        this._normalizedNames.delete(lcName);
        this._headers.delete(lcName);
    };
    Headers.prototype.forEach = function (fn) {
        var _this = this;
        this._headers.forEach(function (values, lcName) { return fn(values, _this._normalizedNames.get(lcName), _this._headers); });
    };
    /**
     * Returns first header that matches given name.
     */
    Headers.prototype.get = function (name) {
        var values = this.getAll(name);
        if (values === null) {
            return null;
        }
        return values.length > 0 ? values[0] : null;
    };
    /**
     * Checks for existence of header by given name.
     */
    Headers.prototype.has = function (name) { return this._headers.has(name.toLowerCase()); };
    /**
     * Returns the names of the headers
     */
    Headers.prototype.keys = function () { return Array.from(this._normalizedNames.values()); };
    /**
     * Sets or overrides header value for given name.
     */
    Headers.prototype.set = function (name, value) {
        if (Array.isArray(value)) {
            if (value.length) {
                this._headers.set(name.toLowerCase(), [value.join(',')]);
            }
        }
        else {
            this._headers.set(name.toLowerCase(), [value]);
        }
        this.mayBeSetNormalizedName(name);
    };
    /**
     * Returns values of all headers.
     */
    Headers.prototype.values = function () { return Array.from(this._headers.values()); };
    /**
     * Returns string of all headers.
     */
    // TODO(vicb): returns {[name: string]: string[]}
    Headers.prototype.toJSON = function () {
        var _this = this;
        var serialized = {};
        this._headers.forEach(function (values, name) {
            var split = [];
            values.forEach(function (v) { return split.push.apply(split, tslib_1.__spread(v.split(','))); });
            serialized[_this._normalizedNames.get(name)] = split;
        });
        return serialized;
    };
    /**
     * Returns list of header values for a given name.
     */
    Headers.prototype.getAll = function (name) {
        return this.has(name) ? this._headers.get(name.toLowerCase()) || null : null;
    };
    /**
     * This method is not implemented.
     */
    Headers.prototype.entries = function () { throw new Error('"entries" method is not implemented on Headers class'); };
    Headers.prototype.mayBeSetNormalizedName = function (name) {
        var lcName = name.toLowerCase();
        if (!this._normalizedNames.has(lcName)) {
            this._normalizedNames.set(lcName, name);
        }
    };
    return Headers;
}());
export { Headers };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2hlYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSDtJQU1FLHFDQUFxQztJQUNyQyxpQkFBWSxPQUE0QztRQUF4RCxpQkFpQkM7UUF2QkQsNENBQTRDO1FBQzVDLGFBQVEsR0FBMEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM1QyxxREFBcUQ7UUFDckQscUJBQWdCLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFJaEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxZQUFZLE9BQU8sRUFBRTtZQUM5QixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBZ0IsRUFBRSxJQUFZO2dCQUM3QyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU87U0FDUjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBWTtZQUN4QyxJQUFNLE1BQU0sR0FBYSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEYsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJ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TSxHQUFOLFVBQU8sSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQy9FLENBQUM7SUFFRDs7T0FFRztJQUNILHlCQUFPLEdBQVAsY0FBWSxNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlFLHdDQUFzQixHQUE5QixVQUErQixJQUFZO1FBQ3pDLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQXJKRCxJQXFKQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBQb2x5ZmlsbCBmb3IgW0hlYWRlcnNdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IZWFkZXJzL0hlYWRlcnMpLCBhc1xuICogc3BlY2lmaWVkIGluIHRoZSBbRmV0Y2ggU3BlY10oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2hlYWRlcnMtY2xhc3MpLlxuICpcbiAqIFRoZSBvbmx5IGtub3duIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIGBIZWFkZXJzYCBpbXBsZW1lbnRhdGlvbiBhbmQgdGhlIHNwZWMgaXMgdGhlXG4gKiBsYWNrIG9mIGFuIGBlbnRyaWVzYCBtZXRob2QuXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7SGVhZGVyc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKlxuICogdmFyIGZpcnN0SGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gKiBmaXJzdEhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnaW1hZ2UvanBlZycpO1xuICogY29uc29sZS5sb2coZmlyc3RIZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykpIC8vJ2ltYWdlL2pwZWcnXG4gKlxuICogLy8gQ3JlYXRlIGhlYWRlcnMgZnJvbSBQbGFpbiBPbGQgSmF2YVNjcmlwdCBPYmplY3RcbiAqIHZhciBzZWNvbmRIZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xuICogICAnWC1NeS1DdXN0b20tSGVhZGVyJzogJ0FuZ3VsYXInXG4gKiB9KTtcbiAqIGNvbnNvbGUubG9nKHNlY29uZEhlYWRlcnMuZ2V0KCdYLU15LUN1c3RvbS1IZWFkZXInKSk7IC8vJ0FuZ3VsYXInXG4gKlxuICogdmFyIHRoaXJkSGVhZGVycyA9IG5ldyBIZWFkZXJzKHNlY29uZEhlYWRlcnMpO1xuICogY29uc29sZS5sb2codGhpcmRIZWFkZXJzLmdldCgnWC1NeS1DdXN0b20tSGVhZGVyJykpOyAvLydBbmd1bGFyJ1xuICogYGBgXG4gKlxuICogQGRlcHJlY2F0ZWQgdXNlIEBhbmd1bGFyL2NvbW1vbi9odHRwIGluc3RlYWRcbiAqL1xuZXhwb3J0IGNsYXNzIEhlYWRlcnMge1xuICAvKiogQGludGVybmFsIGhlYWRlciBuYW1lcyBhcmUgbG93ZXIgY2FzZSAqL1xuICBfaGVhZGVyczogTWFwPHN0cmluZywgc3RyaW5nW10+ID0gbmV3IE1hcCgpO1xuICAvKiogQGludGVybmFsIG1hcCBsb3dlciBjYXNlIG5hbWVzIHRvIGFjdHVhbCBuYW1lcyAqL1xuICBfbm9ybWFsaXplZE5hbWVzOiBNYXA8c3RyaW5nLCBzdHJpbmc+ID0gbmV3IE1hcCgpO1xuXG4gIC8vIFRPRE8odmljYik6IGFueSAtPiBzdHJpbmd8c3RyaW5nW11cbiAgY29uc3RydWN0b3IoaGVhZGVycz86IEhlYWRlcnN8e1tuYW1lOiBzdHJpbmddOiBhbnl9fG51bGwpIHtcbiAgICBpZiAoIWhlYWRlcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaCgodmFsdWVzOiBzdHJpbmdbXSwgbmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhoZWFkZXJzKS5mb3JFYWNoKChuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlczogc3RyaW5nW10gPSBBcnJheS5pc0FycmF5KGhlYWRlcnNbbmFtZV0pID8gaGVhZGVyc1tuYW1lXSA6IFtoZWFkZXJzW25hbWVdXTtcbiAgICAgIHRoaXMuZGVsZXRlKG5hbWUpO1xuICAgICAgdmFsdWVzLmZvckVhY2godmFsdWUgPT4gdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IEhlYWRlcnMgaW5zdGFuY2UgZnJvbSB0aGUgZ2l2ZW4gRE9NU3RyaW5nIG9mIFJlc3BvbnNlIEhlYWRlcnNcbiAgICovXG4gIHN0YXRpYyBmcm9tUmVzcG9uc2VIZWFkZXJTdHJpbmcoaGVhZGVyc1N0cmluZzogc3RyaW5nKTogSGVhZGVycyB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG5cbiAgICBoZWFkZXJzU3RyaW5nLnNwbGl0KCdcXG4nKS5mb3JFYWNoKGxpbmUgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGxpbmUuc2xpY2UoaW5kZXggKyAxKS50cmltKCk7XG4gICAgICAgIGhlYWRlcnMuc2V0KG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBoZWFkZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFwcGVuZHMgYSBoZWFkZXIgdG8gZXhpc3RpbmcgbGlzdCBvZiBoZWFkZXIgdmFsdWVzIGZvciBhIGdpdmVuIGhlYWRlciBuYW1lLlxuICAgKi9cbiAgYXBwZW5kKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMuZ2V0QWxsKG5hbWUpO1xuXG4gICAgaWYgKHZhbHVlcyA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXQobmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYWxsIGhlYWRlciB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgZGVsZXRlIChuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBsY05hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5fbm9ybWFsaXplZE5hbWVzLmRlbGV0ZShsY05hbWUpO1xuICAgIHRoaXMuX2hlYWRlcnMuZGVsZXRlKGxjTmFtZSk7XG4gIH1cblxuICBmb3JFYWNoKGZuOiAodmFsdWVzOiBzdHJpbmdbXSwgbmFtZTogc3RyaW5nfHVuZGVmaW5lZCwgaGVhZGVyczogTWFwPHN0cmluZywgc3RyaW5nW10+KSA9PiB2b2lkKTpcbiAgICAgIHZvaWQge1xuICAgIHRoaXMuX2hlYWRlcnMuZm9yRWFjaChcbiAgICAgICAgKHZhbHVlcywgbGNOYW1lKSA9PiBmbih2YWx1ZXMsIHRoaXMuX25vcm1hbGl6ZWROYW1lcy5nZXQobGNOYW1lKSwgdGhpcy5faGVhZGVycykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZmlyc3QgaGVhZGVyIHRoYXQgbWF0Y2hlcyBnaXZlbiBuYW1lLlxuICAgKi9cbiAgZ2V0KG5hbWU6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmdldEFsbChuYW1lKTtcblxuICAgIGlmICh2YWx1ZXMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXMubGVuZ3RoID4gMCA/IHZhbHVlc1swXSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGZvciBleGlzdGVuY2Ugb2YgaGVhZGVyIGJ5IGdpdmVuIG5hbWUuXG4gICAqL1xuICBoYXMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oZWFkZXJzLmhhcyhuYW1lLnRvTG93ZXJDYXNlKCkpOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5hbWVzIG9mIHRoZSBoZWFkZXJzXG4gICAqL1xuICBrZXlzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fbm9ybWFsaXplZE5hbWVzLnZhbHVlcygpKTsgfVxuXG4gIC8qKlxuICAgKiBTZXRzIG9yIG92ZXJyaWRlcyBoZWFkZXIgdmFsdWUgZm9yIGdpdmVuIG5hbWUuXG4gICAqL1xuICBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nfHN0cmluZ1tdKTogdm9pZCB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlcnMuc2V0KG5hbWUudG9Mb3dlckNhc2UoKSwgW3ZhbHVlLmpvaW4oJywnKV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFkZXJzLnNldChuYW1lLnRvTG93ZXJDYXNlKCksIFt2YWx1ZV0pO1xuICAgIH1cbiAgICB0aGlzLm1heUJlU2V0Tm9ybWFsaXplZE5hbWUobmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB2YWx1ZXMgb2YgYWxsIGhlYWRlcnMuXG4gICAqL1xuICB2YWx1ZXMoKTogc3RyaW5nW11bXSB7IHJldHVybiBBcnJheS5mcm9tKHRoaXMuX2hlYWRlcnMudmFsdWVzKCkpOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgc3RyaW5nIG9mIGFsbCBoZWFkZXJzLlxuICAgKi9cbiAgLy8gVE9ETyh2aWNiKTogcmV0dXJucyB7W25hbWU6IHN0cmluZ106IHN0cmluZ1tdfVxuICB0b0pTT04oKToge1tuYW1lOiBzdHJpbmddOiBhbnl9IHtcbiAgICBjb25zdCBzZXJpYWxpemVkOiB7W25hbWU6IHN0cmluZ106IHN0cmluZ1tdfSA9IHt9O1xuXG4gICAgdGhpcy5faGVhZGVycy5mb3JFYWNoKCh2YWx1ZXM6IHN0cmluZ1tdLCBuYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNwbGl0OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgdmFsdWVzLmZvckVhY2godiA9PiBzcGxpdC5wdXNoKC4uLnYuc3BsaXQoJywnKSkpO1xuICAgICAgc2VyaWFsaXplZFt0aGlzLl9ub3JtYWxpemVkTmFtZXMuZ2V0KG5hbWUpICFdID0gc3BsaXQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VyaWFsaXplZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGxpc3Qgb2YgaGVhZGVyIHZhbHVlcyBmb3IgYSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgZ2V0QWxsKG5hbWU6IHN0cmluZyk6IHN0cmluZ1tdfG51bGwge1xuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMuX2hlYWRlcnMuZ2V0KG5hbWUudG9Mb3dlckNhc2UoKSkgfHwgbnVsbCA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlxuICAgKi9cbiAgZW50cmllcygpIHsgdGhyb3cgbmV3IEVycm9yKCdcImVudHJpZXNcIiBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkIG9uIEhlYWRlcnMgY2xhc3MnKTsgfVxuXG4gIHByaXZhdGUgbWF5QmVTZXROb3JtYWxpemVkTmFtZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBsY05hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoIXRoaXMuX25vcm1hbGl6ZWROYW1lcy5oYXMobGNOYW1lKSkge1xuICAgICAgdGhpcy5fbm9ybWFsaXplZE5hbWVzLnNldChsY05hbWUsIG5hbWUpO1xuICAgIH1cbiAgfVxufVxuIl19
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
function paramParser(rawParams) {
    if (rawParams === void 0) { rawParams = ''; }
    var map = new Map();
    if (rawParams.length > 0) {
        var params = rawParams.split('&');
        params.forEach(function (param) {
            var eqIdx = param.indexOf('=');
            var _a = tslib_1.__read(eqIdx == -1 ? [param, ''] : [param.slice(0, eqIdx), param.slice(eqIdx + 1)], 2), key = _a[0], val = _a[1];
            var list = map.get(key) || [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
/**
 * @deprecated see https://angular.io/guide/http
 **/
var /**
 * @deprecated see https://angular.io/guide/http
 **/
QueryEncoder = /** @class */ (function () {
    function QueryEncoder() {
    }
    QueryEncoder.prototype.encodeKey = function (k) { return standardEncoding(k); };
    QueryEncoder.prototype.encodeValue = function (v) { return standardEncoding(v); };
    return QueryEncoder;
}());
/**
 * @deprecated see https://angular.io/guide/http
 **/
export { QueryEncoder };
function standardEncoding(v) {
    return encodeURIComponent(v)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/gi, '$')
        .replace(/%2C/gi, ',')
        .replace(/%3B/gi, ';')
        .replace(/%2B/gi, '+')
        .replace(/%3D/gi, '=')
        .replace(/%3F/gi, '?')
        .replace(/%2F/gi, '/');
}
/**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 *
 * This class accepts an optional second parameter of ${@link QueryEncoder},
 * which is used to serialize parameters before making a request. By default,
 * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
 * and then un-encodes certain characters that are allowed to be part of the query
 * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
 *
 * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
 *
 * If the set of allowed query characters is not acceptable for a particular backend,
 * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
 *
 * ```
 * import {URLSearchParams, QueryEncoder} from '@angular/http';
 * class MyQueryEncoder extends QueryEncoder {
 *   encodeKey(k: string): string {
 *     return myEncodingFunction(k);
 *   }
 *
 *   encodeValue(v: string): string {
 *     return myEncodingFunction(v);
 *   }
 * }
 *
 * let params = new URLSearchParams('', new MyQueryEncoder());
 * ```
 * @deprecated see https://angular.io/guide/http
 */
var /**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 *
 * This class accepts an optional second parameter of ${@link QueryEncoder},
 * which is used to serialize parameters before making a request. By default,
 * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
 * and then un-encodes certain characters that are allowed to be part of the query
 * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
 *
 * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
 *
 * If the set of allowed query characters is not acceptable for a particular backend,
 * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
 *
 * ```
 * import {URLSearchParams, QueryEncoder} from '@angular/http';
 * class MyQueryEncoder extends QueryEncoder {
 *   encodeKey(k: string): string {
 *     return myEncodingFunction(k);
 *   }
 *
 *   encodeValue(v: string): string {
 *     return myEncodingFunction(v);
 *   }
 * }
 *
 * let params = new URLSearchParams('', new MyQueryEncoder());
 * ```
 * @deprecated see https://angular.io/guide/http
 */
URLSearchParams = /** @class */ (function () {
    function URLSearchParams(rawParams, queryEncoder) {
        if (rawParams === void 0) { rawParams = ''; }
        if (queryEncoder === void 0) { queryEncoder = new QueryEncoder(); }
        this.rawParams = rawParams;
        this.queryEncoder = queryEncoder;
        this.paramsMap = paramParser(rawParams);
    }
    URLSearchParams.prototype.clone = function () {
        var clone = new URLSearchParams('', this.queryEncoder);
        clone.appendAll(this);
        return clone;
    };
    URLSearchParams.prototype.has = function (param) { return this.paramsMap.has(param); };
    URLSearchParams.prototype.get = function (param) {
        var storedParam = this.paramsMap.get(param);
        return Array.isArray(storedParam) ? storedParam[0] : null;
    };
    URLSearchParams.prototype.getAll = function (param) { return this.paramsMap.get(param) || []; };
    URLSearchParams.prototype.set = function (param, val) {
        if (val === void 0 || val === null) {
            this.delete(param);
            return;
        }
        var list = this.paramsMap.get(param) || [];
        list.length = 0;
        list.push(val);
        this.paramsMap.set(param, list);
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `set(name, values[0])`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    // A merge operation
    // For each name-values pair in `searchParams`, perform `set(name, values[0])`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.setAll = 
    // A merge operation
    // For each name-values pair in `searchParams`, perform `set(name, values[0])`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var list = _this.paramsMap.get(param) || [];
            list.length = 0;
            list.push(value[0]);
            _this.paramsMap.set(param, list);
        });
    };
    URLSearchParams.prototype.append = function (param, val) {
        if (val === void 0 || val === null)
            return;
        var list = this.paramsMap.get(param) || [];
        list.push(val);
        this.paramsMap.set(param, list);
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `append(name, value)`
    // for each value in `values`.
    //
    // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    // A merge operation
    // For each name-values pair in `searchParams`, perform `append(name, value)`
    // for each value in `values`.
    //
    // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.appendAll = 
    // A merge operation
    // For each name-values pair in `searchParams`, perform `append(name, value)`
    // for each value in `values`.
    //
    // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var list = _this.paramsMap.get(param) || [];
            for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    // A merge operation
    // For each name-values pair in `searchParams`, perform `delete(name)`,
    // followed by `set(name, values)`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    // A merge operation
    // For each name-values pair in `searchParams`, perform `delete(name)`,
    // followed by `set(name, values)`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    URLSearchParams.prototype.replaceAll = 
    // A merge operation
    // For each name-values pair in `searchParams`, perform `delete(name)`,
    // followed by `set(name, values)`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    function (searchParams) {
        var _this = this;
        searchParams.paramsMap.forEach(function (value, param) {
            var list = _this.paramsMap.get(param) || [];
            list.length = 0;
            for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            _this.paramsMap.set(param, list);
        });
    };
    URLSearchParams.prototype.toString = function () {
        var _this = this;
        var paramsList = [];
        this.paramsMap.forEach(function (values, k) {
            values.forEach(function (v) {
                return paramsList.push(_this.queryEncoder.encodeKey(k) + '=' + _this.queryEncoder.encodeValue(v));
            });
        });
        return paramsList.join('&');
    };
    URLSearchParams.prototype.delete = function (param) { this.paramsMap.delete(param); };
    return URLSearchParams;
}());
/**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 *
 * This class accepts an optional second parameter of ${@link QueryEncoder},
 * which is used to serialize parameters before making a request. By default,
 * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
 * and then un-encodes certain characters that are allowed to be part of the query
 * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
 *
 * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
 *
 * If the set of allowed query characters is not acceptable for a particular backend,
 * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
 *
 * ```
 * import {URLSearchParams, QueryEncoder} from '@angular/http';
 * class MyQueryEncoder extends QueryEncoder {
 *   encodeKey(k: string): string {
 *     return myEncodingFunction(k);
 *   }
 *
 *   encodeValue(v: string): string {
 *     return myEncodingFunction(v);
 *   }
 * }
 *
 * let params = new URLSearchParams('', new MyQueryEncoder());
 * ```
 * @deprecated see https://angular.io/guide/http
 */
export { URLSearchParams };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3NlYXJjaF9wYXJhbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy91cmxfc2VhcmNoX3BhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVFBLHFCQUFxQixTQUFzQjtJQUF0QiwwQkFBQSxFQUFBLGNBQXNCO0lBQ3pDLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFvQixDQUFDO0lBQ3hDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFNLE1BQU0sR0FBYSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFhO1lBQzNCLElBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMseUdBQU8sV0FBRyxFQUFFLFdBQUcsQ0FDaUU7WUFDaEYsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BCLENBQUMsQ0FBQztLQUNKO0lBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztDQUNaOzs7O0FBSUQ7OztBQUFBOzs7SUFDRSxnQ0FBUyxHQUFULFVBQVUsQ0FBUyxJQUFZLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBRTVELGtDQUFXLEdBQVgsVUFBWSxDQUFTLElBQVksTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7dUJBN0JoRTtJQThCQyxDQUFBOzs7O0FBSkQsd0JBSUM7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SSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFEdkUsQ0FDdUUsQ0FBQyxDQUFDO1NBQ25GLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzdCO0lBRUQsZ0NBQU0sR0FBTixVQUFRLEtBQWEsSUFBVSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOzBCQXRMaEU7SUF1TEMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdkdELDJCQXVHQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuZnVuY3Rpb24gcGFyYW1QYXJzZXIocmF3UGFyYW1zOiBzdHJpbmcgPSAnJyk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcbiAgaWYgKHJhd1BhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgcGFyYW1zOiBzdHJpbmdbXSA9IHJhd1BhcmFtcy5zcGxpdCgnJicpO1xuICAgIHBhcmFtcy5mb3JFYWNoKChwYXJhbTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBlcUlkeCA9IHBhcmFtLmluZGV4T2YoJz0nKTtcbiAgICAgIGNvbnN0IFtrZXksIHZhbF06IHN0cmluZ1tdID1cbiAgICAgICAgICBlcUlkeCA9PSAtMSA/IFtwYXJhbSwgJyddIDogW3BhcmFtLnNsaWNlKDAsIGVxSWR4KSwgcGFyYW0uc2xpY2UoZXFJZHggKyAxKV07XG4gICAgICBjb25zdCBsaXN0ID0gbWFwLmdldChrZXkpIHx8IFtdO1xuICAgICAgbGlzdC5wdXNoKHZhbCk7XG4gICAgICBtYXAuc2V0KGtleSwgbGlzdCk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn1cbi8qKlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKiovXG5leHBvcnQgY2xhc3MgUXVlcnlFbmNvZGVyIHtcbiAgZW5jb2RlS2V5KGs6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBzdGFuZGFyZEVuY29kaW5nKGspOyB9XG5cbiAgZW5jb2RlVmFsdWUodjogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIHN0YW5kYXJkRW5jb2Rpbmcodik7IH1cbn1cblxuZnVuY3Rpb24gc3RhbmRhcmRFbmNvZGluZyh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHYpXG4gICAgICAucmVwbGFjZSgvJTQwL2dpLCAnQCcpXG4gICAgICAucmVwbGFjZSgvJTNBL2dpLCAnOicpXG4gICAgICAucmVwbGFjZSgvJTI0L2dpLCAnJCcpXG4gICAgICAucmVwbGFjZSgvJTJDL2dpLCAnLCcpXG4gICAgICAucmVwbGFjZSgvJTNCL2dpLCAnOycpXG4gICAgICAucmVwbGFjZSgvJTJCL2dpLCAnKycpXG4gICAgICAucmVwbGFjZSgvJTNEL2dpLCAnPScpXG4gICAgICAucmVwbGFjZSgvJTNGL2dpLCAnPycpXG4gICAgICAucmVwbGFjZSgvJTJGL2dpLCAnLycpO1xufVxuXG4vKipcbiAqIE1hcC1saWtlIHJlcHJlc2VudGF0aW9uIG9mIHVybCBzZWFyY2ggcGFyYW1ldGVycywgYmFzZWQgb25cbiAqIFtVUkxTZWFyY2hQYXJhbXNdKGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsc2VhcmNocGFyYW1zKSBpbiB0aGUgdXJsIGxpdmluZyBzdGFuZGFyZCxcbiAqIHdpdGggc2V2ZXJhbCBleHRlbnNpb25zIGZvciBtZXJnaW5nIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RzOlxuICogICAtIHNldEFsbCgpXG4gKiAgIC0gYXBwZW5kQWxsKClcbiAqICAgLSByZXBsYWNlQWxsKClcbiAqXG4gKiBUaGlzIGNsYXNzIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciBvZiAke0BsaW5rIFF1ZXJ5RW5jb2Rlcn0sXG4gKiB3aGljaCBpcyB1c2VkIHRvIHNlcmlhbGl6ZSBwYXJhbWV0ZXJzIGJlZm9yZSBtYWtpbmcgYSByZXF1ZXN0LiBCeSBkZWZhdWx0LFxuICogYFF1ZXJ5RW5jb2RlcmAgZW5jb2RlcyBrZXlzIGFuZCB2YWx1ZXMgb2YgcGFyYW1ldGVycyB1c2luZyBgZW5jb2RlVVJJQ29tcG9uZW50YCxcbiAqIGFuZCB0aGVuIHVuLWVuY29kZXMgY2VydGFpbiBjaGFyYWN0ZXJzIHRoYXQgYXJlIGFsbG93ZWQgdG8gYmUgcGFydCBvZiB0aGUgcXVlcnlcbiAqIGFjY29yZGluZyB0byBJRVRGIFJGQyAzOTg2OiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4Ni5cbiAqXG4gKiBUaGVzZSBhcmUgdGhlIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGVuY29kZWQ6IGAhICQgXFwnICggKSAqICsgLCA7IEEgOSAtIC4gXyB+ID8gL2BcbiAqXG4gKiBJZiB0aGUgc2V0IG9mIGFsbG93ZWQgcXVlcnkgY2hhcmFjdGVycyBpcyBub3QgYWNjZXB0YWJsZSBmb3IgYSBwYXJ0aWN1bGFyIGJhY2tlbmQsXG4gKiBgUXVlcnlFbmNvZGVyYCBjYW4gYmUgc3ViY2xhc3NlZCBhbmQgcHJvdmlkZWQgYXMgdGhlIDJuZCBhcmd1bWVudCB0byBVUkxTZWFyY2hQYXJhbXMuXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge1VSTFNlYXJjaFBhcmFtcywgUXVlcnlFbmNvZGVyfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqIGNsYXNzIE15UXVlcnlFbmNvZGVyIGV4dGVuZHMgUXVlcnlFbmNvZGVyIHtcbiAqICAgZW5jb2RlS2V5KGs6IHN0cmluZyk6IHN0cmluZyB7XG4gKiAgICAgcmV0dXJuIG15RW5jb2RpbmdGdW5jdGlvbihrKTtcbiAqICAgfVxuICpcbiAqICAgZW5jb2RlVmFsdWUodjogc3RyaW5nKTogc3RyaW5nIHtcbiAqICAgICByZXR1cm4gbXlFbmNvZGluZ0Z1bmN0aW9uKHYpO1xuICogICB9XG4gKiB9XG4gKlxuICogbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoJycsIG5ldyBNeVF1ZXJ5RW5jb2RlcigpKTtcbiAqIGBgYFxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbmV4cG9ydCBjbGFzcyBVUkxTZWFyY2hQYXJhbXMge1xuICBwYXJhbXNNYXA6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmF3UGFyYW1zOiBzdHJpbmcgPSAnJywgcHJpdmF0ZSBxdWVyeUVuY29kZXI6IFF1ZXJ5RW5jb2RlciA9IG5ldyBRdWVyeUVuY29kZXIoKSkge1xuICAgIHRoaXMucGFyYW1zTWFwID0gcGFyYW1QYXJzZXIocmF3UGFyYW1zKTtcbiAgfVxuXG4gIGNsb25lKCk6IFVSTFNlYXJjaFBhcmFtcyB7XG4gICAgY29uc3QgY2xvbmUgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCcnLCB0aGlzLnF1ZXJ5RW5jb2Rlcik7XG4gICAgY2xvbmUuYXBwZW5kQWxsKHRoaXMpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGhhcyhwYXJhbTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhcmFtc01hcC5oYXMocGFyYW0pOyB9XG5cbiAgZ2V0KHBhcmFtOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gICAgY29uc3Qgc3RvcmVkUGFyYW0gPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pO1xuXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoc3RvcmVkUGFyYW0pID8gc3RvcmVkUGFyYW1bMF0gOiBudWxsO1xuICB9XG5cbiAgZ2V0QWxsKHBhcmFtOiBzdHJpbmcpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pIHx8IFtdOyB9XG5cbiAgc2V0KHBhcmFtOiBzdHJpbmcsIHZhbDogc3RyaW5nKSB7XG4gICAgaWYgKHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5kZWxldGUocGFyYW0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBsaXN0ID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKSB8fCBbXTtcbiAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgbGlzdC5wdXNoKHZhbCk7XG4gICAgdGhpcy5wYXJhbXNNYXAuc2V0KHBhcmFtLCBsaXN0KTtcbiAgfVxuXG4gIC8vIEEgbWVyZ2Ugb3BlcmF0aW9uXG4gIC8vIEZvciBlYWNoIG5hbWUtdmFsdWVzIHBhaXIgaW4gYHNlYXJjaFBhcmFtc2AsIHBlcmZvcm0gYHNldChuYW1lLCB2YWx1ZXNbMF0pYFxuICAvL1xuICAvLyBFLmc6IFwiYT1bMSwyLDNdLCBjPVs4XVwiICsgXCJhPVs0LDUsNl0sIGI9WzddXCIgPSBcImE9WzRdLCBjPVs4XSwgYj1bN11cIlxuICAvL1xuICAvLyBUT0RPKEBjYWl0cCk6IGRvY3VtZW50IHRoaXMgYmV0dGVyXG4gIHNldEFsbChzZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykge1xuICAgIHNlYXJjaFBhcmFtcy5wYXJhbXNNYXAuZm9yRWFjaCgodmFsdWUsIHBhcmFtKSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKSB8fCBbXTtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGxpc3QucHVzaCh2YWx1ZVswXSk7XG4gICAgICB0aGlzLnBhcmFtc01hcC5zZXQocGFyYW0sIGxpc3QpO1xuICAgIH0pO1xuICB9XG5cbiAgYXBwZW5kKHBhcmFtOiBzdHJpbmcsIHZhbDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pIHx8IFtdO1xuICAgIGxpc3QucHVzaCh2YWwpO1xuICAgIHRoaXMucGFyYW1zTWFwLnNldChwYXJhbSwgbGlzdCk7XG4gIH1cblxuICAvLyBBIG1lcmdlIG9wZXJhdGlvblxuICAvLyBGb3IgZWFjaCBuYW1lLXZhbHVlcyBwYWlyIGluIGBzZWFyY2hQYXJhbXNgLCBwZXJmb3JtIGBhcHBlbmQobmFtZSwgdmFsdWUpYFxuICAvLyBmb3IgZWFjaCB2YWx1ZSBpbiBgdmFsdWVzYC5cbiAgLy9cbiAgLy8gRS5nOiBcImE9WzEsMl0sIGM9WzhdXCIgKyBcImE9WzMsNF0sIGI9WzddXCIgPSBcImE9WzEsMiwzLDRdLCBjPVs4XSwgYj1bN11cIlxuICAvL1xuICAvLyBUT0RPKEBjYWl0cCk6IGRvY3VtZW50IHRoaXMgYmV0dGVyXG4gIGFwcGVuZEFsbChzZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykge1xuICAgIHNlYXJjaFBhcmFtcy5wYXJhbXNNYXAuZm9yRWFjaCgodmFsdWUsIHBhcmFtKSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKSB8fCBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGlzdC5wdXNoKHZhbHVlW2ldKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFyYW1zTWFwLnNldChwYXJhbSwgbGlzdCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8vIEEgbWVyZ2Ugb3BlcmF0aW9uXG4gIC8vIEZvciBlYWNoIG5hbWUtdmFsdWVzIHBhaXIgaW4gYHNlYXJjaFBhcmFtc2AsIHBlcmZvcm0gYGRlbGV0ZShuYW1lKWAsXG4gIC8vIGZvbGxvd2VkIGJ5IGBzZXQobmFtZSwgdmFsdWVzKWBcbiAgLy9cbiAgLy8gRS5nOiBcImE9WzEsMiwzXSwgYz1bOF1cIiArIFwiYT1bNCw1LDZdLCBiPVs3XVwiID0gXCJhPVs0LDUsNl0sIGM9WzhdLCBiPVs3XVwiXG4gIC8vXG4gIC8vIFRPRE8oQGNhaXRwKTogZG9jdW1lbnQgdGhpcyBiZXR0ZXJcbiAgcmVwbGFjZUFsbChzZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykge1xuICAgIHNlYXJjaFBhcmFtcy5wYXJhbXNNYXAuZm9yRWFjaCgodmFsdWUsIHBhcmFtKSA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKSB8fCBbXTtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGlzdC5wdXNoKHZhbHVlW2ldKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFyYW1zTWFwLnNldChwYXJhbSwgbGlzdCk7XG4gICAgfSk7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IHBhcmFtc0xpc3Q6IHN0cmluZ1tdID0gW107XG4gICAgdGhpcy5wYXJhbXNNYXAuZm9yRWFjaCgodmFsdWVzLCBrKSA9PiB7XG4gICAgICB2YWx1ZXMuZm9yRWFjaChcbiAgICAgICAgICB2ID0+IHBhcmFtc0xpc3QucHVzaChcbiAgICAgICAgICAgICAgdGhpcy5xdWVyeUVuY29kZXIuZW5jb2RlS2V5KGspICsgJz0nICsgdGhpcy5xdWVyeUVuY29kZXIuZW5jb2RlVmFsdWUodikpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcGFyYW1zTGlzdC5qb2luKCcmJyk7XG4gIH1cblxuICBkZWxldGUgKHBhcmFtOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5wYXJhbXNNYXAuZGVsZXRlKHBhcmFtKTsgfVxufVxuIl19
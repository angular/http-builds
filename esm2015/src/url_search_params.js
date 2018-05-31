/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?=} rawParams
 * @return {?}
 */
function paramParser(rawParams = '') {
    const /** @type {?} */ map = new Map();
    if (rawParams.length > 0) {
        const /** @type {?} */ params = rawParams.split('&');
        params.forEach((param) => {
            const /** @type {?} */ eqIdx = param.indexOf('=');
            const [key, val] = eqIdx == -1 ? [param, ''] : [param.slice(0, eqIdx), param.slice(eqIdx + 1)];
            const /** @type {?} */ list = map.get(key) || [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
/**
 * @deprecated use \@angular/common/http instead
 *
 */
export class QueryEncoder {
    /**
     * @param {?} k
     * @return {?}
     */
    encodeKey(k) { return standardEncoding(k); }
    /**
     * @param {?} v
     * @return {?}
     */
    encodeValue(v) { return standardEncoding(v); }
}
/**
 * @param {?} v
 * @return {?}
 */
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
 * This class accepts an optional second parameter of ${\@link QueryEncoder},
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
 * import {URLSearchParams, QueryEncoder} from '\@angular/http';
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
 * @deprecated use \@angular/common/http instead
 */
export class URLSearchParams {
    /**
     * @param {?=} rawParams
     * @param {?=} queryEncoder
     */
    constructor(rawParams = '', queryEncoder = new QueryEncoder()) {
        this.rawParams = rawParams;
        this.queryEncoder = queryEncoder;
        this.paramsMap = paramParser(rawParams);
    }
    /**
     * @return {?}
     */
    clone() {
        const /** @type {?} */ clone = new URLSearchParams('', this.queryEncoder);
        clone.appendAll(this);
        return clone;
    }
    /**
     * @param {?} param
     * @return {?}
     */
    has(param) { return this.paramsMap.has(param); }
    /**
     * @param {?} param
     * @return {?}
     */
    get(param) {
        const /** @type {?} */ storedParam = this.paramsMap.get(param);
        return Array.isArray(storedParam) ? storedParam[0] : null;
    }
    /**
     * @param {?} param
     * @return {?}
     */
    getAll(param) { return this.paramsMap.get(param) || []; }
    /**
     * @param {?} param
     * @param {?} val
     * @return {?}
     */
    set(param, val) {
        if (val === void 0 || val === null) {
            this.delete(param);
            return;
        }
        const /** @type {?} */ list = this.paramsMap.get(param) || [];
        list.length = 0;
        list.push(val);
        this.paramsMap.set(param, list);
    }
    /**
     * @param {?} searchParams
     * @return {?}
     */
    setAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            const /** @type {?} */ list = this.paramsMap.get(param) || [];
            list.length = 0;
            list.push(value[0]);
            this.paramsMap.set(param, list);
        });
    }
    /**
     * @param {?} param
     * @param {?} val
     * @return {?}
     */
    append(param, val) {
        if (val === void 0 || val === null)
            return;
        const /** @type {?} */ list = this.paramsMap.get(param) || [];
        list.push(val);
        this.paramsMap.set(param, list);
    }
    /**
     * @param {?} searchParams
     * @return {?}
     */
    appendAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            const /** @type {?} */ list = this.paramsMap.get(param) || [];
            for (let /** @type {?} */ i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            this.paramsMap.set(param, list);
        });
    }
    /**
     * @param {?} searchParams
     * @return {?}
     */
    replaceAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            const /** @type {?} */ list = this.paramsMap.get(param) || [];
            list.length = 0;
            for (let /** @type {?} */ i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            this.paramsMap.set(param, list);
        });
    }
    /**
     * @return {?}
     */
    toString() {
        const /** @type {?} */ paramsList = [];
        this.paramsMap.forEach((values, k) => {
            values.forEach(v => paramsList.push(this.queryEncoder.encodeKey(k) + '=' + this.queryEncoder.encodeValue(v)));
        });
        return paramsList.join('&');
    }
    /**
     * @param {?} param
     * @return {?}
     */
    delete(param) { this.paramsMap.delete(param); }
}
function URLSearchParams_tsickle_Closure_declarations() {
    /** @type {?} */
    URLSearchParams.prototype.paramsMap;
    /** @type {?} */
    URLSearchParams.prototype.rawParams;
    /** @type {?} */
    URLSearchParams.prototype.queryEncoder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3NlYXJjaF9wYXJhbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy91cmxfc2VhcmNoX3BhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFRQSxxQkFBcUIsWUFBb0IsRUFBRTtJQUN6Qyx1QkFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7SUFDeEMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN4Qix1QkFBTSxNQUFNLEdBQWEsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDL0IsdUJBQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FDWixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEYsdUJBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwQixDQUFDLENBQUM7S0FDSjtJQUNELE9BQU8sR0FBRyxDQUFDO0NBQ1o7Ozs7O0FBSUQsTUFBTTs7Ozs7SUFDSixTQUFTLENBQUMsQ0FBUyxJQUFZLE9B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RTtZQUM5Qyx1QkFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEtBQUsscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNyQjtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqQyxDQUFDLENBQUM7S0FDSjs7OztJQUVELFFBQVE7UUFDTix1QkFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25GLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM3Qjs7Ozs7SUFFRCxNQUFNLENBQUUsS0FBYSxJQUFVLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Q0FDL0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmZ1bmN0aW9uIHBhcmFtUGFyc2VyKHJhd1BhcmFtczogc3RyaW5nID0gJycpOiBNYXA8c3RyaW5nLCBzdHJpbmdbXT4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG4gIGlmIChyYXdQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHBhcmFtczogc3RyaW5nW10gPSByYXdQYXJhbXMuc3BsaXQoJyYnKTtcbiAgICBwYXJhbXMuZm9yRWFjaCgocGFyYW06IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZXFJZHggPSBwYXJhbS5pbmRleE9mKCc9Jyk7XG4gICAgICBjb25zdCBba2V5LCB2YWxdOiBzdHJpbmdbXSA9XG4gICAgICAgICAgZXFJZHggPT0gLTEgPyBbcGFyYW0sICcnXSA6IFtwYXJhbS5zbGljZSgwLCBlcUlkeCksIHBhcmFtLnNsaWNlKGVxSWR4ICsgMSldO1xuICAgICAgY29uc3QgbGlzdCA9IG1hcC5nZXQoa2V5KSB8fCBbXTtcbiAgICAgIGxpc3QucHVzaCh2YWwpO1xuICAgICAgbWFwLnNldChrZXksIGxpc3QpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBtYXA7XG59XG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSBAYW5ndWxhci9jb21tb24vaHR0cCBpbnN0ZWFkXG4gKiovXG5leHBvcnQgY2xhc3MgUXVlcnlFbmNvZGVyIHtcbiAgZW5jb2RlS2V5KGs6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBzdGFuZGFyZEVuY29kaW5nKGspOyB9XG5cbiAgZW5jb2RlVmFsdWUodjogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIHN0YW5kYXJkRW5jb2Rpbmcodik7IH1cbn1cblxuZnVuY3Rpb24gc3RhbmRhcmRFbmNvZGluZyh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHYpXG4gICAgICAucmVwbGFjZSgvJTQwL2dpLCAnQCcpXG4gICAgICAucmVwbGFjZSgvJTNBL2dpLCAnOicpXG4gICAgICAucmVwbGFjZSgvJTI0L2dpLCAnJCcpXG4gICAgICAucmVwbGFjZSgvJTJDL2dpLCAnLCcpXG4gICAgICAucmVwbGFjZSgvJTNCL2dpLCAnOycpXG4gICAgICAucmVwbGFjZSgvJTJCL2dpLCAnKycpXG4gICAgICAucmVwbGFjZSgvJTNEL2dpLCAnPScpXG4gICAgICAucmVwbGFjZSgvJTNGL2dpLCAnPycpXG4gICAgICAucmVwbGFjZSgvJTJGL2dpLCAnLycpO1xufVxuXG4vKipcbiAqIE1hcC1saWtlIHJlcHJlc2VudGF0aW9uIG9mIHVybCBzZWFyY2ggcGFyYW1ldGVycywgYmFzZWQgb25cbiAqIFtVUkxTZWFyY2hQYXJhbXNdKGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsc2VhcmNocGFyYW1zKSBpbiB0aGUgdXJsIGxpdmluZyBzdGFuZGFyZCxcbiAqIHdpdGggc2V2ZXJhbCBleHRlbnNpb25zIGZvciBtZXJnaW5nIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RzOlxuICogICAtIHNldEFsbCgpXG4gKiAgIC0gYXBwZW5kQWxsKClcbiAqICAgLSByZXBsYWNlQWxsKClcbiAqXG4gKiBUaGlzIGNsYXNzIGFjY2VwdHMgYW4gb3B0aW9uYWwgc2Vjb25kIHBhcmFtZXRlciBvZiAke0BsaW5rIFF1ZXJ5RW5jb2Rlcn0sXG4gKiB3aGljaCBpcyB1c2VkIHRvIHNlcmlhbGl6ZSBwYXJhbWV0ZXJzIGJlZm9yZSBtYWtpbmcgYSByZXF1ZXN0LiBCeSBkZWZhdWx0LFxuICogYFF1ZXJ5RW5jb2RlcmAgZW5jb2RlcyBrZXlzIGFuZCB2YWx1ZXMgb2YgcGFyYW1ldGVycyB1c2luZyBgZW5jb2RlVVJJQ29tcG9uZW50YCxcbiAqIGFuZCB0aGVuIHVuLWVuY29kZXMgY2VydGFpbiBjaGFyYWN0ZXJzIHRoYXQgYXJlIGFsbG93ZWQgdG8gYmUgcGFydCBvZiB0aGUgcXVlcnlcbiAqIGFjY29yZGluZyB0byBJRVRGIFJGQyAzOTg2OiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzk4Ni5cbiAqXG4gKiBUaGVzZSBhcmUgdGhlIGNoYXJhY3RlcnMgdGhhdCBhcmUgbm90IGVuY29kZWQ6IGAhICQgXFwnICggKSAqICsgLCA7IEEgOSAtIC4gXyB+ID8gL2BcbiAqXG4gKiBJZiB0aGUgc2V0IG9mIGFsbG93ZWQgcXVlcnkgY2hhcmFjdGVycyBpcyBub3QgYWNjZXB0YWJsZSBmb3IgYSBwYXJ0aWN1bGFyIGJhY2tlbmQsXG4gKiBgUXVlcnlFbmNvZGVyYCBjYW4gYmUgc3ViY2xhc3NlZCBhbmQgcHJvdmlkZWQgYXMgdGhlIDJuZCBhcmd1bWVudCB0byBVUkxTZWFyY2hQYXJhbXMuXG4gKlxuICogYGBgXG4gKiBpbXBvcnQge1VSTFNlYXJjaFBhcmFtcywgUXVlcnlFbmNvZGVyfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAqIGNsYXNzIE15UXVlcnlFbmNvZGVyIGV4dGVuZHMgUXVlcnlFbmNvZGVyIHtcbiAqICAgZW5jb2RlS2V5KGs6IHN0cmluZyk6IHN0cmluZyB7XG4gKiAgICAgcmV0dXJuIG15RW5jb2RpbmdGdW5jdGlvbihrKTtcbiAqICAgfVxuICpcbiAqICAgZW5jb2RlVmFsdWUodjogc3RyaW5nKTogc3RyaW5nIHtcbiAqICAgICByZXR1cm4gbXlFbmNvZGluZ0Z1bmN0aW9uKHYpO1xuICogICB9XG4gKiB9XG4gKlxuICogbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoJycsIG5ldyBNeVF1ZXJ5RW5jb2RlcigpKTtcbiAqIGBgYFxuICogQGRlcHJlY2F0ZWQgdXNlIEBhbmd1bGFyL2NvbW1vbi9odHRwIGluc3RlYWRcbiAqL1xuZXhwb3J0IGNsYXNzIFVSTFNlYXJjaFBhcmFtcyB7XG4gIHBhcmFtc01hcDogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByYXdQYXJhbXM6IHN0cmluZyA9ICcnLCBwcml2YXRlIHF1ZXJ5RW5jb2RlcjogUXVlcnlFbmNvZGVyID0gbmV3IFF1ZXJ5RW5jb2RlcigpKSB7XG4gICAgdGhpcy5wYXJhbXNNYXAgPSBwYXJhbVBhcnNlcihyYXdQYXJhbXMpO1xuICB9XG5cbiAgY2xvbmUoKTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgICBjb25zdCBjbG9uZSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoJycsIHRoaXMucXVlcnlFbmNvZGVyKTtcbiAgICBjbG9uZS5hcHBlbmRBbGwodGhpcyk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgaGFzKHBhcmFtOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFyYW1zTWFwLmhhcyhwYXJhbSk7IH1cblxuICBnZXQocGFyYW06IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICBjb25zdCBzdG9yZWRQYXJhbSA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSk7XG5cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShzdG9yZWRQYXJhbSkgPyBzdG9yZWRQYXJhbVswXSA6IG51bGw7XG4gIH1cblxuICBnZXRBbGwocGFyYW06IHN0cmluZyk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSkgfHwgW107IH1cblxuICBzZXQocGFyYW06IHN0cmluZywgdmFsOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsKSB7XG4gICAgICB0aGlzLmRlbGV0ZShwYXJhbSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pIHx8IFtdO1xuICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICBsaXN0LnB1c2godmFsKTtcbiAgICB0aGlzLnBhcmFtc01hcC5zZXQocGFyYW0sIGxpc3QpO1xuICB9XG5cbiAgLy8gQSBtZXJnZSBvcGVyYXRpb25cbiAgLy8gRm9yIGVhY2ggbmFtZS12YWx1ZXMgcGFpciBpbiBgc2VhcmNoUGFyYW1zYCwgcGVyZm9ybSBgc2V0KG5hbWUsIHZhbHVlc1swXSlgXG4gIC8vXG4gIC8vIEUuZzogXCJhPVsxLDIsM10sIGM9WzhdXCIgKyBcImE9WzQsNSw2XSwgYj1bN11cIiA9IFwiYT1bNF0sIGM9WzhdLCBiPVs3XVwiXG4gIC8vXG4gIC8vIFRPRE8oQGNhaXRwKTogZG9jdW1lbnQgdGhpcyBiZXR0ZXJcbiAgc2V0QWxsKHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgc2VhcmNoUGFyYW1zLnBhcmFtc01hcC5mb3JFYWNoKCh2YWx1ZSwgcGFyYW0pID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pIHx8IFtdO1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgbGlzdC5wdXNoKHZhbHVlWzBdKTtcbiAgICAgIHRoaXMucGFyYW1zTWFwLnNldChwYXJhbSwgbGlzdCk7XG4gICAgfSk7XG4gIH1cblxuICBhcHBlbmQocGFyYW06IHN0cmluZywgdmFsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsKSByZXR1cm47XG4gICAgY29uc3QgbGlzdCA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSkgfHwgW107XG4gICAgbGlzdC5wdXNoKHZhbCk7XG4gICAgdGhpcy5wYXJhbXNNYXAuc2V0KHBhcmFtLCBsaXN0KTtcbiAgfVxuXG4gIC8vIEEgbWVyZ2Ugb3BlcmF0aW9uXG4gIC8vIEZvciBlYWNoIG5hbWUtdmFsdWVzIHBhaXIgaW4gYHNlYXJjaFBhcmFtc2AsIHBlcmZvcm0gYGFwcGVuZChuYW1lLCB2YWx1ZSlgXG4gIC8vIGZvciBlYWNoIHZhbHVlIGluIGB2YWx1ZXNgLlxuICAvL1xuICAvLyBFLmc6IFwiYT1bMSwyXSwgYz1bOF1cIiArIFwiYT1bMyw0XSwgYj1bN11cIiA9IFwiYT1bMSwyLDMsNF0sIGM9WzhdLCBiPVs3XVwiXG4gIC8vXG4gIC8vIFRPRE8oQGNhaXRwKTogZG9jdW1lbnQgdGhpcyBiZXR0ZXJcbiAgYXBwZW5kQWxsKHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgc2VhcmNoUGFyYW1zLnBhcmFtc01hcC5mb3JFYWNoKCh2YWx1ZSwgcGFyYW0pID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pIHx8IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBsaXN0LnB1c2godmFsdWVbaV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJhbXNNYXAuc2V0KHBhcmFtLCBsaXN0KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLy8gQSBtZXJnZSBvcGVyYXRpb25cbiAgLy8gRm9yIGVhY2ggbmFtZS12YWx1ZXMgcGFpciBpbiBgc2VhcmNoUGFyYW1zYCwgcGVyZm9ybSBgZGVsZXRlKG5hbWUpYCxcbiAgLy8gZm9sbG93ZWQgYnkgYHNldChuYW1lLCB2YWx1ZXMpYFxuICAvL1xuICAvLyBFLmc6IFwiYT1bMSwyLDNdLCBjPVs4XVwiICsgXCJhPVs0LDUsNl0sIGI9WzddXCIgPSBcImE9WzQsNSw2XSwgYz1bOF0sIGI9WzddXCJcbiAgLy9cbiAgLy8gVE9ETyhAY2FpdHApOiBkb2N1bWVudCB0aGlzIGJldHRlclxuICByZXBsYWNlQWxsKHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgc2VhcmNoUGFyYW1zLnBhcmFtc01hcC5mb3JFYWNoKCh2YWx1ZSwgcGFyYW0pID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pIHx8IFtdO1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBsaXN0LnB1c2godmFsdWVbaV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJhbXNNYXAuc2V0KHBhcmFtLCBsaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3QgcGFyYW1zTGlzdDogc3RyaW5nW10gPSBbXTtcbiAgICB0aGlzLnBhcmFtc01hcC5mb3JFYWNoKCh2YWx1ZXMsIGspID0+IHtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKFxuICAgICAgICAgIHYgPT4gcGFyYW1zTGlzdC5wdXNoKFxuICAgICAgICAgICAgICB0aGlzLnF1ZXJ5RW5jb2Rlci5lbmNvZGVLZXkoaykgKyAnPScgKyB0aGlzLnF1ZXJ5RW5jb2Rlci5lbmNvZGVWYWx1ZSh2KSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBwYXJhbXNMaXN0LmpvaW4oJyYnKTtcbiAgfVxuXG4gIGRlbGV0ZSAocGFyYW06IHN0cmluZyk6IHZvaWQgeyB0aGlzLnBhcmFtc01hcC5kZWxldGUocGFyYW0pOyB9XG59XG4iXX0=
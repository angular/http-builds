/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function paramParser(rawParams = '') {
    const map = new Map();
    if (rawParams.length > 0) {
        const params = rawParams.split('&');
        params.forEach((param) => {
            const eqIdx = param.indexOf('=');
            const [key, val] = eqIdx == -1 ? [param, ''] : [param.slice(0, eqIdx), param.slice(eqIdx + 1)];
            const list = map.get(key) || [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
/**
 * @deprecated see https://angular.io/guide/http
 **/
export class QueryEncoder {
    encodeKey(k) { return standardEncoding(k); }
    encodeValue(v) { return standardEncoding(v); }
}
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
export class URLSearchParams {
    constructor(rawParams = '', queryEncoder = new QueryEncoder()) {
        this.rawParams = rawParams;
        this.queryEncoder = queryEncoder;
        this.paramsMap = paramParser(rawParams);
    }
    clone() {
        const clone = new URLSearchParams('', this.queryEncoder);
        clone.appendAll(this);
        return clone;
    }
    has(param) { return this.paramsMap.has(param); }
    get(param) {
        const storedParam = this.paramsMap.get(param);
        return Array.isArray(storedParam) ? storedParam[0] : null;
    }
    getAll(param) { return this.paramsMap.get(param) || []; }
    set(param, val) {
        if (val === void 0 || val === null) {
            this.delete(param);
            return;
        }
        const list = this.paramsMap.get(param) || [];
        list.length = 0;
        list.push(val);
        this.paramsMap.set(param, list);
    }
    // A merge operation
    // For each name-values pair in `searchParams`, perform `set(name, values[0])`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    setAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            const list = this.paramsMap.get(param) || [];
            list.length = 0;
            list.push(value[0]);
            this.paramsMap.set(param, list);
        });
    }
    append(param, val) {
        if (val === void 0 || val === null)
            return;
        const list = this.paramsMap.get(param) || [];
        list.push(val);
        this.paramsMap.set(param, list);
    }
    // A merge operation
    // For each name-values pair in `searchParams`, perform `append(name, value)`
    // for each value in `values`.
    //
    // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    appendAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            const list = this.paramsMap.get(param) || [];
            for (let i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            this.paramsMap.set(param, list);
        });
    }
    // A merge operation
    // For each name-values pair in `searchParams`, perform `delete(name)`,
    // followed by `set(name, values)`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    replaceAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            const list = this.paramsMap.get(param) || [];
            list.length = 0;
            for (let i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            this.paramsMap.set(param, list);
        });
    }
    toString() {
        const paramsList = [];
        this.paramsMap.forEach((values, k) => {
            values.forEach(v => paramsList.push(this.queryEncoder.encodeKey(k) + '=' + this.queryEncoder.encodeValue(v)));
        });
        return paramsList.join('&');
    }
    delete(param) { this.paramsMap.delete(param); }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3NlYXJjaF9wYXJhbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy91cmxfc2VhcmNoX3BhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxxQkFBcUIsWUFBb0IsRUFBRTtJQUN6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztJQUN4QyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3hCLE1BQU0sTUFBTSxHQUFhLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFO1lBQy9CLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FDWixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEYsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFDRDs7SUFFSTtBQUNKLE1BQU07SUFDSixTQUFTLENBQUMsQ0FB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QUFDLENBQUM7UUFDcEYsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELE1BQU0sQ0FBRSxLQUFhLElBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQy9EIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5mdW5jdGlvbiBwYXJhbVBhcnNlcihyYXdQYXJhbXM6IHN0cmluZyA9ICcnKTogTWFwPHN0cmluZywgc3RyaW5nW10+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZ1tdPigpO1xuICBpZiAocmF3UGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBwYXJhbXM6IHN0cmluZ1tdID0gcmF3UGFyYW1zLnNwbGl0KCcmJyk7XG4gICAgcGFyYW1zLmZvckVhY2goKHBhcmFtOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGVxSWR4ID0gcGFyYW0uaW5kZXhPZignPScpO1xuICAgICAgY29uc3QgW2tleSwgdmFsXTogc3RyaW5nW10gPVxuICAgICAgICAgIGVxSWR4ID09IC0xID8gW3BhcmFtLCAnJ10gOiBbcGFyYW0uc2xpY2UoMCwgZXFJZHgpLCBwYXJhbS5zbGljZShlcUlkeCArIDEpXTtcbiAgICAgIGNvbnN0IGxpc3QgPSBtYXAuZ2V0KGtleSkgfHwgW107XG4gICAgICBsaXN0LnB1c2godmFsKTtcbiAgICAgIG1hcC5zZXQoa2V5LCBsaXN0KTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gbWFwO1xufVxuLyoqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqKi9cbmV4cG9ydCBjbGFzcyBRdWVyeUVuY29kZXIge1xuICBlbmNvZGVLZXkoazogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIHN0YW5kYXJkRW5jb2Rpbmcoayk7IH1cblxuICBlbmNvZGVWYWx1ZSh2OiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gc3RhbmRhcmRFbmNvZGluZyh2KTsgfVxufVxuXG5mdW5jdGlvbiBzdGFuZGFyZEVuY29kaW5nKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodilcbiAgICAgIC5yZXBsYWNlKC8lNDAvZ2ksICdAJylcbiAgICAgIC5yZXBsYWNlKC8lM0EvZ2ksICc6JylcbiAgICAgIC5yZXBsYWNlKC8lMjQvZ2ksICckJylcbiAgICAgIC5yZXBsYWNlKC8lMkMvZ2ksICcsJylcbiAgICAgIC5yZXBsYWNlKC8lM0IvZ2ksICc7JylcbiAgICAgIC5yZXBsYWNlKC8lMkIvZ2ksICcrJylcbiAgICAgIC5yZXBsYWNlKC8lM0QvZ2ksICc9JylcbiAgICAgIC5yZXBsYWNlKC8lM0YvZ2ksICc/JylcbiAgICAgIC5yZXBsYWNlKC8lMkYvZ2ksICcvJyk7XG59XG5cbi8qKlxuICogTWFwLWxpa2UgcmVwcmVzZW50YXRpb24gb2YgdXJsIHNlYXJjaCBwYXJhbWV0ZXJzLCBiYXNlZCBvblxuICogW1VSTFNlYXJjaFBhcmFtc10oaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmxzZWFyY2hwYXJhbXMpIGluIHRoZSB1cmwgbGl2aW5nIHN0YW5kYXJkLFxuICogd2l0aCBzZXZlcmFsIGV4dGVuc2lvbnMgZm9yIG1lcmdpbmcgVVJMU2VhcmNoUGFyYW1zIG9iamVjdHM6XG4gKiAgIC0gc2V0QWxsKClcbiAqICAgLSBhcHBlbmRBbGwoKVxuICogICAtIHJlcGxhY2VBbGwoKVxuICpcbiAqIFRoaXMgY2xhc3MgYWNjZXB0cyBhbiBvcHRpb25hbCBzZWNvbmQgcGFyYW1ldGVyIG9mICR7QGxpbmsgUXVlcnlFbmNvZGVyfSxcbiAqIHdoaWNoIGlzIHVzZWQgdG8gc2VyaWFsaXplIHBhcmFtZXRlcnMgYmVmb3JlIG1ha2luZyBhIHJlcXVlc3QuIEJ5IGRlZmF1bHQsXG4gKiBgUXVlcnlFbmNvZGVyYCBlbmNvZGVzIGtleXMgYW5kIHZhbHVlcyBvZiBwYXJhbWV0ZXJzIHVzaW5nIGBlbmNvZGVVUklDb21wb25lbnRgLFxuICogYW5kIHRoZW4gdW4tZW5jb2RlcyBjZXJ0YWluIGNoYXJhY3RlcnMgdGhhdCBhcmUgYWxsb3dlZCB0byBiZSBwYXJ0IG9mIHRoZSBxdWVyeVxuICogYWNjb3JkaW5nIHRvIElFVEYgUkZDIDM5ODY6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzOTg2LlxuICpcbiAqIFRoZXNlIGFyZSB0aGUgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgZW5jb2RlZDogYCEgJCBcXCcgKCApICogKyAsIDsgQSA5IC0gLiBfIH4gPyAvYFxuICpcbiAqIElmIHRoZSBzZXQgb2YgYWxsb3dlZCBxdWVyeSBjaGFyYWN0ZXJzIGlzIG5vdCBhY2NlcHRhYmxlIGZvciBhIHBhcnRpY3VsYXIgYmFja2VuZCxcbiAqIGBRdWVyeUVuY29kZXJgIGNhbiBiZSBzdWJjbGFzc2VkIGFuZCBwcm92aWRlZCBhcyB0aGUgMm5kIGFyZ3VtZW50IHRvIFVSTFNlYXJjaFBhcmFtcy5cbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7VVJMU2VhcmNoUGFyYW1zLCBRdWVyeUVuY29kZXJ9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuICogY2xhc3MgTXlRdWVyeUVuY29kZXIgZXh0ZW5kcyBRdWVyeUVuY29kZXIge1xuICogICBlbmNvZGVLZXkoazogc3RyaW5nKTogc3RyaW5nIHtcbiAqICAgICByZXR1cm4gbXlFbmNvZGluZ0Z1bmN0aW9uKGspO1xuICogICB9XG4gKlxuICogICBlbmNvZGVWYWx1ZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICogICAgIHJldHVybiBteUVuY29kaW5nRnVuY3Rpb24odik7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygnJywgbmV3IE15UXVlcnlFbmNvZGVyKCkpO1xuICogYGBgXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqL1xuZXhwb3J0IGNsYXNzIFVSTFNlYXJjaFBhcmFtcyB7XG4gIHBhcmFtc01hcDogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByYXdQYXJhbXM6IHN0cmluZyA9ICcnLCBwcml2YXRlIHF1ZXJ5RW5jb2RlcjogUXVlcnlFbmNvZGVyID0gbmV3IFF1ZXJ5RW5jb2RlcigpKSB7XG4gICAgdGhpcy5wYXJhbXNNYXAgPSBwYXJhbVBhcnNlcihyYXdQYXJhbXMpO1xuICB9XG5cbiAgY2xvbmUoKTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgICBjb25zdCBjbG9uZSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoJycsIHRoaXMucXVlcnlFbmNvZGVyKTtcbiAgICBjbG9uZS5hcHBlbmRBbGwodGhpcyk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgaGFzKHBhcmFtOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFyYW1zTWFwLmhhcyhwYXJhbSk7IH1cblxuICBnZXQocGFyYW06IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgICBjb25zdCBzdG9yZWRQYXJhbSA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSk7XG5cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShzdG9yZWRQYXJhbSkgPyBzdG9yZWRQYXJhbVswXSA6IG51bGw7XG4gIH1cblxuICBnZXRBbGwocGFyYW06IHN0cmluZyk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSkgfHwgW107IH1cblxuICBzZXQocGFyYW06IHN0cmluZywgdmFsOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsKSB7XG4gICAgICB0aGlzLmRlbGV0ZShwYXJhbSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pIHx8IFtdO1xuICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICBsaXN0LnB1c2godmFsKTtcbiAgICB0aGlzLnBhcmFtc01hcC5zZXQocGFyYW0sIGxpc3QpO1xuICB9XG5cbiAgLy8gQSBtZXJnZSBvcGVyYXRpb25cbiAgLy8gRm9yIGVhY2ggbmFtZS12YWx1ZXMgcGFpciBpbiBgc2VhcmNoUGFyYW1zYCwgcGVyZm9ybSBgc2V0KG5hbWUsIHZhbHVlc1swXSlgXG4gIC8vXG4gIC8vIEUuZzogXCJhPVsxLDIsM10sIGM9WzhdXCIgKyBcImE9WzQsNSw2XSwgYj1bN11cIiA9IFwiYT1bNF0sIGM9WzhdLCBiPVs3XVwiXG4gIC8vXG4gIC8vIFRPRE8oQGNhaXRwKTogZG9jdW1lbnQgdGhpcyBiZXR0ZXJcbiAgc2V0QWxsKHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgc2VhcmNoUGFyYW1zLnBhcmFtc01hcC5mb3JFYWNoKCh2YWx1ZSwgcGFyYW0pID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pIHx8IFtdO1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgbGlzdC5wdXNoKHZhbHVlWzBdKTtcbiAgICAgIHRoaXMucGFyYW1zTWFwLnNldChwYXJhbSwgbGlzdCk7XG4gICAgfSk7XG4gIH1cblxuICBhcHBlbmQocGFyYW06IHN0cmluZywgdmFsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsKSByZXR1cm47XG4gICAgY29uc3QgbGlzdCA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSkgfHwgW107XG4gICAgbGlzdC5wdXNoKHZhbCk7XG4gICAgdGhpcy5wYXJhbXNNYXAuc2V0KHBhcmFtLCBsaXN0KTtcbiAgfVxuXG4gIC8vIEEgbWVyZ2Ugb3BlcmF0aW9uXG4gIC8vIEZvciBlYWNoIG5hbWUtdmFsdWVzIHBhaXIgaW4gYHNlYXJjaFBhcmFtc2AsIHBlcmZvcm0gYGFwcGVuZChuYW1lLCB2YWx1ZSlgXG4gIC8vIGZvciBlYWNoIHZhbHVlIGluIGB2YWx1ZXNgLlxuICAvL1xuICAvLyBFLmc6IFwiYT1bMSwyXSwgYz1bOF1cIiArIFwiYT1bMyw0XSwgYj1bN11cIiA9IFwiYT1bMSwyLDMsNF0sIGM9WzhdLCBiPVs3XVwiXG4gIC8vXG4gIC8vIFRPRE8oQGNhaXRwKTogZG9jdW1lbnQgdGhpcyBiZXR0ZXJcbiAgYXBwZW5kQWxsKHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgc2VhcmNoUGFyYW1zLnBhcmFtc01hcC5mb3JFYWNoKCh2YWx1ZSwgcGFyYW0pID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pIHx8IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBsaXN0LnB1c2godmFsdWVbaV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJhbXNNYXAuc2V0KHBhcmFtLCBsaXN0KTtcbiAgICB9KTtcbiAgfVxuXG5cbiAgLy8gQSBtZXJnZSBvcGVyYXRpb25cbiAgLy8gRm9yIGVhY2ggbmFtZS12YWx1ZXMgcGFpciBpbiBgc2VhcmNoUGFyYW1zYCwgcGVyZm9ybSBgZGVsZXRlKG5hbWUpYCxcbiAgLy8gZm9sbG93ZWQgYnkgYHNldChuYW1lLCB2YWx1ZXMpYFxuICAvL1xuICAvLyBFLmc6IFwiYT1bMSwyLDNdLCBjPVs4XVwiICsgXCJhPVs0LDUsNl0sIGI9WzddXCIgPSBcImE9WzQsNSw2XSwgYz1bOF0sIGI9WzddXCJcbiAgLy9cbiAgLy8gVE9ETyhAY2FpdHApOiBkb2N1bWVudCB0aGlzIGJldHRlclxuICByZXBsYWNlQWxsKHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgc2VhcmNoUGFyYW1zLnBhcmFtc01hcC5mb3JFYWNoKCh2YWx1ZSwgcGFyYW0pID0+IHtcbiAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pIHx8IFtdO1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBsaXN0LnB1c2godmFsdWVbaV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJhbXNNYXAuc2V0KHBhcmFtLCBsaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3QgcGFyYW1zTGlzdDogc3RyaW5nW10gPSBbXTtcbiAgICB0aGlzLnBhcmFtc01hcC5mb3JFYWNoKCh2YWx1ZXMsIGspID0+IHtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKFxuICAgICAgICAgIHYgPT4gcGFyYW1zTGlzdC5wdXNoKFxuICAgICAgICAgICAgICB0aGlzLnF1ZXJ5RW5jb2Rlci5lbmNvZGVLZXkoaykgKyAnPScgKyB0aGlzLnF1ZXJ5RW5jb2Rlci5lbmNvZGVWYWx1ZSh2KSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBwYXJhbXNMaXN0LmpvaW4oJyYnKTtcbiAgfVxuXG4gIGRlbGV0ZSAocGFyYW06IHN0cmluZyk6IHZvaWQgeyB0aGlzLnBhcmFtc01hcC5kZWxldGUocGFyYW0pOyB9XG59XG4iXX0=
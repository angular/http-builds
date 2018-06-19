/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { stringToArrayBuffer } from './http_utils';
import { URLSearchParams } from './url_search_params';
/**
 * HTTP request body used by both {@link Request} and {@link Response}
 * https://fetch.spec.whatwg.org/#body
 */
export class Body {
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
    json() {
        if (typeof this._body === 'string') {
            return JSON.parse(this._body);
        }
        if (this._body instanceof ArrayBuffer) {
            return JSON.parse(this.text());
        }
        return this._body;
    }
    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     *
     * When decoding an `ArrayBuffer`, the optional `encodingHint` parameter determines how the
     * bytes in the buffer will be interpreted. Valid values are:
     *
     * - `legacy` - incorrectly interpret the bytes as UTF-16 (technically, UCS-2). Only characters
     *   in the Basic Multilingual Plane are supported, surrogate pairs are not handled correctly.
     *   In addition, the endianness of the 16-bit octet pairs in the `ArrayBuffer` is not taken
     *   into consideration. This is the default behavior to avoid breaking apps, but should be
     *   considered deprecated.
     *
     * - `iso-8859` - interpret the bytes as ISO-8859 (which can be used for ASCII encoded text).
     */
    text(encodingHint = 'legacy') {
        if (this._body instanceof URLSearchParams) {
            return this._body.toString();
        }
        if (this._body instanceof ArrayBuffer) {
            switch (encodingHint) {
                case 'legacy':
                    return String.fromCharCode.apply(null, new Uint16Array(this._body));
                case 'iso-8859':
                    return String.fromCharCode.apply(null, new Uint8Array(this._body));
                default:
                    throw new Error(`Invalid value for encodingHint: ${encodingHint}`);
            }
        }
        if (this._body == null) {
            return '';
        }
        if (typeof this._body === 'object') {
            return JSON.stringify(this._body, null, 2);
        }
        return this._body.toString();
    }
    /**
     * Return the body as an ArrayBuffer
     */
    arrayBuffer() {
        if (this._body instanceof ArrayBuffer) {
            return this._body;
        }
        return stringToArrayBuffer(this.text());
    }
    /**
      * Returns the request's body as a Blob, assuming that body exists.
      */
    blob() {
        if (this._body instanceof Blob) {
            return this._body;
        }
        if (this._body instanceof ArrayBuffer) {
            return new Blob([this._body]);
        }
        throw new Error('The request body isn\'t either a blob or an array buffer');
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2JvZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUdwRDs7O0dBR0c7QUFDSCxNQUFNO0lBTUo7O09BRUc7SUFDSCxJQUFJO1FBQ0YsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkM7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLFlBQVksV0FBVyxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNoQztRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILElBQUksQ0FBQyxlQUFvQyxRQUFRO1FBQy9DLElBQUksSUFBSSxDQUFDLEtBQUssWUFBWSxlQUFlLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzlCO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxZQUFZLFdBQVcsRUFBRTtZQUNyQyxRQUFRLFlBQVksRUFBRTtnQkFDcEIsS0FBSyxRQUFRO29CQUNYLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFvQixDQUFDLENBQUMsQ0FBQztnQkFDckYsS0FBSyxVQUFVO29CQUNiLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFvQixDQUFDLENBQUMsQ0FBQztnQkFDcEY7b0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQ0FBbUMsWUFBWSxFQUFFLENBQUMsQ0FBQzthQUN0RTtTQUNGO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUN0QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ2xDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsS0FBSyxZQUFZLFdBQVcsRUFBRTtZQUNyQyxPQUFvQixJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ2hDO1FBRUQsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O1FBRUk7SUFDSixJQUFJO1FBQ0YsSUFBSSxJQUFJLENBQUMsS0FBSyxZQUFZLElBQUksRUFBRTtZQUM5QixPQUFhLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDekI7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLFlBQVksV0FBVyxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMvQjtRQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztJQUM5RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7c3RyaW5nVG9BcnJheUJ1ZmZlcn0gZnJvbSAnLi9odHRwX3V0aWxzJztcbmltcG9ydCB7VVJMU2VhcmNoUGFyYW1zfSBmcm9tICcuL3VybF9zZWFyY2hfcGFyYW1zJztcblxuXG4vKipcbiAqIEhUVFAgcmVxdWVzdCBib2R5IHVzZWQgYnkgYm90aCB7QGxpbmsgUmVxdWVzdH0gYW5kIHtAbGluayBSZXNwb25zZX1cbiAqIGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNib2R5XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCb2R5IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHJvdGVjdGVkIF9ib2R5OiBhbnk7XG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIHJldHVybiBib2R5IGFzIHBhcnNlZCBgSlNPTmAgb2JqZWN0LCBvciByYWlzZXMgYW4gZXhjZXB0aW9uLlxuICAgKi9cbiAganNvbigpOiBhbnkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5fYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKDxzdHJpbmc+dGhpcy5fYm9keSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2JvZHkgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy50ZXh0KCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9ib2R5O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGJvZHkgYXMgYSBzdHJpbmcsIHByZXN1bWluZyBgdG9TdHJpbmcoKWAgY2FuIGJlIGNhbGxlZCBvbiB0aGUgcmVzcG9uc2UgYm9keS5cbiAgICpcbiAgICogV2hlbiBkZWNvZGluZyBhbiBgQXJyYXlCdWZmZXJgLCB0aGUgb3B0aW9uYWwgYGVuY29kaW5nSGludGAgcGFyYW1ldGVyIGRldGVybWluZXMgaG93IHRoZVxuICAgKiBieXRlcyBpbiB0aGUgYnVmZmVyIHdpbGwgYmUgaW50ZXJwcmV0ZWQuIFZhbGlkIHZhbHVlcyBhcmU6XG4gICAqXG4gICAqIC0gYGxlZ2FjeWAgLSBpbmNvcnJlY3RseSBpbnRlcnByZXQgdGhlIGJ5dGVzIGFzIFVURi0xNiAodGVjaG5pY2FsbHksIFVDUy0yKS4gT25seSBjaGFyYWN0ZXJzXG4gICAqICAgaW4gdGhlIEJhc2ljIE11bHRpbGluZ3VhbCBQbGFuZSBhcmUgc3VwcG9ydGVkLCBzdXJyb2dhdGUgcGFpcnMgYXJlIG5vdCBoYW5kbGVkIGNvcnJlY3RseS5cbiAgICogICBJbiBhZGRpdGlvbiwgdGhlIGVuZGlhbm5lc3Mgb2YgdGhlIDE2LWJpdCBvY3RldCBwYWlycyBpbiB0aGUgYEFycmF5QnVmZmVyYCBpcyBub3QgdGFrZW5cbiAgICogICBpbnRvIGNvbnNpZGVyYXRpb24uIFRoaXMgaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3IgdG8gYXZvaWQgYnJlYWtpbmcgYXBwcywgYnV0IHNob3VsZCBiZVxuICAgKiAgIGNvbnNpZGVyZWQgZGVwcmVjYXRlZC5cbiAgICpcbiAgICogLSBgaXNvLTg4NTlgIC0gaW50ZXJwcmV0IHRoZSBieXRlcyBhcyBJU08tODg1OSAod2hpY2ggY2FuIGJlIHVzZWQgZm9yIEFTQ0lJIGVuY29kZWQgdGV4dCkuXG4gICAqL1xuICB0ZXh0KGVuY29kaW5nSGludDogJ2xlZ2FjeSd8J2lzby04ODU5JyA9ICdsZWdhY3knKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5fYm9keSBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcykge1xuICAgICAgcmV0dXJuIHRoaXMuX2JvZHkudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICBzd2l0Y2ggKGVuY29kaW5nSGludCkge1xuICAgICAgICBjYXNlICdsZWdhY3knOlxuICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50MTZBcnJheSh0aGlzLl9ib2R5IGFzIEFycmF5QnVmZmVyKSk7XG4gICAgICAgIGNhc2UgJ2lzby04ODU5JzpcbiAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheSh0aGlzLl9ib2R5IGFzIEFycmF5QnVmZmVyKSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZhbHVlIGZvciBlbmNvZGluZ0hpbnQ6ICR7ZW5jb2RpbmdIaW50fWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ib2R5ID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX2JvZHkgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5fYm9keSwgbnVsbCwgMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2JvZHkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGJvZHkgYXMgYW4gQXJyYXlCdWZmZXJcbiAgICovXG4gIGFycmF5QnVmZmVyKCk6IEFycmF5QnVmZmVyIHtcbiAgICBpZiAodGhpcy5fYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICByZXR1cm4gPEFycmF5QnVmZmVyPnRoaXMuX2JvZHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZ1RvQXJyYXlCdWZmZXIodGhpcy50ZXh0KCkpO1xuICB9XG5cbiAgLyoqXG4gICAgKiBSZXR1cm5zIHRoZSByZXF1ZXN0J3MgYm9keSBhcyBhIEJsb2IsIGFzc3VtaW5nIHRoYXQgYm9keSBleGlzdHMuXG4gICAgKi9cbiAgYmxvYigpOiBCbG9iIHtcbiAgICBpZiAodGhpcy5fYm9keSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgIHJldHVybiA8QmxvYj50aGlzLl9ib2R5O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ib2R5IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgIHJldHVybiBuZXcgQmxvYihbdGhpcy5fYm9keV0pO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcignVGhlIHJlcXVlc3QgYm9keSBpc25cXCd0IGVpdGhlciBhIGJsb2Igb3IgYW4gYXJyYXkgYnVmZmVyJyk7XG4gIH1cbn1cbiJdfQ==
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RequestMethod } from './enums';
/**
 * @param {?} method
 * @return {?}
 */
export function normalizeMethodName(method) {
    if (typeof method !== 'string')
        return method;
    switch (method.toUpperCase()) {
        case 'GET':
            return RequestMethod.Get;
        case 'POST':
            return RequestMethod.Post;
        case 'PUT':
            return RequestMethod.Put;
        case 'DELETE':
            return RequestMethod.Delete;
        case 'OPTIONS':
            return RequestMethod.Options;
        case 'HEAD':
            return RequestMethod.Head;
        case 'PATCH':
            return RequestMethod.Patch;
    }
    throw new Error(`Invalid request method. The method "${method}" is not supported.`);
}
/** @type {?} */
export const isSuccess = (/**
 * @param {?} status
 * @return {?}
 */
(status) => (status >= 200 && status < 300));
/**
 * @param {?} xhr
 * @return {?}
 */
export function getResponseURL(xhr) {
    if ('responseURL' in xhr) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return null;
}
/**
 * @param {?} input
 * @return {?}
 */
export function stringToArrayBuffer8(input) {
    /** @type {?} */
    const view = new Uint8Array(input.length);
    for (let i = 0, strLen = input.length; i < strLen; i++) {
        view[i] = input.charCodeAt(i);
    }
    return view.buffer;
}
/**
 * @param {?} input
 * @return {?}
 */
export function stringToArrayBuffer(input) {
    /** @type {?} */
    const view = new Uint16Array(input.length);
    for (let i = 0, strLen = input.length; i < strLen; i++) {
        view[i] = input.charCodeAt(i);
    }
    return view.buffer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF91dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2h0dHBfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sU0FBUyxDQUFDOzs7OztBQUV0QyxNQUFNLFVBQVUsbUJBQW1CLENBQUMsTUFBOEI7SUFDaEUsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFFOUMsUUFBUSxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDNUIsS0FBSyxLQUFLO1lBQ1IsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQzNCLEtBQUssTUFBTTtZQUNULE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQztRQUM1QixLQUFLLEtBQUs7WUFDUixPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDM0IsS0FBSyxRQUFRO1lBQ1gsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQzlCLEtBQUssU0FBUztZQUNaLE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUMvQixLQUFLLE1BQU07WUFDVCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDNUIsS0FBSyxPQUFPO1lBQ1YsT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDO0tBQzlCO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsTUFBTSxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3RGLENBQUM7O0FBRUQsTUFBTSxPQUFPLFNBQVM7Ozs7QUFBRyxDQUFDLE1BQWMsRUFBVyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQTs7Ozs7QUFFckYsTUFBTSxVQUFVLGNBQWMsQ0FBQyxHQUFRO0lBQ3JDLElBQUksYUFBYSxJQUFJLEdBQUcsRUFBRTtRQUN4QixPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUM7S0FDeEI7SUFDRCxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxFQUFFO1FBQ3hELE9BQU8sR0FBRyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQy9DO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxLQUFhOztVQUMxQyxJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3JCLENBQUM7Ozs7O0FBR0QsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEtBQWE7O1VBQ3pDLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDL0I7SUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSZXF1ZXN0TWV0aG9kfSBmcm9tICcuL2VudW1zJztcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZE5hbWUobWV0aG9kOiBzdHJpbmcgfCBSZXF1ZXN0TWV0aG9kKTogUmVxdWVzdE1ldGhvZCB7XG4gIGlmICh0eXBlb2YgbWV0aG9kICE9PSAnc3RyaW5nJykgcmV0dXJuIG1ldGhvZDtcblxuICBzd2l0Y2ggKG1ldGhvZC50b1VwcGVyQ2FzZSgpKSB7XG4gICAgY2FzZSAnR0VUJzpcbiAgICAgIHJldHVybiBSZXF1ZXN0TWV0aG9kLkdldDtcbiAgICBjYXNlICdQT1NUJzpcbiAgICAgIHJldHVybiBSZXF1ZXN0TWV0aG9kLlBvc3Q7XG4gICAgY2FzZSAnUFVUJzpcbiAgICAgIHJldHVybiBSZXF1ZXN0TWV0aG9kLlB1dDtcbiAgICBjYXNlICdERUxFVEUnOlxuICAgICAgcmV0dXJuIFJlcXVlc3RNZXRob2QuRGVsZXRlO1xuICAgIGNhc2UgJ09QVElPTlMnOlxuICAgICAgcmV0dXJuIFJlcXVlc3RNZXRob2QuT3B0aW9ucztcbiAgICBjYXNlICdIRUFEJzpcbiAgICAgIHJldHVybiBSZXF1ZXN0TWV0aG9kLkhlYWQ7XG4gICAgY2FzZSAnUEFUQ0gnOlxuICAgICAgcmV0dXJuIFJlcXVlc3RNZXRob2QuUGF0Y2g7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJlcXVlc3QgbWV0aG9kLiBUaGUgbWV0aG9kIFwiJHttZXRob2R9XCIgaXMgbm90IHN1cHBvcnRlZC5gKTtcbn1cblxuZXhwb3J0IGNvbnN0IGlzU3VjY2VzcyA9IChzdGF0dXM6IG51bWJlcik6IGJvb2xlYW4gPT4gKHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlc3BvbnNlVVJMKHhocjogYW55KTogc3RyaW5nfG51bGwge1xuICBpZiAoJ3Jlc3BvbnNlVVJMJyBpbiB4aHIpIHtcbiAgICByZXR1cm4geGhyLnJlc3BvbnNlVVJMO1xuICB9XG4gIGlmICgvXlgtUmVxdWVzdC1VUkw6L20udGVzdCh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKSB7XG4gICAgcmV0dXJuIHhoci5nZXRSZXNwb25zZUhlYWRlcignWC1SZXF1ZXN0LVVSTCcpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9BcnJheUJ1ZmZlcjgoaW5wdXQ6IFN0cmluZyk6IEFycmF5QnVmZmVyIHtcbiAgY29uc3QgdmlldyA9IG5ldyBVaW50OEFycmF5KGlucHV0Lmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwLCBzdHJMZW4gPSBpbnB1dC5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xuICAgIHZpZXdbaV0gPSBpbnB1dC5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiB2aWV3LmJ1ZmZlcjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nVG9BcnJheUJ1ZmZlcihpbnB1dDogU3RyaW5nKTogQXJyYXlCdWZmZXIge1xuICBjb25zdCB2aWV3ID0gbmV3IFVpbnQxNkFycmF5KGlucHV0Lmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwLCBzdHJMZW4gPSBpbnB1dC5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xuICAgIHZpZXdbaV0gPSBpbnB1dC5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiB2aWV3LmJ1ZmZlcjtcbn1cbiJdfQ==
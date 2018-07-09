/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Supported http methods.
 * @deprecated see https://angular.io/guide/http
 */
/**
 * Supported http methods.
 * @deprecated see https://angular.io/guide/http
 */
export var RequestMethod;
/**
 * Supported http methods.
 * @deprecated see https://angular.io/guide/http
 */
(function (RequestMethod) {
    RequestMethod[RequestMethod["Get"] = 0] = "Get";
    RequestMethod[RequestMethod["Post"] = 1] = "Post";
    RequestMethod[RequestMethod["Put"] = 2] = "Put";
    RequestMethod[RequestMethod["Delete"] = 3] = "Delete";
    RequestMethod[RequestMethod["Options"] = 4] = "Options";
    RequestMethod[RequestMethod["Head"] = 5] = "Head";
    RequestMethod[RequestMethod["Patch"] = 6] = "Patch";
})(RequestMethod || (RequestMethod = {}));
/**
 * All possible states in which a connection can be, based on
 * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
 * additional "CANCELLED" state.
 * @deprecated see https://angular.io/guide/http
 */
/**
 * All possible states in which a connection can be, based on
 * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
 * additional "CANCELLED" state.
 * @deprecated see https://angular.io/guide/http
 */
export var ReadyState;
/**
 * All possible states in which a connection can be, based on
 * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
 * additional "CANCELLED" state.
 * @deprecated see https://angular.io/guide/http
 */
(function (ReadyState) {
    ReadyState[ReadyState["Unsent"] = 0] = "Unsent";
    ReadyState[ReadyState["Open"] = 1] = "Open";
    ReadyState[ReadyState["HeadersReceived"] = 2] = "HeadersReceived";
    ReadyState[ReadyState["Loading"] = 3] = "Loading";
    ReadyState[ReadyState["Done"] = 4] = "Done";
    ReadyState[ReadyState["Cancelled"] = 5] = "Cancelled";
})(ReadyState || (ReadyState = {}));
/**
 * Acceptable response types to be associated with a {@link Response}, based on
 * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
 * @deprecated see https://angular.io/guide/http
 */
/**
 * Acceptable response types to be associated with a {@link Response}, based on
 * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
 * @deprecated see https://angular.io/guide/http
 */
export var ResponseType;
/**
 * Acceptable response types to be associated with a {@link Response}, based on
 * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
 * @deprecated see https://angular.io/guide/http
 */
(function (ResponseType) {
    ResponseType[ResponseType["Basic"] = 0] = "Basic";
    ResponseType[ResponseType["Cors"] = 1] = "Cors";
    ResponseType[ResponseType["Default"] = 2] = "Default";
    ResponseType[ResponseType["Error"] = 3] = "Error";
    ResponseType[ResponseType["Opaque"] = 4] = "Opaque";
})(ResponseType || (ResponseType = {}));
/**
 * Supported content type to be automatically associated with a {@link Request}.
 * @deprecated see https://angular.io/guide/http
 */
/**
 * Supported content type to be automatically associated with a {@link Request}.
 * @deprecated see https://angular.io/guide/http
 */
export var ContentType;
/**
 * Supported content type to be automatically associated with a {@link Request}.
 * @deprecated see https://angular.io/guide/http
 */
(function (ContentType) {
    ContentType[ContentType["NONE"] = 0] = "NONE";
    ContentType[ContentType["JSON"] = 1] = "JSON";
    ContentType[ContentType["FORM"] = 2] = "FORM";
    ContentType[ContentType["FORM_DATA"] = 3] = "FORM_DATA";
    ContentType[ContentType["TEXT"] = 4] = "TEXT";
    ContentType[ContentType["BLOB"] = 5] = "BLOB";
    ContentType[ContentType["ARRAY_BUFFER"] = 6] = "ARRAY_BUFFER";
})(ContentType || (ContentType = {}));
/**
 * Define which buffer to use to store the response
 * @deprecated see https://angular.io/guide/http
 */
/**
 * Define which buffer to use to store the response
 * @deprecated see https://angular.io/guide/http
 */
export var ResponseContentType;
/**
 * Define which buffer to use to store the response
 * @deprecated see https://angular.io/guide/http
 */
(function (ResponseContentType) {
    ResponseContentType[ResponseContentType["Text"] = 0] = "Text";
    ResponseContentType[ResponseContentType["Json"] = 1] = "Json";
    ResponseContentType[ResponseContentType["ArrayBuffer"] = 2] = "ArrayBuffer";
    ResponseContentType[ResponseContentType["Blob"] = 3] = "Blob";
})(ResponseContentType || (ResponseContentType = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9odHRwL3NyYy9lbnVtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztHQU1HO0FBRUg7OztHQUdHOzs7OztBQUNILE1BQU0sQ0FBTixJQUFZLGFBUVg7Ozs7O0FBUkQsV0FBWSxhQUFhO0lBQ3ZCLCtDQUFHLENBQUE7SUFDSCxpREFBSSxDQUFBO0lBQ0osK0NBQUcsQ0FBQTtJQUNILHFEQUFNLENBQUE7SUFDTix1REFBTyxDQUFBO0lBQ1AsaURBQUksQ0FBQTtJQUNKLG1EQUFLLENBQUE7R0FQSyxhQUFhLEtBQWIsYUFBYSxRQVF4QjtBQUVEOzs7OztHQUtHOzs7Ozs7O0FBQ0gsTUFBTSxDQUFOLElBQVksVUFPWDs7Ozs7OztBQVBELFdBQVksVUFBVTtJQUNwQiwrQ0FBTSxDQUFBO0lBQ04sMkNBQUksQ0FBQTtJQUNKLGlFQUFlLENBQUE7SUFDZixpREFBTyxDQUFBO0lBQ1AsMkNBQUksQ0FBQTtJQUNKLHFEQUFTLENBQUE7R0FOQyxVQUFVLEtBQVYsVUFBVSxRQU9yQjtBQUVEOzs7O0dBSUc7Ozs7OztBQUNILE1BQU0sQ0FBTixJQUFZLFlBTVg7Ozs7OztBQU5ELFdBQVksWUFBWTtJQUN0QixpREFBSyxDQUFBO0lBQ0wsK0NBQUksQ0FBQTtJQUNKLHFEQUFPLENBQUE7SUFDUCxpREFBSyxDQUFBO0lBQ0wsbURBQU0sQ0FBQTtHQUxJLFlBQVksS0FBWixZQUFZLFFBTXZCO0FBRUQ7OztHQUdHOzs7OztBQUNILE1BQU0sQ0FBTixJQUFZLFdBUVg7Ozs7O0FBUkQsV0FBWSxXQUFXO0lBQ3JCLDZDQUFJLENBQUE7SUFDSiw2Q0FBSSxDQUFBO0lBQ0osNkNBQUksQ0FBQTtJQUNKLHVEQUFTLENBQUE7SUFDVCw2Q0FBSSxDQUFBO0lBQ0osNkNBQUksQ0FBQTtJQUNKLDZEQUFZLENBQUE7R0FQRixXQUFXLEtBQVgsV0FBVyxRQVF0QjtBQUVEOzs7R0FHRzs7Ozs7QUFDSCxNQUFNLENBQU4sSUFBWSxtQkFLWDs7Ozs7QUFMRCxXQUFZLG1CQUFtQjtJQUM3Qiw2REFBSSxDQUFBO0lBQ0osNkRBQUksQ0FBQTtJQUNKLDJFQUFXLENBQUE7SUFDWCw2REFBSSxDQUFBO0dBSk0sbUJBQW1CLEtBQW5CLG1CQUFtQixRQUs5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBTdXBwb3J0ZWQgaHR0cCBtZXRob2RzLlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbmV4cG9ydCBlbnVtIFJlcXVlc3RNZXRob2Qge1xuICBHZXQsXG4gIFBvc3QsXG4gIFB1dCxcbiAgRGVsZXRlLFxuICBPcHRpb25zLFxuICBIZWFkLFxuICBQYXRjaFxufVxuXG4vKipcbiAqIEFsbCBwb3NzaWJsZSBzdGF0ZXMgaW4gd2hpY2ggYSBjb25uZWN0aW9uIGNhbiBiZSwgYmFzZWQgb25cbiAqIFtTdGF0ZXNdKGh0dHA6Ly93d3cudzMub3JnL1RSL1hNTEh0dHBSZXF1ZXN0LyNzdGF0ZXMpIGZyb20gdGhlIGBYTUxIdHRwUmVxdWVzdGAgc3BlYywgYnV0IHdpdGggYW5cbiAqIGFkZGl0aW9uYWwgXCJDQU5DRUxMRURcIiBzdGF0ZS5cbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5leHBvcnQgZW51bSBSZWFkeVN0YXRlIHtcbiAgVW5zZW50LFxuICBPcGVuLFxuICBIZWFkZXJzUmVjZWl2ZWQsXG4gIExvYWRpbmcsXG4gIERvbmUsXG4gIENhbmNlbGxlZFxufVxuXG4vKipcbiAqIEFjY2VwdGFibGUgcmVzcG9uc2UgdHlwZXMgdG8gYmUgYXNzb2NpYXRlZCB3aXRoIGEge0BsaW5rIFJlc3BvbnNlfSwgYmFzZWQgb25cbiAqIFtSZXNwb25zZVR5cGVdKGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNyZXNwb25zZXR5cGUpIGZyb20gdGhlIEZldGNoIHNwZWMuXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqL1xuZXhwb3J0IGVudW0gUmVzcG9uc2VUeXBlIHtcbiAgQmFzaWMsXG4gIENvcnMsXG4gIERlZmF1bHQsXG4gIEVycm9yLFxuICBPcGFxdWVcbn1cblxuLyoqXG4gKiBTdXBwb3J0ZWQgY29udGVudCB0eXBlIHRvIGJlIGF1dG9tYXRpY2FsbHkgYXNzb2NpYXRlZCB3aXRoIGEge0BsaW5rIFJlcXVlc3R9LlxuICogQGRlcHJlY2F0ZWQgc2VlIGh0dHBzOi8vYW5ndWxhci5pby9ndWlkZS9odHRwXG4gKi9cbmV4cG9ydCBlbnVtIENvbnRlbnRUeXBlIHtcbiAgTk9ORSxcbiAgSlNPTixcbiAgRk9STSxcbiAgRk9STV9EQVRBLFxuICBURVhULFxuICBCTE9CLFxuICBBUlJBWV9CVUZGRVJcbn1cblxuLyoqXG4gKiBEZWZpbmUgd2hpY2ggYnVmZmVyIHRvIHVzZSB0byBzdG9yZSB0aGUgcmVzcG9uc2VcbiAqIEBkZXByZWNhdGVkIHNlZSBodHRwczovL2FuZ3VsYXIuaW8vZ3VpZGUvaHR0cFxuICovXG5leHBvcnQgZW51bSBSZXNwb25zZUNvbnRlbnRUeXBlIHtcbiAgVGV4dCxcbiAgSnNvbixcbiAgQXJyYXlCdWZmZXIsXG4gIEJsb2Jcbn1cbiJdfQ==
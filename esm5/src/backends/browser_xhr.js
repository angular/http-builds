/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * A backend for http that uses the `XMLHttpRequest` browser API.
 *
 * Take care not to evaluate this in non-browser contexts.
 *
 * @deprecated see https://angular.io/guide/http
 * @publicApi
 */
var BrowserXhr = /** @class */ (function () {
    function BrowserXhr() {
    }
    BrowserXhr.prototype.build = function () { return (new XMLHttpRequest()); };
    BrowserXhr.ngInjectableDef = i0.defineInjectable({ token: BrowserXhr, factory: function BrowserXhr_Factory(t) { return new (t || BrowserXhr)(); }, providedIn: null });
    return BrowserXhr;
}());
export { BrowserXhr };
/*@__PURE__*/ i0.ɵsetClassMetadata(BrowserXhr, [{
        type: Injectable
    }], function () { return []; }, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl94aHIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vIiwic291cmNlcyI6WyJwYWNrYWdlcy9odHRwL3NyYy9iYWNrZW5kcy9icm93c2VyX3hoci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUV6Qzs7Ozs7OztHQU9HO0FBQ0g7SUFFRTtJQUFlLENBQUM7SUFDaEIsMEJBQUssR0FBTCxjQUFlLE9BQVksQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzhEQUZ6QyxVQUFVLDZEQUFWLFVBQVU7cUJBbkJ2QjtDQXNCQyxBQUpELElBSUM7U0FIWSxVQUFVO21DQUFWLFVBQVU7Y0FEdEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBIGJhY2tlbmQgZm9yIGh0dHAgdGhhdCB1c2VzIHRoZSBgWE1MSHR0cFJlcXVlc3RgIGJyb3dzZXIgQVBJLlxuICpcbiAqIFRha2UgY2FyZSBub3QgdG8gZXZhbHVhdGUgdGhpcyBpbiBub24tYnJvd3NlciBjb250ZXh0cy5cbiAqXG4gKiBAZGVwcmVjYXRlZCBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL2h0dHBcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJYaHIge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIGJ1aWxkKCk6IGFueSB7IHJldHVybiA8YW55PihuZXcgWE1MSHR0cFJlcXVlc3QoKSk7IH1cbn1cbiJdfQ==
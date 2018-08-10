/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let _nextRequestId = 0;
export const JSONP_HOME = '__ng_jsonp__';
let _jsonpConnections = null;
function _getJsonpConnections() {
    const w = typeof window == 'object' ? window : {};
    if (_jsonpConnections === null) {
        _jsonpConnections = w[JSONP_HOME] = {};
    }
    return _jsonpConnections;
}
// Make sure not to evaluate this in a non-browser environment!
let BrowserJsonp = class BrowserJsonp {
    // Construct a <script> element with the specified URL
    build(url) {
        const node = document.createElement('script');
        node.src = url;
        return node;
    }
    nextRequestID() { return `__req${_nextRequestId++}`; }
    requestCallback(id) { return `${JSONP_HOME}.${id}.finished`; }
    exposeConnection(id, connection) {
        const connections = _getJsonpConnections();
        connections[id] = connection;
    }
    removeConnection(id) {
        const connections = _getJsonpConnections();
        connections[id] = null;
    }
    // Attach the <script> element to the DOM
    send(node) { document.body.appendChild((node)); }
    // Remove <script> element from the DOM
    cleanup(node) {
        if (node.parentNode) {
            node.parentNode.removeChild((node));
        }
    }
};
BrowserJsonp = tslib_1.__decorate([
    Injectable()
], BrowserJsonp);
export { BrowserJsonp };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9qc29ucC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2JhY2tlbmRzL2Jyb3dzZXJfanNvbnAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUM7QUFDekMsSUFBSSxpQkFBaUIsR0FBOEIsSUFBSSxDQUFDO0FBRXhEO0lBQ0UsTUFBTSxDQUFDLEdBQXlCLE9BQU8sTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEUsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7UUFDOUIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUN4QztJQUNELE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQztBQUVELCtEQUErRDtBQUUvRCxJQUFhLFlBQVksR0FBekI7SUFDRSxzREFBc0Q7SUFDdEQsS0FBSyxDQUFDLEdBQVc7UUFDZixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsYUFBYSxLQUFhLE9BQU8sUUFBUSxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU5RCxlQUFlLENBQUMsRUFBVSxJQUFZLE9BQU8sR0FBRyxVQUFVLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBRTlFLGdCQUFnQixDQUFDLEVBQVUsRUFBRSxVQUFlO1FBQzFDLE1BQU0sV0FBVyxHQUFHLG9CQUFvQixFQUFFLENBQUM7UUFDM0MsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBVTtRQUN6QixNQUFNLFdBQVcsR0FBRyxvQkFBb0IsRUFBRSxDQUFDO1FBQzNDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELHlDQUF5QztJQUN6QyxJQUFJLENBQUMsSUFBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUQsdUNBQXVDO0lBQ3ZDLE9BQU8sQ0FBQyxJQUFTO1FBQ2YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7Q0FDRixDQUFBO0FBL0JZLFlBQVk7SUFEeEIsVUFBVSxFQUFFO0dBQ0EsWUFBWSxDQStCeEI7U0EvQlksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IF9uZXh0UmVxdWVzdElkID0gMDtcbmV4cG9ydCBjb25zdCBKU09OUF9IT01FID0gJ19fbmdfanNvbnBfXyc7XG5sZXQgX2pzb25wQ29ubmVjdGlvbnM6IHtba2V5OiBzdHJpbmddOiBhbnl9fG51bGwgPSBudWxsO1xuXG5mdW5jdGlvbiBfZ2V0SnNvbnBDb25uZWN0aW9ucygpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IHc6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyA/IHdpbmRvdyA6IHt9O1xuICBpZiAoX2pzb25wQ29ubmVjdGlvbnMgPT09IG51bGwpIHtcbiAgICBfanNvbnBDb25uZWN0aW9ucyA9IHdbSlNPTlBfSE9NRV0gPSB7fTtcbiAgfVxuICByZXR1cm4gX2pzb25wQ29ubmVjdGlvbnM7XG59XG5cbi8vIE1ha2Ugc3VyZSBub3QgdG8gZXZhbHVhdGUgdGhpcyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJKc29ucCB7XG4gIC8vIENvbnN0cnVjdCBhIDxzY3JpcHQ+IGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIFVSTFxuICBidWlsZCh1cmw6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIG5vZGUuc3JjID0gdXJsO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgbmV4dFJlcXVlc3RJRCgpOiBzdHJpbmcgeyByZXR1cm4gYF9fcmVxJHtfbmV4dFJlcXVlc3RJZCsrfWA7IH1cblxuICByZXF1ZXN0Q2FsbGJhY2soaWQ6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBgJHtKU09OUF9IT01FfS4ke2lkfS5maW5pc2hlZGA7IH1cblxuICBleHBvc2VDb25uZWN0aW9uKGlkOiBzdHJpbmcsIGNvbm5lY3Rpb246IGFueSkge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gX2dldEpzb25wQ29ubmVjdGlvbnMoKTtcbiAgICBjb25uZWN0aW9uc1tpZF0gPSBjb25uZWN0aW9uO1xuICB9XG5cbiAgcmVtb3ZlQ29ubmVjdGlvbihpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgY29ubmVjdGlvbnMgPSBfZ2V0SnNvbnBDb25uZWN0aW9ucygpO1xuICAgIGNvbm5lY3Rpb25zW2lkXSA9IG51bGw7XG4gIH1cblxuICAvLyBBdHRhY2ggdGhlIDxzY3JpcHQ+IGVsZW1lbnQgdG8gdGhlIERPTVxuICBzZW5kKG5vZGU6IGFueSkgeyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKDxOb2RlPihub2RlKSk7IH1cblxuICAvLyBSZW1vdmUgPHNjcmlwdD4gZWxlbWVudCBmcm9tIHRoZSBET01cbiAgY2xlYW51cChub2RlOiBhbnkpIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoPE5vZGU+KG5vZGUpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
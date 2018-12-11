import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
let _nextRequestId = 0;
/** @type {?} */
export const JSONP_HOME = '__ng_jsonp__';
/** @type {?} */
let _jsonpConnections = null;
/**
 * @return {?}
 */
function _getJsonpConnections() {
    /** @type {?} */
    const w = typeof window == 'object' ? window : {};
    if (_jsonpConnections === null) {
        _jsonpConnections = w[JSONP_HOME] = {};
    }
    return _jsonpConnections;
}
export class BrowserJsonp {
    /**
     * @param {?} url
     * @return {?}
     */
    build(url) {
        /** @type {?} */
        const node = document.createElement('script');
        node.src = url;
        return node;
    }
    /**
     * @return {?}
     */
    nextRequestID() { return `__req${_nextRequestId++}`; }
    /**
     * @param {?} id
     * @return {?}
     */
    requestCallback(id) { return `${JSONP_HOME}.${id}.finished`; }
    /**
     * @param {?} id
     * @param {?} connection
     * @return {?}
     */
    exposeConnection(id, connection) {
        /** @type {?} */
        const connections = _getJsonpConnections();
        connections[id] = connection;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    removeConnection(id) {
        /** @type {?} */
        const connections = _getJsonpConnections();
        connections[id] = null;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    send(node) { document.body.appendChild(/** @type {?} */ ((node))); }
    /**
     * @param {?} node
     * @return {?}
     */
    cleanup(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(/** @type {?} */ ((node)));
        }
    }
}
BrowserJsonp.decorators = [
    { type: Injectable },
];
BrowserJsonp.ngInjectableDef = i0.defineInjectable({ token: BrowserJsonp, factory: function BrowserJsonp_Factory(t) { return new (t || BrowserJsonp)(); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(BrowserJsonp, [{
        type: Injectable
    }], null, null);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9qc29ucC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2h0dHAvc3JjL2JhY2tlbmRzL2Jyb3dzZXJfanNvbnAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFFekMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDOztBQUN2QixhQUFhLFVBQVUsR0FBRyxjQUFjLENBQUM7O0FBQ3pDLElBQUksaUJBQWlCLEdBQThCLElBQUksQ0FBQzs7OztBQUV4RCxTQUFTLG9CQUFvQjs7SUFDM0IsTUFBTSxDQUFDLEdBQXlCLE9BQU8sTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEUsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7UUFDOUIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUN4QztJQUNELE9BQU8saUJBQWlCLENBQUM7Q0FDMUI7QUFJRCxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFFdkIsS0FBSyxDQUFDLEdBQVc7O1FBQ2YsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7SUFFRCxhQUFhLEtBQWEsT0FBTyxRQUFRLGNBQWMsRUFBRSxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFOUQsZUFBZSxDQUFDLEVBQVUsSUFBWSxPQUFPLEdBQUcsVUFBVSxJQUFJLEVBQUUsV0FBVyxDQUFDLEVBQUU7Ozs7OztJQUU5RSxnQkFBZ0IsQ0FBQyxFQUFVLEVBQUUsVUFBZTs7UUFDMUMsTUFBTSxXQUFXLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztRQUMzQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO0tBQzlCOzs7OztJQUVELGdCQUFnQixDQUFDLEVBQVU7O1FBQ3pCLE1BQU0sV0FBVyxHQUFHLG9CQUFvQixFQUFFLENBQUM7UUFDM0MsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztLQUN4Qjs7Ozs7SUFHRCxJQUFJLENBQUMsSUFBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxtQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRTs7Ozs7SUFHNUQsT0FBTyxDQUFDLElBQVM7UUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLG1CQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQztTQUMzQztLQUNGOzs7WUEvQkYsVUFBVTs7NERBQ0UsWUFBWSwrREFBWixZQUFZO21DQUFaLFlBQVk7Y0FEeEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IF9uZXh0UmVxdWVzdElkID0gMDtcbmV4cG9ydCBjb25zdCBKU09OUF9IT01FID0gJ19fbmdfanNvbnBfXyc7XG5sZXQgX2pzb25wQ29ubmVjdGlvbnM6IHtba2V5OiBzdHJpbmddOiBhbnl9fG51bGwgPSBudWxsO1xuXG5mdW5jdGlvbiBfZ2V0SnNvbnBDb25uZWN0aW9ucygpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IHc6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyA/IHdpbmRvdyA6IHt9O1xuICBpZiAoX2pzb25wQ29ubmVjdGlvbnMgPT09IG51bGwpIHtcbiAgICBfanNvbnBDb25uZWN0aW9ucyA9IHdbSlNPTlBfSE9NRV0gPSB7fTtcbiAgfVxuICByZXR1cm4gX2pzb25wQ29ubmVjdGlvbnM7XG59XG5cbi8vIE1ha2Ugc3VyZSBub3QgdG8gZXZhbHVhdGUgdGhpcyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJKc29ucCB7XG4gIC8vIENvbnN0cnVjdCBhIDxzY3JpcHQ+IGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIFVSTFxuICBidWlsZCh1cmw6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIG5vZGUuc3JjID0gdXJsO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgbmV4dFJlcXVlc3RJRCgpOiBzdHJpbmcgeyByZXR1cm4gYF9fcmVxJHtfbmV4dFJlcXVlc3RJZCsrfWA7IH1cblxuICByZXF1ZXN0Q2FsbGJhY2soaWQ6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBgJHtKU09OUF9IT01FfS4ke2lkfS5maW5pc2hlZGA7IH1cblxuICBleHBvc2VDb25uZWN0aW9uKGlkOiBzdHJpbmcsIGNvbm5lY3Rpb246IGFueSkge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gX2dldEpzb25wQ29ubmVjdGlvbnMoKTtcbiAgICBjb25uZWN0aW9uc1tpZF0gPSBjb25uZWN0aW9uO1xuICB9XG5cbiAgcmVtb3ZlQ29ubmVjdGlvbihpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgY29ubmVjdGlvbnMgPSBfZ2V0SnNvbnBDb25uZWN0aW9ucygpO1xuICAgIGNvbm5lY3Rpb25zW2lkXSA9IG51bGw7XG4gIH1cblxuICAvLyBBdHRhY2ggdGhlIDxzY3JpcHQ+IGVsZW1lbnQgdG8gdGhlIERPTVxuICBzZW5kKG5vZGU6IGFueSkgeyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKDxOb2RlPihub2RlKSk7IH1cblxuICAvLyBSZW1vdmUgPHNjcmlwdD4gZWxlbWVudCBmcm9tIHRoZSBET01cbiAgY2xlYW51cChub2RlOiBhbnkpIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoPE5vZGU+KG5vZGUpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
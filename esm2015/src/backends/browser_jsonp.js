/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
// Make sure not to evaluate this in a non-browser environment!
export class BrowserJsonp {
    // Construct a <script> element with the specified URL
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
    // Attach the <script> element to the DOM
    /**
     * @param {?} node
     * @return {?}
     */
    send(node) { document.body.appendChild((/** @type {?} */ ((node)))); }
    // Remove <script> element from the DOM
    /**
     * @param {?} node
     * @return {?}
     */
    cleanup(node) {
        if (node.parentNode) {
            node.parentNode.removeChild((/** @type {?} */ ((node))));
        }
    }
}
BrowserJsonp.decorators = [
    { type: Injectable },
];
/** @nocollapse */ BrowserJsonp.ngInjectableDef = i0.defineInjectable({ token: BrowserJsonp, factory: function BrowserJsonp_Factory(t) { return new (t || BrowserJsonp)(); }, providedIn: null });
/*@__PURE__*/ i0.ɵsetClassMetadata(BrowserJsonp, [{
        type: Injectable
    }], null, null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9qc29ucC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2JhY2tlbmRzL2Jyb3dzZXJfanNvbnAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7SUFFckMsY0FBYyxHQUFHLENBQUM7O0FBQ3RCLE1BQU0sT0FBTyxVQUFVLEdBQUcsY0FBYzs7SUFDcEMsaUJBQWlCLEdBQThCLElBQUk7Ozs7QUFFdkQsU0FBUyxvQkFBb0I7O1VBQ3JCLENBQUMsR0FBeUIsT0FBTyxNQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDdkUsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7UUFDOUIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUN4QztJQUNELE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQzs7QUFJRCxNQUFNLE9BQU8sWUFBWTs7Ozs7O0lBRXZCLEtBQUssQ0FBQyxHQUFXOztjQUNULElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELGFBQWEsS0FBYSxPQUFPLFFBQVEsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRTlELGVBQWUsQ0FBQyxFQUFVLElBQVksT0FBTyxHQUFHLFVBQVUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUU5RSxnQkFBZ0IsQ0FBQyxFQUFVLEVBQUUsVUFBZTs7Y0FDcEMsV0FBVyxHQUFHLG9CQUFvQixFQUFFO1FBQzFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFVOztjQUNuQixXQUFXLEdBQUcsb0JBQW9CLEVBQUU7UUFDMUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOzs7Ozs7SUFHRCxJQUFJLENBQUMsSUFBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFNLENBQUMsSUFBSSxDQUFDLEVBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRzVELE9BQU8sQ0FBQyxJQUFTO1FBQ2YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLG1CQUFNLENBQUMsSUFBSSxDQUFDLEVBQUEsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7O1lBL0JGLFVBQVU7OzREQUNFLFlBQVksK0RBQVosWUFBWTttQ0FBWixZQUFZO2NBRHhCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmxldCBfbmV4dFJlcXVlc3RJZCA9IDA7XG5leHBvcnQgY29uc3QgSlNPTlBfSE9NRSA9ICdfX25nX2pzb25wX18nO1xubGV0IF9qc29ucENvbm5lY3Rpb25zOiB7W2tleTogc3RyaW5nXTogYW55fXxudWxsID0gbnVsbDtcblxuZnVuY3Rpb24gX2dldEpzb25wQ29ubmVjdGlvbnMoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCB3OiB7W2tleTogc3RyaW5nXTogYW55fSA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgPyB3aW5kb3cgOiB7fTtcbiAgaWYgKF9qc29ucENvbm5lY3Rpb25zID09PSBudWxsKSB7XG4gICAgX2pzb25wQ29ubmVjdGlvbnMgPSB3W0pTT05QX0hPTUVdID0ge307XG4gIH1cbiAgcmV0dXJuIF9qc29ucENvbm5lY3Rpb25zO1xufVxuXG4vLyBNYWtlIHN1cmUgbm90IHRvIGV2YWx1YXRlIHRoaXMgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudCFcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VySnNvbnAge1xuICAvLyBDb25zdHJ1Y3QgYSA8c2NyaXB0PiBlbGVtZW50IHdpdGggdGhlIHNwZWNpZmllZCBVUkxcbiAgYnVpbGQodXJsOiBzdHJpbmcpOiBhbnkge1xuICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBub2RlLnNyYyA9IHVybDtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIG5leHRSZXF1ZXN0SUQoKTogc3RyaW5nIHsgcmV0dXJuIGBfX3JlcSR7X25leHRSZXF1ZXN0SWQrK31gOyB9XG5cbiAgcmVxdWVzdENhbGxiYWNrKGlkOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gYCR7SlNPTlBfSE9NRX0uJHtpZH0uZmluaXNoZWRgOyB9XG5cbiAgZXhwb3NlQ29ubmVjdGlvbihpZDogc3RyaW5nLCBjb25uZWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBjb25uZWN0aW9ucyA9IF9nZXRKc29ucENvbm5lY3Rpb25zKCk7XG4gICAgY29ubmVjdGlvbnNbaWRdID0gY29ubmVjdGlvbjtcbiAgfVxuXG4gIHJlbW92ZUNvbm5lY3Rpb24oaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gX2dldEpzb25wQ29ubmVjdGlvbnMoKTtcbiAgICBjb25uZWN0aW9uc1tpZF0gPSBudWxsO1xuICB9XG5cbiAgLy8gQXR0YWNoIHRoZSA8c2NyaXB0PiBlbGVtZW50IHRvIHRoZSBET01cbiAgc2VuZChub2RlOiBhbnkpIHsgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCg8Tm9kZT4obm9kZSkpOyB9XG5cbiAgLy8gUmVtb3ZlIDxzY3JpcHQ+IGVsZW1lbnQgZnJvbSB0aGUgRE9NXG4gIGNsZWFudXAobm9kZTogYW55KSB7XG4gICAgaWYgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKDxOb2RlPihub2RlKSk7XG4gICAgfVxuICB9XG59XG4iXX0=
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
var _nextRequestId = 0;
export var JSONP_HOME = '__ng_jsonp__';
var _jsonpConnections = null;
function _getJsonpConnections() {
    var w = typeof window == 'object' ? window : {};
    if (_jsonpConnections === null) {
        _jsonpConnections = w[JSONP_HOME] = {};
    }
    return _jsonpConnections;
}
// Make sure not to evaluate this in a non-browser environment!
var BrowserJsonp = /** @class */ (function () {
    function BrowserJsonp() {
    }
    // Construct a <script> element with the specified URL
    // Construct a <script> element with the specified URL
    BrowserJsonp.prototype.build = 
    // Construct a <script> element with the specified URL
    function (url) {
        var node = document.createElement('script');
        node.src = url;
        return node;
    };
    BrowserJsonp.prototype.nextRequestID = function () { return "__req" + _nextRequestId++; };
    BrowserJsonp.prototype.requestCallback = function (id) { return JSONP_HOME + "." + id + ".finished"; };
    BrowserJsonp.prototype.exposeConnection = function (id, connection) {
        var connections = _getJsonpConnections();
        connections[id] = connection;
    };
    BrowserJsonp.prototype.removeConnection = function (id) {
        var connections = _getJsonpConnections();
        connections[id] = null;
    };
    // Attach the <script> element to the DOM
    // Attach the <script> element to the DOM
    BrowserJsonp.prototype.send = 
    // Attach the <script> element to the DOM
    function (node) { document.body.appendChild((node)); };
    // Remove <script> element from the DOM
    // Remove <script> element from the DOM
    BrowserJsonp.prototype.cleanup = 
    // Remove <script> element from the DOM
    function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild((node));
        }
    };
    BrowserJsonp.decorators = [
        { type: Injectable }
    ];
    return BrowserJsonp;
}());
export { BrowserJsonp };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9qc29ucC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2JhY2tlbmRzL2Jyb3dzZXJfanNvbnAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRyxjQUFjLENBQUM7QUFDekMsSUFBSSxpQkFBaUIsR0FBOEIsSUFBSSxDQUFDO0FBRXhEO0lBQ0UsSUFBTSxDQUFDLEdBQXlCLE9BQU8sTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDeEUsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7UUFDOUIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUN4QztJQUNELE9BQU8saUJBQWlCLENBQUM7Q0FDMUI7Ozs7O0lBS0Msc0RBQXNEOztJQUN0RCw0QkFBSzs7SUFBTCxVQUFNLEdBQVc7UUFDZixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELG9DQUFhLEdBQWIsY0FBMEIsT0FBTyxVQUFRLGNBQWMsRUFBSSxDQUFDLEVBQUU7SUFFOUQsc0NBQWUsR0FBZixVQUFnQixFQUFVLElBQVksT0FBVSxVQUFVLFNBQUksRUFBRSxjQUFXLENBQUMsRUFBRTtJQUU5RSx1Q0FBZ0IsR0FBaEIsVUFBaUIsRUFBVSxFQUFFLFVBQWU7UUFDMUMsSUFBTSxXQUFXLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztRQUMzQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO0tBQzlCO0lBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLEVBQVU7UUFDekIsSUFBTSxXQUFXLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztRQUMzQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0tBQ3hCO0lBRUQseUNBQXlDOztJQUN6QywyQkFBSTs7SUFBSixVQUFLLElBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUU1RCx1Q0FBdUM7O0lBQ3ZDLDhCQUFPOztJQUFQLFVBQVEsSUFBUztRQUNmLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDM0M7S0FDRjs7Z0JBL0JGLFVBQVU7O3VCQXZCWDs7U0F3QmEsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxubGV0IF9uZXh0UmVxdWVzdElkID0gMDtcbmV4cG9ydCBjb25zdCBKU09OUF9IT01FID0gJ19fbmdfanNvbnBfXyc7XG5sZXQgX2pzb25wQ29ubmVjdGlvbnM6IHtba2V5OiBzdHJpbmddOiBhbnl9fG51bGwgPSBudWxsO1xuXG5mdW5jdGlvbiBfZ2V0SnNvbnBDb25uZWN0aW9ucygpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gIGNvbnN0IHc6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyA/IHdpbmRvdyA6IHt9O1xuICBpZiAoX2pzb25wQ29ubmVjdGlvbnMgPT09IG51bGwpIHtcbiAgICBfanNvbnBDb25uZWN0aW9ucyA9IHdbSlNPTlBfSE9NRV0gPSB7fTtcbiAgfVxuICByZXR1cm4gX2pzb25wQ29ubmVjdGlvbnM7XG59XG5cbi8vIE1ha2Ugc3VyZSBub3QgdG8gZXZhbHVhdGUgdGhpcyBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50IVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJyb3dzZXJKc29ucCB7XG4gIC8vIENvbnN0cnVjdCBhIDxzY3JpcHQ+IGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIFVSTFxuICBidWlsZCh1cmw6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIG5vZGUuc3JjID0gdXJsO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgbmV4dFJlcXVlc3RJRCgpOiBzdHJpbmcgeyByZXR1cm4gYF9fcmVxJHtfbmV4dFJlcXVlc3RJZCsrfWA7IH1cblxuICByZXF1ZXN0Q2FsbGJhY2soaWQ6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBgJHtKU09OUF9IT01FfS4ke2lkfS5maW5pc2hlZGA7IH1cblxuICBleHBvc2VDb25uZWN0aW9uKGlkOiBzdHJpbmcsIGNvbm5lY3Rpb246IGFueSkge1xuICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gX2dldEpzb25wQ29ubmVjdGlvbnMoKTtcbiAgICBjb25uZWN0aW9uc1tpZF0gPSBjb25uZWN0aW9uO1xuICB9XG5cbiAgcmVtb3ZlQ29ubmVjdGlvbihpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgY29ubmVjdGlvbnMgPSBfZ2V0SnNvbnBDb25uZWN0aW9ucygpO1xuICAgIGNvbm5lY3Rpb25zW2lkXSA9IG51bGw7XG4gIH1cblxuICAvLyBBdHRhY2ggdGhlIDxzY3JpcHQ+IGVsZW1lbnQgdG8gdGhlIERPTVxuICBzZW5kKG5vZGU6IGFueSkgeyBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKDxOb2RlPihub2RlKSk7IH1cblxuICAvLyBSZW1vdmUgPHNjcmlwdD4gZWxlbWVudCBmcm9tIHRoZSBET01cbiAgY2xlYW51cChub2RlOiBhbnkpIHtcbiAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoPE5vZGU+KG5vZGUpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
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
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseOptions } from '../base_response_options';
import { ReadyState, RequestMethod, ResponseType } from '../enums';
import { ConnectionBackend } from '../interfaces';
import { Response } from '../static_response';
import { BrowserJsonp } from './browser_jsonp';
var /** @type {?} */ JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
var /** @type {?} */ JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
/**
 * Base class for an in-flight JSONP request.
 *
 * @deprecated use \@angular/common/http instead
 */
var /**
 * Base class for an in-flight JSONP request.
 *
 * @deprecated use \@angular/common/http instead
 */
JSONPConnection = /** @class */ (function () {
    /** @internal */
    function JSONPConnection(req, _dom, baseResponseOptions) {
        var _this = this;
        this._dom = _dom;
        this.baseResponseOptions = baseResponseOptions;
        this._finished = false;
        if (req.method !== RequestMethod.Get) {
            throw new TypeError(JSONP_ERR_WRONG_METHOD);
        }
        this.request = req;
        this.response = new Observable(function (responseObserver) {
            _this.readyState = ReadyState.Loading;
            var /** @type {?} */ id = _this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, _this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            var /** @type {?} */ callback = _dom.requestCallback(_this._id);
            var /** @type {?} */ url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = url.replace('=JSONP_CALLBACK&', "=" + callback + "&");
            }
            else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
            }
            var /** @type {?} */ script = _this._script = _dom.build(url);
            var /** @type {?} */ onLoad = function (event) {
                if (_this.readyState === ReadyState.Cancelled)
                    return;
                _this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                if (!_this._finished) {
                    var /** @type {?} */ responseOptions_1 = new ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: ResponseType.Error, url: url });
                    if (baseResponseOptions) {
                        responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                    }
                    responseObserver.error(new Response(responseOptions_1));
                    return;
                }
                var /** @type {?} */ responseOptions = new ResponseOptions({ body: _this._responseData, url: url });
                if (_this.baseResponseOptions) {
                    responseOptions = _this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new Response(responseOptions));
                responseObserver.complete();
            };
            var /** @type {?} */ onError = function (error) {
                if (_this.readyState === ReadyState.Cancelled)
                    return;
                _this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                var /** @type {?} */ responseOptions = new ResponseOptions({ body: error.message, type: ResponseType.Error });
                if (baseResponseOptions) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new Response(responseOptions));
            };
            script.addEventListener('load', onLoad);
            script.addEventListener('error', onError);
            _dom.send(script);
            return function () {
                _this.readyState = ReadyState.Cancelled;
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
                _this._dom.cleanup(script);
            };
        });
    }
    /**
     * Callback called when the JSONP request completes, to notify the application
     * of the new data.
     */
    /**
     * Callback called when the JSONP request completes, to notify the application
     * of the new data.
     * @param {?=} data
     * @return {?}
     */
    JSONPConnection.prototype.finished = /**
     * Callback called when the JSONP request completes, to notify the application
     * of the new data.
     * @param {?=} data
     * @return {?}
     */
    function (data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === ReadyState.Cancelled)
            return;
        this._responseData = data;
    };
    return JSONPConnection;
}());
/**
 * Base class for an in-flight JSONP request.
 *
 * @deprecated use \@angular/common/http instead
 */
export { JSONPConnection };
function JSONPConnection_tsickle_Closure_declarations() {
    /** @type {?} */
    JSONPConnection.prototype._id;
    /** @type {?} */
    JSONPConnection.prototype._script;
    /** @type {?} */
    JSONPConnection.prototype._responseData;
    /** @type {?} */
    JSONPConnection.prototype._finished;
    /**
     * The {\@link ReadyState} of this request.
     * @type {?}
     */
    JSONPConnection.prototype.readyState;
    /**
     * The outgoing HTTP request.
     * @type {?}
     */
    JSONPConnection.prototype.request;
    /**
     * An observable that completes with the response, when the request is finished.
     * @type {?}
     */
    JSONPConnection.prototype.response;
    /** @type {?} */
    JSONPConnection.prototype._dom;
    /** @type {?} */
    JSONPConnection.prototype.baseResponseOptions;
}
/**
 * A {\@link ConnectionBackend} that uses the JSONP strategy of making requests.
 *
 * @deprecated use \@angular/common/http instead
 */
var JSONPBackend = /** @class */ (function (_super) {
    tslib_1.__extends(JSONPBackend, _super);
    /** @internal */
    function JSONPBackend(_browserJSONP, _baseResponseOptions) {
        var _this = _super.call(this) || this;
        _this._browserJSONP = _browserJSONP;
        _this._baseResponseOptions = _baseResponseOptions;
        return _this;
    }
    /**
     * @param {?} request
     * @return {?}
     */
    JSONPBackend.prototype.createConnection = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return new JSONPConnection(request, this._browserJSONP, this._baseResponseOptions);
    };
    JSONPBackend.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    JSONPBackend.ctorParameters = function () { return [
        { type: BrowserJsonp, },
        { type: ResponseOptions, },
    ]; };
    return JSONPBackend;
}(ConnectionBackend));
export { JSONPBackend };
function JSONPBackend_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    JSONPBackend.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    JSONPBackend.ctorParameters;
    /** @type {?} */
    JSONPBackend.prototype._browserJSONP;
    /** @type {?} */
    JSONPBackend.prototype._baseResponseOptions;
}
//# sourceMappingURL=jsonp_backend.js.map
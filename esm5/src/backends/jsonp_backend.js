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
var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
/**
 * Base class for an in-flight JSONP request.
 *
 * @deprecated use @angular/common/http instead
 */
var JSONPConnection = /** @class */ (function () {
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
            var id = _this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, _this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            var callback = _dom.requestCallback(_this._id);
            var url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = url.replace('=JSONP_CALLBACK&', "=" + callback + "&");
            }
            else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
            }
            var script = _this._script = _dom.build(url);
            var onLoad = function (event) {
                if (_this.readyState === ReadyState.Cancelled)
                    return;
                _this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                if (!_this._finished) {
                    var responseOptions_1 = new ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: ResponseType.Error, url: url });
                    if (baseResponseOptions) {
                        responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                    }
                    responseObserver.error(new Response(responseOptions_1));
                    return;
                }
                var responseOptions = new ResponseOptions({ body: _this._responseData, url: url });
                if (_this.baseResponseOptions) {
                    responseOptions = _this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new Response(responseOptions));
                responseObserver.complete();
            };
            var onError = function (error) {
                if (_this.readyState === ReadyState.Cancelled)
                    return;
                _this.readyState = ReadyState.Done;
                _dom.cleanup(script);
                var responseOptions = new ResponseOptions({ body: error.message, type: ResponseType.Error });
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
    JSONPConnection.prototype.finished = function (data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === ReadyState.Cancelled)
            return;
        this._responseData = data;
    };
    return JSONPConnection;
}());
export { JSONPConnection };
/**
 * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
 *
 * @deprecated use @angular/common/http instead
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
    JSONPBackend.prototype.createConnection = function (request) {
        return new JSONPConnection(request, this._browserJSONP, this._baseResponseOptions);
    };
    JSONPBackend.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    JSONPBackend.ctorParameters = function () { return [
        { type: BrowserJsonp },
        { type: ResponseOptions }
    ]; };
    return JSONPBackend;
}(ConnectionBackend));
export { JSONPBackend };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBfYmFja2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2h0dHAvc3JjL2JhY2tlbmRzL2pzb25wX2JhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUUxQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2pFLE9BQU8sRUFBYSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU1RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFNUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLElBQU0scUJBQXFCLEdBQUcsZ0RBQWdELENBQUM7QUFDL0UsSUFBTSxzQkFBc0IsR0FBRyw2Q0FBNkMsQ0FBQztBQUU3RTs7OztHQUlHO0FBQ0g7SUFxQkUsZ0JBQWdCO0lBQ2hCLHlCQUNJLEdBQVksRUFBVSxJQUFrQixFQUFVLG1CQUFxQztRQUQzRixpQkF1RUM7UUF0RXlCLFNBQUksR0FBSixJQUFJLENBQWM7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWtCO1FBbkJuRixjQUFTLEdBQVksS0FBSyxDQUFDO1FBb0JqQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLEdBQUcsRUFBRTtZQUNwQyxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDN0M7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLElB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Q0FBQyxBQTFHRCxJQTBHQzs7QUFFRDs7OztHQUlHO0FBQ0g7SUFDa0Msd0NBQWlCO0lBQ2pELGdCQUFnQjtJQUNoQixzQkFBb0IsYUFBMkIsRUFBVSxvQkFBcUM7UUFBOUYsWUFDRSxpQkFBTyxTQUNSO1FBRm1CLG1CQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUsMEJBQW9CLEdBQXBCLG9CQUFvQixDQUFpQjs7SUFFOUYsQ0FBQztJQUVELHVDQUFnQixHQUFoQixVQUFpQixPQUFnQjtRQUMvQixPQUFPLElBQUksZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7O2dCQVRGLFVBQVU7Ozs7Z0JBM0hILFlBQVk7Z0JBTlosZUFBZTs7SUEySXZCLG1CQUFDO0NBQUEsQUFWRCxDQUNrQyxpQkFBaUIsR0FTbEQ7U0FUWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBPYnNlcnZlcn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7UmVzcG9uc2VPcHRpb25zfSBmcm9tICcuLi9iYXNlX3Jlc3BvbnNlX29wdGlvbnMnO1xuaW1wb3J0IHtSZWFkeVN0YXRlLCBSZXF1ZXN0TWV0aG9kLCBSZXNwb25zZVR5cGV9IGZyb20gJy4uL2VudW1zJztcbmltcG9ydCB7Q29ubmVjdGlvbiwgQ29ubmVjdGlvbkJhY2tlbmR9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtSZXF1ZXN0fSBmcm9tICcuLi9zdGF0aWNfcmVxdWVzdCc7XG5pbXBvcnQge1Jlc3BvbnNlfSBmcm9tICcuLi9zdGF0aWNfcmVzcG9uc2UnO1xuXG5pbXBvcnQge0Jyb3dzZXJKc29ucH0gZnJvbSAnLi9icm93c2VyX2pzb25wJztcblxuY29uc3QgSlNPTlBfRVJSX05PX0NBTExCQUNLID0gJ0pTT05QIGluamVjdGVkIHNjcmlwdCBkaWQgbm90IGludm9rZSBjYWxsYmFjay4nO1xuY29uc3QgSlNPTlBfRVJSX1dST05HX01FVEhPRCA9ICdKU09OUCByZXF1ZXN0cyBtdXN0IHVzZSBHRVQgcmVxdWVzdCBtZXRob2QuJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhbiBpbi1mbGlnaHQgSlNPTlAgcmVxdWVzdC5cbiAqXG4gKiBAZGVwcmVjYXRlZCB1c2UgQGFuZ3VsYXIvY29tbW9uL2h0dHAgaW5zdGVhZFxuICovXG5leHBvcnQgY2xhc3MgSlNPTlBDb25uZWN0aW9uIGltcGxlbWVudHMgQ29ubmVjdGlvbiB7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gIHByaXZhdGUgX3NjcmlwdDogRWxlbWVudDtcbiAgcHJpdmF0ZSBfcmVzcG9uc2VEYXRhOiBhbnk7XG4gIHByaXZhdGUgX2ZpbmlzaGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSB7QGxpbmsgUmVhZHlTdGF0ZX0gb2YgdGhpcyByZXF1ZXN0LlxuICAgKi9cbiAgcmVhZHlTdGF0ZTogUmVhZHlTdGF0ZTtcblxuICAvKipcbiAgICogVGhlIG91dGdvaW5nIEhUVFAgcmVxdWVzdC5cbiAgICovXG4gIHJlcXVlc3Q6IFJlcXVlc3Q7XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCBjb21wbGV0ZXMgd2l0aCB0aGUgcmVzcG9uc2UsIHdoZW4gdGhlIHJlcXVlc3QgaXMgZmluaXNoZWQuXG4gICAqL1xuICByZXNwb25zZTogT2JzZXJ2YWJsZTxSZXNwb25zZT47XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlcTogUmVxdWVzdCwgcHJpdmF0ZSBfZG9tOiBCcm93c2VySnNvbnAsIHByaXZhdGUgYmFzZVJlc3BvbnNlT3B0aW9ucz86IFJlc3BvbnNlT3B0aW9ucykge1xuICAgIGlmIChyZXEubWV0aG9kICE9PSBSZXF1ZXN0TWV0aG9kLkdldCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihKU09OUF9FUlJfV1JPTkdfTUVUSE9EKTtcbiAgICB9XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxO1xuICAgIHRoaXMucmVzcG9uc2UgPSBuZXcgT2JzZXJ2YWJsZTxSZXNwb25zZT4oKHJlc3BvbnNlT2JzZXJ2ZXI6IE9ic2VydmVyPFJlc3BvbnNlPikgPT4ge1xuXG4gICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkxvYWRpbmc7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuX2lkID0gX2RvbS5uZXh0UmVxdWVzdElEKCk7XG5cbiAgICAgIF9kb20uZXhwb3NlQ29ubmVjdGlvbihpZCwgdGhpcyk7XG5cbiAgICAgIC8vIFdvcmthcm91bmQgRGFydFxuICAgICAgLy8gdXJsID0gdXJsLnJlcGxhY2UoLz1KU09OUF9DQUxMQkFDSygmfCQpLywgYGdlbmVyYXRlZCBtZXRob2RgKTtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gX2RvbS5yZXF1ZXN0Q2FsbGJhY2sodGhpcy5faWQpO1xuICAgICAgbGV0IHVybDogc3RyaW5nID0gcmVxLnVybDtcbiAgICAgIGlmICh1cmwuaW5kZXhPZignPUpTT05QX0NBTExCQUNLJicpID4gLTEpIHtcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoJz1KU09OUF9DQUxMQkFDSyYnLCBgPSR7Y2FsbGJhY2t9JmApO1xuICAgICAgfSBlbHNlIGlmICh1cmwubGFzdEluZGV4T2YoJz1KU09OUF9DQUxMQkFDSycpID09PSB1cmwubGVuZ3RoIC0gJz1KU09OUF9DQUxMQkFDSycubGVuZ3RoKSB7XG4gICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtICc9SlNPTlBfQ0FMTEJBQ0snLmxlbmd0aCkgKyBgPSR7Y2FsbGJhY2t9YDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5fc2NyaXB0ID0gX2RvbS5idWlsZCh1cmwpO1xuXG4gICAgICBjb25zdCBvbkxvYWQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFJlYWR5U3RhdGUuQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuRG9uZTtcbiAgICAgICAgX2RvbS5jbGVhbnVwKHNjcmlwdCk7XG4gICAgICAgIGlmICghdGhpcy5fZmluaXNoZWQpIHtcbiAgICAgICAgICBsZXQgcmVzcG9uc2VPcHRpb25zID1cbiAgICAgICAgICAgICAgbmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keTogSlNPTlBfRVJSX05PX0NBTExCQUNLLCB0eXBlOiBSZXNwb25zZVR5cGUuRXJyb3IsIHVybH0pO1xuICAgICAgICAgIGlmIChiYXNlUmVzcG9uc2VPcHRpb25zKSB7XG4gICAgICAgICAgICByZXNwb25zZU9wdGlvbnMgPSBiYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuZXJyb3IobmV3IFJlc3BvbnNlKHJlc3BvbnNlT3B0aW9ucykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNwb25zZU9wdGlvbnMgPSBuZXcgUmVzcG9uc2VPcHRpb25zKHtib2R5OiB0aGlzLl9yZXNwb25zZURhdGEsIHVybH0pO1xuICAgICAgICBpZiAodGhpcy5iYXNlUmVzcG9uc2VPcHRpb25zKSB7XG4gICAgICAgICAgcmVzcG9uc2VPcHRpb25zID0gdGhpcy5iYXNlUmVzcG9uc2VPcHRpb25zLm1lcmdlKHJlc3BvbnNlT3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNwb25zZU9ic2VydmVyLm5leHQobmV3IFJlc3BvbnNlKHJlc3BvbnNlT3B0aW9ucykpO1xuICAgICAgICByZXNwb25zZU9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvbkVycm9yID0gKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBSZWFkeVN0YXRlLkNhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkRvbmU7XG4gICAgICAgIF9kb20uY2xlYW51cChzY3JpcHQpO1xuICAgICAgICBsZXQgcmVzcG9uc2VPcHRpb25zID0gbmV3IFJlc3BvbnNlT3B0aW9ucyh7Ym9keTogZXJyb3IubWVzc2FnZSwgdHlwZTogUmVzcG9uc2VUeXBlLkVycm9yfSk7XG4gICAgICAgIGlmIChiYXNlUmVzcG9uc2VPcHRpb25zKSB7XG4gICAgICAgICAgcmVzcG9uc2VPcHRpb25zID0gYmFzZVJlc3BvbnNlT3B0aW9ucy5tZXJnZShyZXNwb25zZU9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3BvbnNlT2JzZXJ2ZXIuZXJyb3IobmV3IFJlc3BvbnNlKHJlc3BvbnNlT3B0aW9ucykpO1xuICAgICAgfTtcblxuICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG5cbiAgICAgIF9kb20uc2VuZChzY3JpcHQpO1xuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkNhbmNlbGxlZDtcbiAgICAgICAgc2NyaXB0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuICAgICAgICBzY3JpcHQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgdGhpcy5fZG9tLmNsZWFudXAoc2NyaXB0KTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgY2FsbGVkIHdoZW4gdGhlIEpTT05QIHJlcXVlc3QgY29tcGxldGVzLCB0byBub3RpZnkgdGhlIGFwcGxpY2F0aW9uXG4gICAqIG9mIHRoZSBuZXcgZGF0YS5cbiAgICovXG4gIGZpbmlzaGVkKGRhdGE/OiBhbnkpIHtcbiAgICAvLyBEb24ndCBsZWFrIGNvbm5lY3Rpb25zXG4gICAgdGhpcy5fZmluaXNoZWQgPSB0cnVlO1xuICAgIHRoaXMuX2RvbS5yZW1vdmVDb25uZWN0aW9uKHRoaXMuX2lkKTtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBSZWFkeVN0YXRlLkNhbmNlbGxlZCkgcmV0dXJuO1xuICAgIHRoaXMuX3Jlc3BvbnNlRGF0YSA9IGRhdGE7XG4gIH1cbn1cblxuLyoqXG4gKiBBIHtAbGluayBDb25uZWN0aW9uQmFja2VuZH0gdGhhdCB1c2VzIHRoZSBKU09OUCBzdHJhdGVneSBvZiBtYWtpbmcgcmVxdWVzdHMuXG4gKlxuICogQGRlcHJlY2F0ZWQgdXNlIEBhbmd1bGFyL2NvbW1vbi9odHRwIGluc3RlYWRcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEpTT05QQmFja2VuZCBleHRlbmRzIENvbm5lY3Rpb25CYWNrZW5kIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9icm93c2VySlNPTlA6IEJyb3dzZXJKc29ucCwgcHJpdmF0ZSBfYmFzZVJlc3BvbnNlT3B0aW9uczogUmVzcG9uc2VPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbm5lY3Rpb24ocmVxdWVzdDogUmVxdWVzdCk6IEpTT05QQ29ubmVjdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBKU09OUENvbm5lY3Rpb24ocmVxdWVzdCwgdGhpcy5fYnJvd3NlckpTT05QLCB0aGlzLl9iYXNlUmVzcG9uc2VPcHRpb25zKTtcbiAgfVxufVxuIl19
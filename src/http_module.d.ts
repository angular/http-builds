import { JSONPBackend } from './backends/jsonp_backend';
import { CookieXSRFStrategy, XHRBackend } from './backends/xhr_backend';
import { RequestOptions } from './base_request_options';
import { Http, Jsonp } from './http';
import * as i0 from "@angular/core";
export declare function _createDefaultCookieXSRFStrategy(): CookieXSRFStrategy;
export declare function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http;
export declare function jsonpFactory(jsonpBackend: JSONPBackend, requestOptions: RequestOptions): Jsonp;
/**
 * The module that includes http's providers
 *
 * @deprecated see https://angular.io/guide/http
 * @publicApi
 */
export declare class HttpModule {
    static ngModuleDef: i0.ɵNgModuleDefWithMeta<HttpModule, never, never, never>;
    static ngInjectorDef: i0.ɵInjectorDef<HttpModule>;
}
/**
 * The module that includes jsonp's providers
 *
 * @deprecated see https://angular.io/guide/http
 * @publicApi
 */
export declare class JsonpModule {
    static ngModuleDef: i0.ɵNgModuleDefWithMeta<JsonpModule, never, never, never>;
    static ngInjectorDef: i0.ɵInjectorDef<JsonpModule>;
}

import { JSONPBackend } from './src/backends/jsonp_backend';
import { CookieXSRFStrategy, XHRBackend } from './src/backends/xhr_backend';
import { RequestOptions } from './src/base_request_options';
import { Http, Jsonp } from './src/http';
export declare function _createDefaultCookieXSRFStrategy(): CookieXSRFStrategy;
export declare function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http;
export declare function jsonpFactory(jsonpBackend: JSONPBackend, requestOptions: RequestOptions): Jsonp;
/**
 * The module that includes http's providers
 *
 * @experimental
 */
export declare class HttpModule {
}
/**
 * The module that includes jsonp's providers
 *
 * @experimental
 */
export declare class JsonpModule {
}

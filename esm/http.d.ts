import { JSONPBackend } from './src/backends/jsonp_backend';
import { CookieXSRFStrategy, XHRBackend } from './src/backends/xhr_backend';
import { RequestOptions } from './src/base_request_options';
import { Http, Jsonp } from './src/http';
export { BrowserXhr } from './src/backends/browser_xhr';
export { JSONPBackend, JSONPConnection } from './src/backends/jsonp_backend';
export { CookieXSRFStrategy, XHRBackend, XHRConnection } from './src/backends/xhr_backend';
export { BaseRequestOptions, RequestOptions } from './src/base_request_options';
export { BaseResponseOptions, ResponseOptions } from './src/base_response_options';
export { ReadyState, RequestMethod, ResponseContentType, ResponseType } from './src/enums';
export { Headers } from './src/headers';
export { Http, Jsonp } from './src/http';
export { Connection, ConnectionBackend, RequestOptionsArgs, ResponseOptionsArgs, XSRFStrategy } from './src/interfaces';
export { Request } from './src/static_request';
export { Response } from './src/static_response';
export { QueryEncoder, URLSearchParams } from './src/url_search_params';
/**
 * @experimental
 */
export declare function _createDefaultCookieXSRFStrategy(): CookieXSRFStrategy;
/**
 * @experimental
 */
export declare function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http;
/**
 * @experimental
 */
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

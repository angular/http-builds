/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { ReadyState, Request } from '@angular/http';
import { ReplaySubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
/**
 *
 * Mock Connection to represent a {@link Connection} for tests.
 *
 * @deprecated use @angular/common/http instead
 */
var MockConnection = /** @class */ (function () {
    function MockConnection(req) {
        this.response = new ReplaySubject(1).pipe(take(1));
        this.readyState = ReadyState.Open;
        this.request = req;
    }
    /**
     * Sends a mock response to the connection. This response is the value that is emitted to the
     * {@link EventEmitter} returned by {@link Http}.
     *
     * ### Example
     *
     * ```
     * var connection;
     * backend.connections.subscribe(c => connection = c);
     * http.request('data.json').subscribe(res => console.log(res.text()));
     * connection.mockRespond(new Response(new ResponseOptions({ body: 'fake response' }))); //logs
     * 'fake response'
     * ```
     *
     */
    MockConnection.prototype.mockRespond = function (res) {
        if (this.readyState === ReadyState.Done || this.readyState === ReadyState.Cancelled) {
            throw new Error('Connection has already been resolved');
        }
        this.readyState = ReadyState.Done;
        this.response.next(res);
        this.response.complete();
    };
    /**
     * Not yet implemented!
     *
     * Sends the provided {@link Response} to the `downloadObserver` of the `Request`
     * associated with this connection.
     */
    MockConnection.prototype.mockDownload = function (res) {
        // this.request.downloadObserver.onNext(res);
        // if (res.bytesLoaded === res.totalBytes) {
        //   this.request.downloadObserver.onCompleted();
        // }
    };
    // TODO(jeffbcross): consider using Response type
    /**
     * Emits the provided error object as an error to the {@link Response} {@link EventEmitter}
     * returned
     * from {@link Http}.
     *
     * ### Example
     *
     * ```
     * var connection;
     * backend.connections.subscribe(c => connection = c);
     * http.request('data.json').subscribe(res => res, err => console.log(err)));
     * connection.mockError(new Error('error'));
     * ```
     *
     */
    MockConnection.prototype.mockError = function (err) {
        // Matches ResourceLoader semantics
        this.readyState = ReadyState.Done;
        this.response.error(err);
    };
    return MockConnection;
}());
export { MockConnection };
/**
 * A mock backend for testing the {@link Http} service.
 *
 * This class can be injected in tests, and should be used to override providers
 * to other backends, such as {@link XHRBackend}.
 *
 * ### Example
 *
 * ```
 * import {Injectable, Injector} from '@angular/core';
 * import {async, fakeAsync, tick} from '@angular/core/testing';
 * import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
 * import {Response, ResponseOptions} from '@angular/http';
 * import {MockBackend, MockConnection} from '@angular/http/testing';
 *
 * const HERO_ONE = 'HeroNrOne';
 * const HERO_TWO = 'WillBeAlwaysTheSecond';
 *
 * @Injectable()
 * class HeroService {
 *   constructor(private http: Http) {}
 *
 *   getHeroes(): Promise<String[]> {
 *     return this.http.get('myservices.de/api/heroes')
 *         .toPromise()
 *         .then(response => response.json().data)
 *         .catch(e => this.handleError(e));
 *   }
 *
 *   private handleError(error: any): Promise<any> {
 *     console.error('An error occurred', error);
 *     return Promise.reject(error.message || error);
 *   }
 * }
 *
 * describe('MockBackend HeroService Example', () => {
 *   beforeEach(() => {
 *     this.injector = Injector.create([
 *       {provide: ConnectionBackend, useClass: MockBackend},
 *       {provide: RequestOptions, useClass: BaseRequestOptions},
 *       Http,
 *       HeroService,
 *     ]);
 *     this.heroService = this.injector.get(HeroService);
 *     this.backend = this.injector.get(ConnectionBackend) as MockBackend;
 *     this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
 *   });
 *
 *   it('getHeroes() should query current service url', () => {
 *     this.heroService.getHeroes();
 *     expect(this.lastConnection).toBeDefined('no http service connection at all?');
 *     expect(this.lastConnection.request.url).toMatch(/api\/heroes$/, 'url invalid');
 *   });
 *
 *   it('getHeroes() should return some heroes', fakeAsync(() => {
 *        let result: String[];
 *        this.heroService.getHeroes().then((heroes: String[]) => result = heroes);
 *        this.lastConnection.mockRespond(new Response(new ResponseOptions({
 *          body: JSON.stringify({data: [HERO_ONE, HERO_TWO]}),
 *        })));
 *        tick();
 *        expect(result.length).toEqual(2, 'should contain given amount of heroes');
 *        expect(result[0]).toEqual(HERO_ONE, ' HERO_ONE should be the first hero');
 *        expect(result[1]).toEqual(HERO_TWO, ' HERO_TWO should be the second hero');
 *      }));
 *
 *   it('getHeroes() while server is down', fakeAsync(() => {
 *        let result: String[];
 *        let catchedError: any;
 *        this.heroService.getHeroes()
 *            .then((heroes: String[]) => result = heroes)
 *            .catch((error: any) => catchedError = error);
 *        this.lastConnection.mockRespond(new Response(new ResponseOptions({
 *          status: 404,
 *          statusText: 'URL not Found',
 *        })));
 *        tick();
 *        expect(result).toBeUndefined();
 *        expect(catchedError).toBeDefined();
 *      }));
 * });
 * ```
 *
 * This method only exists in the mock implementation, not in real Backends.
 *
 * @deprecated use @angular/common/http instead
 */
var MockBackend = /** @class */ (function () {
    function MockBackend() {
        var _this = this;
        this.connectionsArray = [];
        this.connections = new Subject();
        this.connections.subscribe(function (connection) { return _this.connectionsArray.push(connection); });
        this.pendingConnections = new Subject();
    }
    /**
     * Checks all connections, and raises an exception if any connection has not received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
    MockBackend.prototype.verifyNoPendingRequests = function () {
        var pending = 0;
        this.pendingConnections.subscribe(function (c) { return pending++; });
        if (pending > 0)
            throw new Error(pending + " pending connections to be resolved");
    };
    /**
     * Can be used in conjunction with `verifyNoPendingRequests` to resolve any not-yet-resolve
     * connections, if it's expected that there are connections that have not yet received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     */
    MockBackend.prototype.resolveAllConnections = function () { this.connections.subscribe(function (c) { return c.readyState = 4; }); };
    /**
     * Creates a new {@link MockConnection}. This is equivalent to calling `new
     * MockConnection()`, except that it also will emit the new `Connection` to the `connections`
     * emitter of this `MockBackend` instance. This method will usually only be used by tests
     * against the framework itself, not by end-users.
     */
    MockBackend.prototype.createConnection = function (req) {
        if (!req || !(req instanceof Request)) {
            throw new Error("createConnection requires an instance of Request, got " + req);
        }
        var connection = new MockConnection(req);
        this.connections.next(connection);
        return connection;
    };
    MockBackend.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MockBackend.ctorParameters = function () { return []; };
    return MockBackend;
}());
export { MockBackend };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19iYWNrZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvaHR0cC90ZXN0aW5nL3NyYy9tb2NrX2JhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWdDLFVBQVUsRUFBRSxPQUFPLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR3BDOzs7OztHQUtHO0FBQ0g7SUFvQkUsd0JBQVksR0FBWTtRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFRLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsb0NBQVcsR0FBWCxVQUFZLEdBQWE7UUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEYsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQzFELENBQUM7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxxQ0FBWSxHQUFaLFVBQWEsR0FBYTtRQUN4Qiw2Q0FBNkM7UUFDN0MsNENBQTRDO1FBQzVDLGlEQUFpRDtRQUNqRCxJQUFJO0lBQ04sQ0FBQztJQUVELGlEQUFpRDtJQUNqRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILGtDQUFTLEdBQVQsVUFBVSxHQUFXO1FBQ25CLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQXBGRCxJQW9GQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzRkc7QUFDSDtJQXdERTtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQ3RCLFVBQUMsVUFBMEIsSUFBSyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILDZDQUF1QixHQUF2QjtRQUNFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBaUIsSUFBSyxPQUFBLE9BQU8sRUFBRSxFQUFULENBQVMsQ0FBQyxDQUFDO1FBQ3BFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFJLE9BQU8sd0NBQXFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCwyQ0FBcUIsR0FBckIsY0FBMEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFpQixJQUFLLE9BQUEsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFaEc7Ozs7O09BS0c7SUFDSCxzQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBWTtRQUMzQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxZQUFZLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUF5RCxHQUFLLENBQUMsQ0FBQztRQUNsRixDQUFDO1FBQ0QsSUFBTSxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNwQixDQUFDOztnQkFoR0YsVUFBVTs7OztJQWlHWCxrQkFBQztDQUFBLEFBakdELElBaUdDO1NBaEdZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Nvbm5lY3Rpb24sIENvbm5lY3Rpb25CYWNrZW5kLCBSZWFkeVN0YXRlLCBSZXF1ZXN0LCBSZXNwb25zZX0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5pbXBvcnQge1JlcGxheVN1YmplY3QsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuLyoqXG4gKlxuICogTW9jayBDb25uZWN0aW9uIHRvIHJlcHJlc2VudCBhIHtAbGluayBDb25uZWN0aW9ufSBmb3IgdGVzdHMuXG4gKlxuICogQGRlcHJlY2F0ZWQgdXNlIEBhbmd1bGFyL2NvbW1vbi9odHRwIGluc3RlYWRcbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tDb25uZWN0aW9uIGltcGxlbWVudHMgQ29ubmVjdGlvbiB7XG4gIC8vIFRPRE86IE5hbWUgYHJlYWR5U3RhdGVgIHNob3VsZCBjaGFuZ2UgdG8gYmUgbW9yZSBnZW5lcmljLCBhbmQgc3RhdGVzIGNvdWxkIGJlIG1hZGUgdG8gYmUgbW9yZVxuICAvLyBkZXNjcmlwdGl2ZSB0aGFuIFJlc291cmNlTG9hZGVyIHN0YXRlcy5cbiAgLyoqXG4gICAqIERlc2NyaWJlcyB0aGUgc3RhdGUgb2YgdGhlIGNvbm5lY3Rpb24sIGJhc2VkIG9uIGBYTUxIdHRwUmVxdWVzdC5yZWFkeVN0YXRlYCwgYnV0IHdpdGhcbiAgICogYWRkaXRpb25hbCBzdGF0ZXMuIEZvciBleGFtcGxlLCBzdGF0ZSA1IGluZGljYXRlcyBhbiBhYm9ydGVkIGNvbm5lY3Rpb24uXG4gICAqL1xuICByZWFkeVN0YXRlOiBSZWFkeVN0YXRlO1xuXG4gIC8qKlxuICAgKiB7QGxpbmsgUmVxdWVzdH0gaW5zdGFuY2UgdXNlZCB0byBjcmVhdGUgdGhlIGNvbm5lY3Rpb24uXG4gICAqL1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuXG4gIC8qKlxuICAgKiB7QGxpbmsgRXZlbnRFbWl0dGVyfSBvZiB7QGxpbmsgUmVzcG9uc2V9LiBDYW4gYmUgc3Vic2NyaWJlZCB0byBpbiBvcmRlciB0byBiZSBub3RpZmllZCB3aGVuIGFcbiAgICogcmVzcG9uc2UgaXMgYXZhaWxhYmxlLlxuICAgKi9cbiAgcmVzcG9uc2U6IFJlcGxheVN1YmplY3Q8UmVzcG9uc2U+O1xuXG4gIGNvbnN0cnVjdG9yKHJlcTogUmVxdWVzdCkge1xuICAgIHRoaXMucmVzcG9uc2UgPSA8YW55Pm5ldyBSZXBsYXlTdWJqZWN0KDEpLnBpcGUodGFrZSgxKSk7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gUmVhZHlTdGF0ZS5PcGVuO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1vY2sgcmVzcG9uc2UgdG8gdGhlIGNvbm5lY3Rpb24uIFRoaXMgcmVzcG9uc2UgaXMgdGhlIHZhbHVlIHRoYXQgaXMgZW1pdHRlZCB0byB0aGVcbiAgICoge0BsaW5rIEV2ZW50RW1pdHRlcn0gcmV0dXJuZWQgYnkge0BsaW5rIEh0dHB9LlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogdmFyIGNvbm5lY3Rpb247XG4gICAqIGJhY2tlbmQuY29ubmVjdGlvbnMuc3Vic2NyaWJlKGMgPT4gY29ubmVjdGlvbiA9IGMpO1xuICAgKiBodHRwLnJlcXVlc3QoJ2RhdGEuanNvbicpLnN1YnNjcmliZShyZXMgPT4gY29uc29sZS5sb2cocmVzLnRleHQoKSkpO1xuICAgKiBjb25uZWN0aW9uLm1vY2tSZXNwb25kKG5ldyBSZXNwb25zZShuZXcgUmVzcG9uc2VPcHRpb25zKHsgYm9keTogJ2Zha2UgcmVzcG9uc2UnIH0pKSk7IC8vbG9nc1xuICAgKiAnZmFrZSByZXNwb25zZSdcbiAgICogYGBgXG4gICAqXG4gICAqL1xuICBtb2NrUmVzcG9uZChyZXM6IFJlc3BvbnNlKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0ZS5Eb25lIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gUmVhZHlTdGF0ZS5DYW5jZWxsZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29ubmVjdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlc29sdmVkJyk7XG4gICAgfVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFJlYWR5U3RhdGUuRG9uZTtcbiAgICB0aGlzLnJlc3BvbnNlLm5leHQocmVzKTtcbiAgICB0aGlzLnJlc3BvbnNlLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogTm90IHlldCBpbXBsZW1lbnRlZCFcbiAgICpcbiAgICogU2VuZHMgdGhlIHByb3ZpZGVkIHtAbGluayBSZXNwb25zZX0gdG8gdGhlIGBkb3dubG9hZE9ic2VydmVyYCBvZiB0aGUgYFJlcXVlc3RgXG4gICAqIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGNvbm5lY3Rpb24uXG4gICAqL1xuICBtb2NrRG93bmxvYWQocmVzOiBSZXNwb25zZSkge1xuICAgIC8vIHRoaXMucmVxdWVzdC5kb3dubG9hZE9ic2VydmVyLm9uTmV4dChyZXMpO1xuICAgIC8vIGlmIChyZXMuYnl0ZXNMb2FkZWQgPT09IHJlcy50b3RhbEJ5dGVzKSB7XG4gICAgLy8gICB0aGlzLnJlcXVlc3QuZG93bmxvYWRPYnNlcnZlci5vbkNvbXBsZXRlZCgpO1xuICAgIC8vIH1cbiAgfVxuXG4gIC8vIFRPRE8oamVmZmJjcm9zcyk6IGNvbnNpZGVyIHVzaW5nIFJlc3BvbnNlIHR5cGVcbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBwcm92aWRlZCBlcnJvciBvYmplY3QgYXMgYW4gZXJyb3IgdG8gdGhlIHtAbGluayBSZXNwb25zZX0ge0BsaW5rIEV2ZW50RW1pdHRlcn1cbiAgICogcmV0dXJuZWRcbiAgICogZnJvbSB7QGxpbmsgSHR0cH0uXG4gICAqXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYFxuICAgKiB2YXIgY29ubmVjdGlvbjtcbiAgICogYmFja2VuZC5jb25uZWN0aW9ucy5zdWJzY3JpYmUoYyA9PiBjb25uZWN0aW9uID0gYyk7XG4gICAqIGh0dHAucmVxdWVzdCgnZGF0YS5qc29uJykuc3Vic2NyaWJlKHJlcyA9PiByZXMsIGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKSk7XG4gICAqIGNvbm5lY3Rpb24ubW9ja0Vycm9yKG5ldyBFcnJvcignZXJyb3InKSk7XG4gICAqIGBgYFxuICAgKlxuICAgKi9cbiAgbW9ja0Vycm9yKGVycj86IEVycm9yKSB7XG4gICAgLy8gTWF0Y2hlcyBSZXNvdXJjZUxvYWRlciBzZW1hbnRpY3NcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBSZWFkeVN0YXRlLkRvbmU7XG4gICAgdGhpcy5yZXNwb25zZS5lcnJvcihlcnIpO1xuICB9XG59XG5cbi8qKlxuICogQSBtb2NrIGJhY2tlbmQgZm9yIHRlc3RpbmcgdGhlIHtAbGluayBIdHRwfSBzZXJ2aWNlLlxuICpcbiAqIFRoaXMgY2xhc3MgY2FuIGJlIGluamVjdGVkIGluIHRlc3RzLCBhbmQgc2hvdWxkIGJlIHVzZWQgdG8gb3ZlcnJpZGUgcHJvdmlkZXJzXG4gKiB0byBvdGhlciBiYWNrZW5kcywgc3VjaCBhcyB7QGxpbmsgWEhSQmFja2VuZH0uXG4gKlxuICogIyMjIEV4YW1wbGVcbiAqXG4gKiBgYGBcbiAqIGltcG9ydCB7SW5qZWN0YWJsZSwgSW5qZWN0b3J9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHthc3luYywgZmFrZUFzeW5jLCB0aWNrfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuICogaW1wb3J0IHtCYXNlUmVxdWVzdE9wdGlvbnMsIENvbm5lY3Rpb25CYWNrZW5kLCBIdHRwLCBSZXF1ZXN0T3B0aW9uc30gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG4gKiBpbXBvcnQge1Jlc3BvbnNlLCBSZXNwb25zZU9wdGlvbnN9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuICogaW1wb3J0IHtNb2NrQmFja2VuZCwgTW9ja0Nvbm5lY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2h0dHAvdGVzdGluZyc7XG4gKlxuICogY29uc3QgSEVST19PTkUgPSAnSGVyb05yT25lJztcbiAqIGNvbnN0IEhFUk9fVFdPID0gJ1dpbGxCZUFsd2F5c1RoZVNlY29uZCc7XG4gKlxuICogQEluamVjdGFibGUoKVxuICogY2xhc3MgSGVyb1NlcnZpY2Uge1xuICogICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHt9XG4gKlxuICogICBnZXRIZXJvZXMoKTogUHJvbWlzZTxTdHJpbmdbXT4ge1xuICogICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdteXNlcnZpY2VzLmRlL2FwaS9oZXJvZXMnKVxuICogICAgICAgICAudG9Qcm9taXNlKClcbiAqICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpLmRhdGEpXG4gKiAgICAgICAgIC5jYXRjaChlID0+IHRoaXMuaGFuZGxlRXJyb3IoZSkpO1xuICogICB9XG4gKlxuICogICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICogICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkJywgZXJyb3IpO1xuICogICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAqICAgfVxuICogfVxuICpcbiAqIGRlc2NyaWJlKCdNb2NrQmFja2VuZCBIZXJvU2VydmljZSBFeGFtcGxlJywgKCkgPT4ge1xuICogICBiZWZvcmVFYWNoKCgpID0+IHtcbiAqICAgICB0aGlzLmluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKFtcbiAqICAgICAgIHtwcm92aWRlOiBDb25uZWN0aW9uQmFja2VuZCwgdXNlQ2xhc3M6IE1vY2tCYWNrZW5kfSxcbiAqICAgICAgIHtwcm92aWRlOiBSZXF1ZXN0T3B0aW9ucywgdXNlQ2xhc3M6IEJhc2VSZXF1ZXN0T3B0aW9uc30sXG4gKiAgICAgICBIdHRwLFxuICogICAgICAgSGVyb1NlcnZpY2UsXG4gKiAgICAgXSk7XG4gKiAgICAgdGhpcy5oZXJvU2VydmljZSA9IHRoaXMuaW5qZWN0b3IuZ2V0KEhlcm9TZXJ2aWNlKTtcbiAqICAgICB0aGlzLmJhY2tlbmQgPSB0aGlzLmluamVjdG9yLmdldChDb25uZWN0aW9uQmFja2VuZCkgYXMgTW9ja0JhY2tlbmQ7XG4gKiAgICAgdGhpcy5iYWNrZW5kLmNvbm5lY3Rpb25zLnN1YnNjcmliZSgoY29ubmVjdGlvbjogYW55KSA9PiB0aGlzLmxhc3RDb25uZWN0aW9uID0gY29ubmVjdGlvbik7XG4gKiAgIH0pO1xuICpcbiAqICAgaXQoJ2dldEhlcm9lcygpIHNob3VsZCBxdWVyeSBjdXJyZW50IHNlcnZpY2UgdXJsJywgKCkgPT4ge1xuICogICAgIHRoaXMuaGVyb1NlcnZpY2UuZ2V0SGVyb2VzKCk7XG4gKiAgICAgZXhwZWN0KHRoaXMubGFzdENvbm5lY3Rpb24pLnRvQmVEZWZpbmVkKCdubyBodHRwIHNlcnZpY2UgY29ubmVjdGlvbiBhdCBhbGw/Jyk7XG4gKiAgICAgZXhwZWN0KHRoaXMubGFzdENvbm5lY3Rpb24ucmVxdWVzdC51cmwpLnRvTWF0Y2goL2FwaVxcL2hlcm9lcyQvLCAndXJsIGludmFsaWQnKTtcbiAqICAgfSk7XG4gKlxuICogICBpdCgnZ2V0SGVyb2VzKCkgc2hvdWxkIHJldHVybiBzb21lIGhlcm9lcycsIGZha2VBc3luYygoKSA9PiB7XG4gKiAgICAgICAgbGV0IHJlc3VsdDogU3RyaW5nW107XG4gKiAgICAgICAgdGhpcy5oZXJvU2VydmljZS5nZXRIZXJvZXMoKS50aGVuKChoZXJvZXM6IFN0cmluZ1tdKSA9PiByZXN1bHQgPSBoZXJvZXMpO1xuICogICAgICAgIHRoaXMubGFzdENvbm5lY3Rpb24ubW9ja1Jlc3BvbmQobmV3IFJlc3BvbnNlKG5ldyBSZXNwb25zZU9wdGlvbnMoe1xuICogICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2RhdGE6IFtIRVJPX09ORSwgSEVST19UV09dfSksXG4gKiAgICAgICAgfSkpKTtcbiAqICAgICAgICB0aWNrKCk7XG4gKiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMiwgJ3Nob3VsZCBjb250YWluIGdpdmVuIGFtb3VudCBvZiBoZXJvZXMnKTtcbiAqICAgICAgICBleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKEhFUk9fT05FLCAnIEhFUk9fT05FIHNob3VsZCBiZSB0aGUgZmlyc3QgaGVybycpO1xuICogICAgICAgIGV4cGVjdChyZXN1bHRbMV0pLnRvRXF1YWwoSEVST19UV08sICcgSEVST19UV08gc2hvdWxkIGJlIHRoZSBzZWNvbmQgaGVybycpO1xuICogICAgICB9KSk7XG4gKlxuICogICBpdCgnZ2V0SGVyb2VzKCkgd2hpbGUgc2VydmVyIGlzIGRvd24nLCBmYWtlQXN5bmMoKCkgPT4ge1xuICogICAgICAgIGxldCByZXN1bHQ6IFN0cmluZ1tdO1xuICogICAgICAgIGxldCBjYXRjaGVkRXJyb3I6IGFueTtcbiAqICAgICAgICB0aGlzLmhlcm9TZXJ2aWNlLmdldEhlcm9lcygpXG4gKiAgICAgICAgICAgIC50aGVuKChoZXJvZXM6IFN0cmluZ1tdKSA9PiByZXN1bHQgPSBoZXJvZXMpXG4gKiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4gY2F0Y2hlZEVycm9yID0gZXJyb3IpO1xuICogICAgICAgIHRoaXMubGFzdENvbm5lY3Rpb24ubW9ja1Jlc3BvbmQobmV3IFJlc3BvbnNlKG5ldyBSZXNwb25zZU9wdGlvbnMoe1xuICogICAgICAgICAgc3RhdHVzOiA0MDQsXG4gKiAgICAgICAgICBzdGF0dXNUZXh0OiAnVVJMIG5vdCBGb3VuZCcsXG4gKiAgICAgICAgfSkpKTtcbiAqICAgICAgICB0aWNrKCk7XG4gKiAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZVVuZGVmaW5lZCgpO1xuICogICAgICAgIGV4cGVjdChjYXRjaGVkRXJyb3IpLnRvQmVEZWZpbmVkKCk7XG4gKiAgICAgIH0pKTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogVGhpcyBtZXRob2Qgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICpcbiAqIEBkZXByZWNhdGVkIHVzZSBAYW5ndWxhci9jb21tb24vaHR0cCBpbnN0ZWFkXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2NrQmFja2VuZCBpbXBsZW1lbnRzIENvbm5lY3Rpb25CYWNrZW5kIHtcbiAgLyoqXG4gICAqIHtAbGluayBFdmVudEVtaXR0ZXJ9XG4gICAqIG9mIHtAbGluayBNb2NrQ29ubmVjdGlvbn0gaW5zdGFuY2VzIHRoYXQgaGF2ZSBiZWVuIGNyZWF0ZWQgYnkgdGhpcyBiYWNrZW5kLiBDYW4gYmUgc3Vic2NyaWJlZFxuICAgKiB0byBpbiBvcmRlciB0byByZXNwb25kIHRvIGNvbm5lY3Rpb25zLlxuICAgKlxuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBgYGBcbiAgICogaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4gICAqIGltcG9ydCB7ZmFrZUFzeW5jLCB0aWNrfSBmcm9tICdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnO1xuICAgKiBpbXBvcnQge0Jhc2VSZXF1ZXN0T3B0aW9ucywgQ29ubmVjdGlvbkJhY2tlbmQsIEh0dHAsIFJlcXVlc3RPcHRpb25zfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAgICogaW1wb3J0IHtSZXNwb25zZSwgUmVzcG9uc2VPcHRpb25zfSBmcm9tICdAYW5ndWxhci9odHRwJztcbiAgICogaW1wb3J0IHtNb2NrQmFja2VuZCwgTW9ja0Nvbm5lY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2h0dHAvdGVzdGluZyc7XG4gICAqXG4gICAqIGl0KCdzaG91bGQgZ2V0IGEgcmVzcG9uc2UnLCBmYWtlQXN5bmMoKCkgPT4ge1xuICAgKiAgICAgIGxldCBjb25uZWN0aW9uOlxuICAgKiAgICAgICAgICBNb2NrQ29ubmVjdGlvbjsgIC8vIHRoaXMgd2lsbCBiZSBzZXQgd2hlbiBhIG5ldyBjb25uZWN0aW9uIGlzIGVtaXR0ZWQgZnJvbSB0aGVcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBiYWNrZW5kLlxuICAgKiAgICAgIGxldCB0ZXh0OiBzdHJpbmc7ICAgIC8vIHRoaXMgd2lsbCBiZSBzZXQgZnJvbSBtb2NrIHJlc3BvbnNlXG4gICAqICAgICAgbGV0IGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKFtcbiAgICogICAgICAgIHtwcm92aWRlOiBDb25uZWN0aW9uQmFja2VuZCwgdXNlQ2xhc3M6IE1vY2tCYWNrZW5kfSxcbiAgICogICAgICAgIHtwcm92aWRlOiBSZXF1ZXN0T3B0aW9ucywgdXNlQ2xhc3M6IEJhc2VSZXF1ZXN0T3B0aW9uc30sXG4gICAqICAgICAgICBIdHRwLFxuICAgKiAgICAgIF0pO1xuICAgKiAgICAgIGxldCBiYWNrZW5kID0gaW5qZWN0b3IuZ2V0KENvbm5lY3Rpb25CYWNrZW5kKTtcbiAgICogICAgICBsZXQgaHR0cCA9IGluamVjdG9yLmdldChIdHRwKTtcbiAgICogICAgICBiYWNrZW5kLmNvbm5lY3Rpb25zLnN1YnNjcmliZSgoYzogTW9ja0Nvbm5lY3Rpb24pID0+IGNvbm5lY3Rpb24gPSBjKTtcbiAgICogICAgICBodHRwLnJlcXVlc3QoJ3NvbWV0aGluZy5qc29uJykudG9Qcm9taXNlKCkudGhlbigocmVzOiBhbnkpID0+IHRleHQgPSByZXMudGV4dCgpKTtcbiAgICogICAgICBjb25uZWN0aW9uLm1vY2tSZXNwb25kKG5ldyBSZXNwb25zZShuZXcgUmVzcG9uc2VPcHRpb25zKHtib2R5OiAnU29tZXRoaW5nJ30pKSk7XG4gICAqICAgICAgdGljaygpO1xuICAgKiAgICAgIGV4cGVjdCh0ZXh0KS50b0JlKCdTb21ldGhpbmcnKTtcbiAgICogICAgfSkpO1xuICAgKiBgYGBcbiAgICpcbiAgICogVGhpcyBwcm9wZXJ0eSBvbmx5IGV4aXN0cyBpbiB0aGUgbW9jayBpbXBsZW1lbnRhdGlvbiwgbm90IGluIHJlYWwgQmFja2VuZHMuXG4gICAqL1xuICBjb25uZWN0aW9uczogYW55OyAgLy88TW9ja0Nvbm5lY3Rpb24+XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IHJlcHJlc2VudGF0aW9uIG9mIGBjb25uZWN0aW9uc2AuIFRoaXMgYXJyYXkgd2lsbCBiZSB1cGRhdGVkIHdpdGggZWFjaCBjb25uZWN0aW9uIHRoYXRcbiAgICogaXMgY3JlYXRlZCBieSB0aGlzIGJhY2tlbmQuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICAgKi9cbiAgY29ubmVjdGlvbnNBcnJheTogTW9ja0Nvbm5lY3Rpb25bXTtcbiAgLyoqXG4gICAqIHtAbGluayBFdmVudEVtaXR0ZXJ9IG9mIHtAbGluayBNb2NrQ29ubmVjdGlvbn0gaW5zdGFuY2VzIHRoYXQgaGF2ZW4ndCB5ZXQgYmVlbiByZXNvbHZlZCAoaS5lLlxuICAgKiB3aXRoIGEgYHJlYWR5U3RhdGVgXG4gICAqIGxlc3MgdGhhbiA0KS4gVXNlZCBpbnRlcm5hbGx5IHRvIHZlcmlmeSB0aGF0IG5vIGNvbm5lY3Rpb25zIGFyZSBwZW5kaW5nIHZpYSB0aGVcbiAgICogYHZlcmlmeU5vUGVuZGluZ1JlcXVlc3RzYCBtZXRob2QuXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICAgKi9cbiAgcGVuZGluZ0Nvbm5lY3Rpb25zOiBhbnk7ICAvLyBTdWJqZWN0PE1vY2tDb25uZWN0aW9uPlxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb25zQXJyYXkgPSBbXTtcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gbmV3IFN1YmplY3QoKTtcbiAgICB0aGlzLmNvbm5lY3Rpb25zLnN1YnNjcmliZShcbiAgICAgICAgKGNvbm5lY3Rpb246IE1vY2tDb25uZWN0aW9uKSA9PiB0aGlzLmNvbm5lY3Rpb25zQXJyYXkucHVzaChjb25uZWN0aW9uKSk7XG4gICAgdGhpcy5wZW5kaW5nQ29ubmVjdGlvbnMgPSBuZXcgU3ViamVjdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBhbGwgY29ubmVjdGlvbnMsIGFuZCByYWlzZXMgYW4gZXhjZXB0aW9uIGlmIGFueSBjb25uZWN0aW9uIGhhcyBub3QgcmVjZWl2ZWQgYSByZXNwb25zZS5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICAgKi9cbiAgdmVyaWZ5Tm9QZW5kaW5nUmVxdWVzdHMoKSB7XG4gICAgbGV0IHBlbmRpbmcgPSAwO1xuICAgIHRoaXMucGVuZGluZ0Nvbm5lY3Rpb25zLnN1YnNjcmliZSgoYzogTW9ja0Nvbm5lY3Rpb24pID0+IHBlbmRpbmcrKyk7XG4gICAgaWYgKHBlbmRpbmcgPiAwKSB0aHJvdyBuZXcgRXJyb3IoYCR7cGVuZGluZ30gcGVuZGluZyBjb25uZWN0aW9ucyB0byBiZSByZXNvbHZlZGApO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYHZlcmlmeU5vUGVuZGluZ1JlcXVlc3RzYCB0byByZXNvbHZlIGFueSBub3QteWV0LXJlc29sdmVcbiAgICogY29ubmVjdGlvbnMsIGlmIGl0J3MgZXhwZWN0ZWQgdGhhdCB0aGVyZSBhcmUgY29ubmVjdGlvbnMgdGhhdCBoYXZlIG5vdCB5ZXQgcmVjZWl2ZWQgYSByZXNwb25zZS5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgb25seSBleGlzdHMgaW4gdGhlIG1vY2sgaW1wbGVtZW50YXRpb24sIG5vdCBpbiByZWFsIEJhY2tlbmRzLlxuICAgKi9cbiAgcmVzb2x2ZUFsbENvbm5lY3Rpb25zKCkgeyB0aGlzLmNvbm5lY3Rpb25zLnN1YnNjcmliZSgoYzogTW9ja0Nvbm5lY3Rpb24pID0+IGMucmVhZHlTdGF0ZSA9IDQpOyB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcge0BsaW5rIE1vY2tDb25uZWN0aW9ufS4gVGhpcyBpcyBlcXVpdmFsZW50IHRvIGNhbGxpbmcgYG5ld1xuICAgKiBNb2NrQ29ubmVjdGlvbigpYCwgZXhjZXB0IHRoYXQgaXQgYWxzbyB3aWxsIGVtaXQgdGhlIG5ldyBgQ29ubmVjdGlvbmAgdG8gdGhlIGBjb25uZWN0aW9uc2BcbiAgICogZW1pdHRlciBvZiB0aGlzIGBNb2NrQmFja2VuZGAgaW5zdGFuY2UuIFRoaXMgbWV0aG9kIHdpbGwgdXN1YWxseSBvbmx5IGJlIHVzZWQgYnkgdGVzdHNcbiAgICogYWdhaW5zdCB0aGUgZnJhbWV3b3JrIGl0c2VsZiwgbm90IGJ5IGVuZC11c2Vycy5cbiAgICovXG4gIGNyZWF0ZUNvbm5lY3Rpb24ocmVxOiBSZXF1ZXN0KTogTW9ja0Nvbm5lY3Rpb24ge1xuICAgIGlmICghcmVxIHx8ICEocmVxIGluc3RhbmNlb2YgUmVxdWVzdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgY3JlYXRlQ29ubmVjdGlvbiByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBSZXF1ZXN0LCBnb3QgJHtyZXF9YCk7XG4gICAgfVxuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBuZXcgTW9ja0Nvbm5lY3Rpb24ocmVxKTtcbiAgICB0aGlzLmNvbm5lY3Rpb25zLm5leHQoY29ubmVjdGlvbik7XG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gIH1cbn1cbiJdfQ==
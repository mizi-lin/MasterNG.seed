import {
    Http,
    Headers,
    Response,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs
} from '@angular/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {GLOBAL} from './global';
import {CONST} from './const';

declare var mu: any, console: any;

/**
 * http 拦截器
 *
 * httpInterceptor.v1.0
 *
 * 1. 在 header 中设置 token
 * 2. 异常处理
 * 3. map 数据同步处理
 *
 * observable 流程处理
 * map()：遍历流
 * filter()：过滤流
 * do()：监视流（通常打个console而已）
 * catch()：捕获异常
 * subscribe()：订阅流（即执行）
 */

@Injectable()
export class HttpInterceptor extends Http {
    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                router: Router,
                private G: GLOBAL) {
        super(backend, defaultOptions);
    }

    addHeaderWithToken(headers: Headers): Headers {
        headers = headers || new Headers();
        headers.append(CONST.HEADER_TOKEN, mu.storage(CONST.HEADER_TOKEN));
        return headers;
    }

    map(observable: Observable<Response>, method: string): Observable<Response> {
        return observable.map((response: Response) => {
            let body = response.json();

            if (method === 'patch') {
                this.G.httpStatus = 200;
            }

            return body || {};
        });
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err: any, source: Observable<Response>) => {
            this.G.httpStatus = err.status;

            // if (err.status  == 401 && !_.endsWith(err.url, 'api/auth/login')) {
            if (err.status === 401) {
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        return this.intercept(this.map(super.get(url, options), 'get'));
    }

    post(url: string, body?: any, options?: any): Observable<any> {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        options.headers.append('Content-Type', 'application/json');
        return this.intercept(this.map(super.post(url, body, options), 'post'));
    }

    patch(url: string,  data?: any, options?: any): Observable<any> {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        options.headers.append('Content-Type', 'application/json');
        return this.intercept(this.map(super.patch(url, data, options), 'patch'));
    }
}

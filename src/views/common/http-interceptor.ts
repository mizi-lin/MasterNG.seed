import {Http, Headers, Response, ConnectionBackend, RequestOptions, RequestOptionsArgs} from '@angular/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GLOBAL} from './global';
import {CONST} from './const';
import 'rxjs/add/operator/debounceTime';

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
export class $$HttpInterceptor extends Http {
    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                router: Router,
                private G: GLOBAL) {
        super(backend, defaultOptions);
    }

    __timer__: any;

    addHeaderWithToken(headers: Headers): Headers {
        headers = headers || new Headers();
        headers.append(CONST.HEADER_TOKEN, mu.storage(CONST.HEADER_TOKEN));
        return headers;
    }

    map(observable: Observable<Response>, method: string): Observable<Response> {
        return observable.map((response: Response) => {
            let body = response.json();

            if (mu.or(method, 'patch', 'post')) {
                this.G.httpStatus = 200;

                this.__timer__ && clearTimeout(this.__timer__);
                this.__timer__ = setTimeout(() => {
                    this.G.httpStatus = 0;
                }, 2000);
            }

            return body || {};
        });
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err: any, source: Observable<Response>) => {
                let status: any = this.G.httpStatus = err.status;
                let title: string;
                let error: any;

                switch (status) {
                    case 401:
                        title = 'TOKEN失效';
                        break;
                    case 404:
                        title = '页面不存在';
                        break;
                    case 500:
                        title = '操作错误或失败';
                        break;
                    case 502:
                        title = '连接中断';
                        break;
                    default:
                        title = '操作失败';
                        break;
                }

                if (status === 404) {
                    error = {
                        data: [
                            {message: '当前页面或资源不存在'}
                        ]
                    };
                } else if (status === 502) {
                    error = {
                        data: [
                            {message: '网络连接错误'},
                            {message: '或服务器连接中断'}
                        ]
                    };
                } else {
                    error = err.json();
                }

                this.G.httpError = {
                    status: status,
                    title: title,
                    error: error
                };

                this.__timer__ && clearTimeout(this.__timer__);
                this.__timer__ = setTimeout(() => {
                    this.G.httpStatus = 0;
                }, 2000);

                // if (err.status  == 401 && !_.endsWith(err.url, 'api/auth/login')) {
                if (err.status === 401) {
                    return Observable.empty();
                } else {
                    return Observable.throw(err);
                }
            }
        );
    }


    get(url: string, options ?: RequestOptionsArgs): Observable < any > {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        return this.intercept(this.map(super.get(url, options), 'get'));
    }

    post(url: string, body ?: any, options ?: any): Observable < any > {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        options.headers.append('Content-Type', 'application/json');
        return this.intercept(this.map(super.post(url, body, options), 'post'));
    }

    patch(url: string, data ?: any, options ?: any): Observable < any > {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        options.headers.append('Content-Type', 'application/json');
        return this.intercept(this.map(super.patch(url, data, options), 'patch'));
    }
}

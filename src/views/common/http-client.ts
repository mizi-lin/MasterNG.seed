import {Http, Headers, Response, URLSearchParams} from '@angular/http';

import {Injectable} from '@angular/core';
import {HEADER_TOKEN} from './const';

declare var mu: any;
declare var console: any;

/**
 * http 服务的补充
 * 1. 简单 restful 的支持
 * 2. map 数据
 * 3. 操作成功提醒
 * 4. 载入处理
 * 5. 异常处理
 *
 *  httpClient.v1.0
 *
 * observable 流程处理
 * map()：遍历流
 * filter()：过滤流
 * do()：监视流（通常打个console而已）
 * catch()：捕获异常
 * subscribe()：订阅流（即执行）
 */

@Injectable()
export class HttpClient {

    constructor(private http: Http) {
        this.http = http;
    }

    private addHeaderWithToken(headers: Headers) {
        headers.append(HEADER_TOKEN, mu.storage(HEADER_TOKEN));
    }

    private resbody(response: Response) {
        let body = response.json();
        return body || {};
    }

    /**
     * URL to REST_URL
     * @param url
     * @param params
     * @param isReplace | true : 是否将不存在的占位符转为''(空)
     * @returns {{url: string, searchParams: URLSearchParams, search: any, params: any}}
     */
    private restful(url: string, params: any, isReplace?: boolean) {
        url = url || '';
        isReplace = mu.ifnvl(isReplace, true);

        let sp: any = mu.clone(params || {});
        let restParams: any = {};

        url = url.replace(/\{(.+?)\}/g, function (m: string, key: string) {
            return mu.run(sp[key], function (v: string) {
                    restParams[key] = v;
                    sp = mu.remove(sp, key);
                    return v;
                }) || (isReplace ? '' : m);
        });

        url = url.replace(/\/$/, '');

        let searchParams: URLSearchParams = new URLSearchParams();

        mu.run(sp, (p)=> {
            mu.each(p, (v: any, k: string)=> searchParams.set(k, v));
        });

        return {
            url: url,
            searchParams: searchParams,
            search: sp,
            params: params,
            restParams: restParams
        };
    }

    get(url: string, search?: any, options?: any) {

        let headers = new Headers();
        let rest = this.restful(url, search);
        url = rest.url;

        this.addHeaderWithToken(headers);

        options = mu.extend(true, {
            headers: headers,
            search: rest.searchParams
        }, options || {});

        return this.http.get(url, options).map(this.resbody);
    }

    post(url: string, search?: any, data?: any, options?: any) {

        switch (arguments.length) {
            case 1:
                data = {};
                search = {};
                options = {};
                break;
            case 2:
                data = arguments[1];
                search = {};
                options = {};
                break;
            case 3:
                options = {};
                break;
        }

        let rest = this.restful(url, search, false);
        let restdata = this.restful(rest.url, data, true);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.addHeaderWithToken(headers);

        options = mu.extend(true, {
            headers: headers,
            search: rest.searchParams
        }, options || {});

        return this.http.post(restdata.url, data, options).map(this.resbody);
    }

    patch(url: string, search?: any, data?: any, options?: any) {
        switch (arguments.length) {
            case 1:
                search = {};
                data = {};
                options = {};
                break;
            case 2:
                search = {};
                data = arguments[1];
                options = {};
                break;
            case 3:
                options = {};
                break;
        }


        let rest = this.restful(url, search, false);
        let restdata = this.restful(rest.url, data, true);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.addHeaderWithToken(headers);

        options = mu.extend(true, {
            headers: headers,
            search: rest.searchParams
        }, options || {});

        return this.http.patch(restdata.url, data, options).map(this.resbody);
    }

}
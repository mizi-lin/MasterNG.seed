import {Http, Headers, Response, URLSearchParams} from '@angular/http';

import {Injectable} from '@angular/core';
import {HEADER_TOKEN} from './const';

declare var mu: any;
declare var console: any;

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

    private restful(url: string, params: any) {
        url = url || '';
        let sp = mu.clone(params || {});

        url = url.replace(/\{(.+)\}/g, function (m: string, key: string) {
            return mu.run(sp[key], function (v: string) {
                    sp = mu.remove(sp, key);
                    return v;
                }) || '';
        });

        let searchParams: URLSearchParams = new URLSearchParams();

        mu.run(sp, (p)=> {
            mu.each(p, (v: any, k: string)=> searchParams.set(k, v));
        });

        return {
            url: url,
            searchParams: searchParams,
            search: sp,
            params: params
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

        let rest = this.restful(url, search);
        let restdata = this.restful(rest.url, data);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.addHeaderWithToken(headers);

        options = mu.extend(true, {
            headers: headers,
            search: rest.searchParams
        }, options || {});

        return this.http.post(url, data, options).map(this.resbody);
    }

    patch(url: string, search?: any, data?: any, options?: any) {
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

        let rest = this.restful(url, search);
        let restdata = this.restful(rest.url, data);

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
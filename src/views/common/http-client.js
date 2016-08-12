"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var const_1 = require('./const');
var HttpClient = (function () {
    function HttpClient(http) {
        this.http = http;
        this.http = http;
    }
    HttpClient.prototype.addHeaderWithToken = function (headers) {
        headers.append(const_1.HEADER_TOKEN, mu.storage(const_1.HEADER_TOKEN));
    };
    HttpClient.prototype.resbody = function (response) {
        var body = response.json();
        return body || {};
    };
    HttpClient.prototype.restful = function (url, params, isReplace) {
        url = url || '';
        isReplace = mu.ifnvl(isReplace, true);
        var sp = mu.clone(params || {});
        var restParams = {};
        url = url.replace(/\{(.+?)\}/g, function (m, key) {
            return mu.run(sp[key], function (v) {
                restParams[key] = v;
                sp = mu.remove(sp, key);
                return v;
            }) || (isReplace ? '' : m);
        });
        url = url.replace(/\/$/, '');
        var searchParams = new http_1.URLSearchParams();
        mu.run(sp, function (p) {
            mu.each(p, function (v, k) { return searchParams.set(k, v); });
        });
        return {
            url: url,
            searchParams: searchParams,
            search: sp,
            params: params,
            restParams: restParams
        };
    };
    HttpClient.prototype.get = function (url, search, options) {
        var headers = new http_1.Headers();
        var rest = this.restful(url, search);
        url = rest.url;
        this.addHeaderWithToken(headers);
        options = mu.extend(true, {
            headers: headers,
            search: rest.searchParams
        }, options || {});
        return this.http.get(url, options).map(this.resbody);
    };
    HttpClient.prototype.post = function (url, search, data, options) {
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
        var rest = this.restful(url, search, false);
        var restdata = this.restful(rest.url, data, true);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.addHeaderWithToken(headers);
        options = mu.extend(true, {
            headers: headers,
            search: rest.searchParams
        }, options || {});
        return this.http.post(restdata.url, data, options).map(this.resbody);
    };
    HttpClient.prototype.patch = function (url, search, data, options) {
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
        var rest = this.restful(url, search, false);
        var restdata = this.restful(rest.url, data, true);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.addHeaderWithToken(headers);
        options = mu.extend(true, {
            headers: headers,
            search: rest.searchParams
        }, options || {});
        return this.http.patch(restdata.url, data, options).map(this.resbody);
    };
    HttpClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpClient);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=http-client.js.map
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var rxjs_1 = require('rxjs');
var global_1 = require('./global');
var const_1 = require('./const');
require('rxjs/add/operator/debounceTime');
var $$HttpInterceptor = (function (_super) {
    __extends($$HttpInterceptor, _super);
    function $$HttpInterceptor(backend, defaultOptions, router, G) {
        _super.call(this, backend, defaultOptions);
        this.G = G;
    }
    $$HttpInterceptor.prototype.addHeaderWithToken = function (headers) {
        headers = headers || new http_1.Headers();
        headers.append(const_1.CONST.HEADER_TOKEN, mu.storage(const_1.CONST.HEADER_TOKEN));
        return headers;
    };
    $$HttpInterceptor.prototype.map = function (observable, method) {
        var _this = this;
        return observable.map(function (response) {
            var body = response.json();
            if (mu.or(method, 'patch', 'post')) {
                _this.G.httpStatus = 200;
                _this.__timer__ && clearTimeout(_this.__timer__);
                _this.__timer__ = setTimeout(function () {
                    _this.G.httpStatus = 0;
                }, 2000);
            }
            return body || {};
        });
    };
    $$HttpInterceptor.prototype.intercept = function (observable) {
        var _this = this;
        return observable.catch(function (err, source) {
            var status = _this.G.httpStatus = err.status;
            var title;
            var error;
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
                        { message: '当前页面或资源不存在' }
                    ]
                };
            }
            else if (status === 502) {
                error = {
                    data: [
                        { message: '网络连接错误' },
                        { message: '或服务器连接中断' }
                    ]
                };
            }
            else {
                error = err.json();
            }
            _this.G.httpError = {
                status: status,
                title: title,
                error: error
            };
            _this.__timer__ && clearTimeout(_this.__timer__);
            _this.__timer__ = setTimeout(function () {
                _this.G.httpStatus = 0;
            }, 2000);
            if (err.status === 401) {
                return rxjs_1.Observable.empty();
            }
            else {
                return rxjs_1.Observable.throw(err);
            }
        });
    };
    $$HttpInterceptor.prototype.get = function (url, options) {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        return this.intercept(this.map(_super.prototype.get.call(this, url, options), 'get'));
    };
    $$HttpInterceptor.prototype.post = function (url, body, options) {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        options.headers.append('Content-Type', 'application/json');
        return this.intercept(this.map(_super.prototype.post.call(this, url, body, options), 'post'));
    };
    $$HttpInterceptor.prototype.patch = function (url, data, options) {
        options = options || {};
        options.headers = this.addHeaderWithToken(options.headers);
        options.headers.append('Content-Type', 'application/json');
        return this.intercept(this.map(_super.prototype.patch.call(this, url, data, options), 'patch'));
    };
    $$HttpInterceptor = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.ConnectionBackend, http_1.RequestOptions, router_1.Router, global_1.GLOBAL])
    ], $$HttpInterceptor);
    return $$HttpInterceptor;
}(http_1.Http));
exports.$$HttpInterceptor = $$HttpInterceptor;
//# sourceMappingURL=http-interceptor.js.map
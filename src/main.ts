import {enableProdMode, provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import {App} from './views/app';
import {GLOBAL} from './views/common/global';

import {
HTTP_PROVIDERS, ConnectionBackend, XHRBackend, BaseRequestOptions, BaseResponseOptions,
Http, RequestOptions, ResponseOptions
} from '@angular/http';

import {Router} from '@angular/router';

import {ROUTER_PROVIDERS} from './views/common/routes';
import {HttpInterceptor} from './views/common/http-interceptor';

import './views/common/styles.scss';
import {Resource} from './views/common/resource';
import {ResourcePool} from './views/common/resource-pool';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';



if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

bootstrap(App, [

    // 全局变量
    GLOBAL,

    ROUTER_PROVIDERS,

    // 使用 # hash
    provide(LocationStrategy, {useClass: HashLocationStrategy}),

    disableDeprecatedForms(),

    provideForms(),

    HTTP_PROVIDERS,

    ConnectionBackend,

    XHRBackend,

    provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router, G: GLOBAL) => {
            return new HttpInterceptor(xhrBackend, requestOptions, router, G);
        },
        deps: [
            XHRBackend,
            RequestOptions,
            Router,
            GLOBAL
        ]
    }),

    HttpInterceptor,

    Resource,
    ResourcePool,

    provide(RequestOptions, {useClass: BaseRequestOptions}),
    provide(ResponseOptions, {useClass: BaseResponseOptions})

]).catch((error: Error) => console.error(error));

"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var forms_1 = require('@angular/forms');
var app_1 = require('./views/app');
var global_1 = require('./views/common/global');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var routes_1 = require('./views/common/routes');
var http_interceptor_1 = require('./views/common/http-interceptor');
require('./views/common/styles.scss');
var resource_1 = require('./views/common/resource');
var resource_pool_1 = require('./views/common/resource-pool');
var common_1 = require('@angular/common');
if (process.env.NODE_ENV === 'production') {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(app_1.App, [
    global_1.GLOBAL,
    routes_1.ROUTER_PROVIDERS,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    http_1.HTTP_PROVIDERS,
    http_1.ConnectionBackend,
    http_1.XHRBackend,
    core_1.provide(http_1.Http, {
        useFactory: function (xhrBackend, requestOptions, router, G) {
            return new http_interceptor_1.HttpInterceptor(xhrBackend, requestOptions, router, G);
        },
        deps: [
            http_1.XHRBackend,
            http_1.RequestOptions,
            router_1.Router,
            global_1.GLOBAL
        ]
    }),
    http_interceptor_1.HttpInterceptor,
    resource_1.Resource,
    resource_pool_1.ResourcePool,
    core_1.provide(http_1.RequestOptions, { useClass: http_1.BaseRequestOptions }),
    core_1.provide(http_1.ResponseOptions, { useClass: http_1.BaseResponseOptions })
]).catch(function (error) { return console.error(error); });
//# sourceMappingURL=main.js.map
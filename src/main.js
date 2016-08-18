"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var routes_1 = require('./views/common/routes');
var http_client_1 = require('./views/common/http-client');
var app_1 = require('./views/app');
require('./views/common/styles.scss');
var global_1 = require('./views/common/global');
if (process.env.NODE_ENV === 'production') {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(app_1.App, [
    core_1.provide(Window, { useValue: window }),
    global_1.GLOBAL,
    http_1.HTTP_PROVIDERS,
    routes_1.ROUTER_PROVIDERS,
    http_client_1.HttpClient,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms()
]).catch(function (error) { return console.error(error); });
//# sourceMappingURL=main.js.map
"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var router_2 = require('./fe/router');
var router_3 = require('./agent/router');
var router_4 = require('./tenant/router');
var auth_guide_1 = require('./auth-guide');
exports.routes = router_2.feRouter.concat(router_3.agentRouter, router_4.tenantRouter);
exports.ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes),
    auth_guide_1.AuthGuide,
    {
        provide: core_1.PLATFORM_DIRECTIVES,
        useValue: router_1.ROUTER_DIRECTIVES,
        multi: true
    }
];
//# sourceMappingURL=routes.js.map
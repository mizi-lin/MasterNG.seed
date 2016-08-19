"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var auth_guide_1 = require('./auth-guide');
var router_2 = require('../fe/router');
var router_3 = require('../agent/router');
var tenant_route_1 = require('../tenant/tenant.route');
var admin_route_1 = require('../admin/admin-route');
exports.routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
].concat(router_2.feRouter, router_3.agentRouter, tenant_route_1.tenantRouter, admin_route_1.adminRouter);
exports.ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes),
    auth_guide_1.AuthGuide,
    {
        provide: core_1.PLATFORM_DIRECTIVES, useValue: router_1.ROUTER_DIRECTIVES, multi: true
    }
];
//# sourceMappingURL=routes.js.map
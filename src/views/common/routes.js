"use strict";
var router_1 = require('../fe/router');
var tenant_route_1 = require('../tenant/tenant.route');
var router_2 = require('../agent/router');
var admin_route_1 = require('../admin/admin-route');
exports.$$ROUTES = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
].concat(router_1.$$ROUTES_FE, tenant_route_1.$$ROUTES_TENANT, router_2.$$ROUTE_AGENT, admin_route_1.$$ROUTES_ADMIN);
//# sourceMappingURL=routes.js.map
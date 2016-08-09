"use strict";
var _1 = require('./');
exports.tenantRouter = [
    { path: 'tenants', component: _1.TenantLayoutCpt, children: [
            { path: '', component: _1.TenantsCpt }
        ] }
];
//# sourceMappingURL=router.js.map
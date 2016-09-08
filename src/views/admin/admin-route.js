"use strict";
var _1 = require('./');
var auth_guide_1 = require('../common/auth-guide');
var admin_modifypwd_cpt_1 = require('./admin-modifypwd.cpt');
exports.$$ROUTES_ADMIN_DETAIL = [{
        path: ':adminId', component: _1.AdminDetailCpt, canActivate: [auth_guide_1.AuthGuide], children: [
            { path: '', component: _1.AdminUpdateCpt, canActivate: [auth_guide_1.AuthGuide] },
            { path: 'current', component: _1.AdminUpdateCpt, canActivate: [auth_guide_1.AuthGuide] },
            { path: 'modifypwd', component: admin_modifypwd_cpt_1.AdminModifyPwdCpt, canActivate: [auth_guide_1.AuthGuide] }
        ]
    }
];
exports.$$ROUTES_ADMIN = [{
        path: 'admins', component: _1.AdminLayoutCpt, canActivate: [auth_guide_1.AuthGuide], children: [
            { path: '', component: _1.AdminsCpt, canActivate: [auth_guide_1.AuthGuide] },
            { path: 'create', component: _1.AdminCreateCpt, canActivate: [auth_guide_1.AuthGuide] }
        ].concat(exports.$$ROUTES_ADMIN_DETAIL)
    }
];
//# sourceMappingURL=admin-route.js.map
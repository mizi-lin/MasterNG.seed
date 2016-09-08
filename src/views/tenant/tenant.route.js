"use strict";
var _1 = require('./');
var tenant_form_cpt_1 = require('./tenant-form.cpt');
var tenant_detail_cpt_1 = require('./tenant-detail.cpt');
var tenant_users_cpt_1 = require('./user/tenant-users.cpt');
var tenant_activities_cpt_1 = require('./tenant-activities.cpt');
var user_create_cpt_1 = require('./user/user-create.cpt');
var auth_guide_1 = require('../common/auth-guide');
exports.$$ROUTES_TENANT_DETAIL = [
    {
        path: ':tenantId',
        component: tenant_detail_cpt_1.TenantDetailCpt,
        children: [
            {
                path: '',
                component: tenant_form_cpt_1.TenantUpdateCpt
            },
            {
                path: 'users',
                component: tenant_users_cpt_1.TenantUsersCpt
            },
            {
                path: 'users/create',
                component: user_create_cpt_1.TenantUserCreateCpt
            },
            {
                path: 'activities',
                component: tenant_activities_cpt_1.TenantActivitiesCpt
            }
        ]
    }
];
exports.$$ROUTES_TENANT = [
    {
        path: 'tenants',
        component: _1.TenantLayoutCpt,
        canActivate: [auth_guide_1.AuthGuide],
        children: [
            {
                path: '',
                component: _1.TenantsCpt,
                canActivate: [auth_guide_1.AuthGuide]
            },
            {
                path: 'create',
                component: _1.TenantCreateCpt,
                canActivate: [auth_guide_1.AuthGuide]
            }
        ].concat(exports.$$ROUTES_TENANT_DETAIL)
    }
];
//# sourceMappingURL=tenant.route.js.map
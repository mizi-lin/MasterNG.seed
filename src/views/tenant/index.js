"use strict";
var tenant_layout_1 = require('./tenant.layout');
var tenants_1 = require('./tenants');
var tenant_create_cpt_1 = require('./tenant-create.cpt');
var tenant_form_cpt_1 = require('./tenant-form.cpt');
var tenant_detail_cpt_1 = require('./tenant-detail.cpt');
var tenant_users_cpt_1 = require('./user/tenant-users.cpt');
var user_create_cpt_1 = require('./user/user-create.cpt');
var tenant_activities_cpt_1 = require('./tenant-activities.cpt');
var tenant_layout_2 = require('./tenant.layout');
exports.TenantLayoutCpt = tenant_layout_2.TenantLayoutCpt;
var tenants_2 = require('./tenants');
exports.TenantsCpt = tenants_2.TenantsCpt;
var tenant_create_cpt_2 = require('./tenant-create.cpt');
exports.TenantCreateCpt = tenant_create_cpt_2.TenantCreateCpt;
var tenant_form_cpt_2 = require('./tenant-form.cpt');
exports.TenantUpdateCpt = tenant_form_cpt_2.TenantUpdateCpt;
var tenant_detail_cpt_2 = require('./tenant-detail.cpt');
exports.TenantDetailCpt = tenant_detail_cpt_2.TenantDetailCpt;
var tenant_users_cpt_2 = require('./user/tenant-users.cpt');
exports.TenantUsersCpt = tenant_users_cpt_2.TenantUsersCpt;
var user_create_cpt_2 = require('./user/user-create.cpt');
exports.TenantUserCreateCpt = user_create_cpt_2.TenantUserCreateCpt;
var tenant_activities_cpt_2 = require('./tenant-activities.cpt');
exports.TenantActivitiesCpt = tenant_activities_cpt_2.TenantActivitiesCpt;
exports.$$CPT_TENANT = [
    tenant_layout_1.TenantLayoutCpt,
    tenants_1.TenantsCpt,
    tenant_create_cpt_1.TenantCreateCpt,
    tenant_form_cpt_1.TenantUpdateCpt,
    tenant_detail_cpt_1.TenantDetailCpt,
    tenant_users_cpt_1.TenantUsersCpt,
    user_create_cpt_1.TenantUserCreateCpt,
    tenant_activities_cpt_1.TenantActivitiesCpt
];
//# sourceMappingURL=index.js.map
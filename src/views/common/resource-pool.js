"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var resource_1 = require('./resource');
var core_1 = require('@angular/core');
var $$ResourcePool = (function () {
    function $$ResourcePool(R) {
        this.R = R;
        this.agencies = this.R.$$('/services/boss/agency/{agencyId}');
        this.agencies_activeness = this.R.$$('/services/boss/agency/{agencyId}/activeness');
        this.agencies_members = this.R.$$('/services/boss/agency/{agencyId}/admin');
        this.tenants = this.R.$$('/services/boss/tenant/{tenantId}');
        this.tenants_users = this.R.$$('/services/boss/tenant/{tenantId}/user/{userId}');
        this.tenants_users_activeness = this.R.$$('/services/boss/tenant/{tenantId}/user/{userId}/activeness');
        this.tenants_activities = this.R.$$('/services/boss/tenant/{tenantId}/activity/{activityId}');
        this.tenants_activeness = this.R.$$('/services/boss/tenant/{tenantId}/activeness');
        this.users_activeness = this.R.$$('/services/boss/user/{userId}/activeness');
        this.admins = this.R.$$('/services/boss/admin/{adminId}');
        this.admins_activeness = this.R.$$('/services/boss/admin/{adminId}/activeness');
        this.current = this.R.$$('/services/boss/admin/current');
        this.login = this.R.$$('/services/admin/login');
    }
    $$ResourcePool = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [resource_1.$$Resource])
    ], $$ResourcePool);
    return $$ResourcePool;
}());
exports.$$ResourcePool = $$ResourcePool;
//# sourceMappingURL=resource-pool.js.map
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
var core_1 = require('@angular/core');
var http_client_1 = require('../common/http-client');
var const_1 = require('../common/const');
var global_1 = require('../common/global');
var TenantServ = (function () {
    function TenantServ(httpClient, G) {
        this.httpClient = httpClient;
        this.G = G;
    }
    TenantServ.prototype.getTenant = function (tenantId) {
        var search = {};
        var url = const_1.API.TENANTS;
        if (tenantId) {
            search.tenantId = tenantId;
        }
        return this.httpClient.get(url, search);
    };
    TenantServ.prototype.saveTenant = function (tenant) {
        var method = tenant.tenantId ? 'patch' : 'post';
        return this.httpClient[method](const_1.API.TENANTS, tenant);
    };
    TenantServ.prototype.getTenantUsers = function (search) {
        return this.httpClient.get(const_1.API.TENANTS_USER, search);
    };
    TenantServ.prototype.saveTenantUser = function (user) {
        var method = user.userId ? 'patch' : 'post';
        return this.httpClient[method](const_1.API.TENANTS_USER, user);
    };
    TenantServ.prototype.getTenantUserSimulator = function (search) {
        return this.httpClient.get(const_1.API.TENANTS_USER_SIMULATOR, search);
    };
    TenantServ.prototype.getTenantActivities = function (search) {
        return this.httpClient.get(const_1.API.TENANTS_ACTIVITY, search);
    };
    TenantServ.prototype.saveTenantActivity = function (activity) {
        var method = activity.activityId ? 'patch' : 'post';
        return this.httpClient[method](const_1.API.TENANTS_ACTIVITY, activity);
    };
    TenantServ = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_client_1.HttpClient, global_1.GLOBAL])
    ], TenantServ);
    return TenantServ;
}());
exports.TenantServ = TenantServ;
//# sourceMappingURL=tenant.serv.js.map
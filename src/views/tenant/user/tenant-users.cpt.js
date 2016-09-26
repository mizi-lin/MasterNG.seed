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
var router_1 = require('@angular/router');
var tenant_serv_1 = require('../tenant.serv');
var const_1 = require('../../common/const');
var global_1 = require('../../common/global');
var resource_pool_1 = require('../../common/resource-pool');
var TenantUsersCpt = (function () {
    function TenantUsersCpt(tenantServ, G, $$, route, router) {
        this.tenantServ = tenantServ;
        this.G = G;
        this.$$ = $$;
        this.route = route;
        this.router = router;
    }
    TenantUsersCpt.prototype.changeUserRoot = function (user, root) {
        user.root = +root;
        user.tenantId = this.tenantId;
        user.__primary__ = 'userId';
        this.$$.tenants_users.save(user).subscribe();
    };
    TenantUsersCpt.prototype.activeness = function (user) {
        this.$$.tenants_users_activeness.patch({
            userId: user.userId,
            tenantId: this.tenantId
        }, {
            status: user.status ? 0 : 1
        }).subscribe(function (rst) {
            user = mu.extend(user, rst.data);
        });
    };
    TenantUsersCpt.prototype.ngOnInit = function () {
        var _this = this;
        this.roots = mu.map(const_1.DICT.ROOT, function (v, k) {
            return {
                val: +k,
                title: v
            };
        }, []);
        var routeParams = this.G.stateParams(this.route, null);
        ;
        this.tenantId = +routeParams.tenantId;
        this.sub = this.$$.tenants_users.get({
            tenantId: this.tenantId
        }).subscribe(function (res) {
            _this.users = res.data;
        });
    };
    TenantUsersCpt.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TenantUsersCpt = __decorate([
        core_1.Component({
            selector: 'inmain.tenant-users',
            templateUrl: 'views/tenant/user/tenant-users.html'
        }), 
        __metadata('design:paramtypes', [tenant_serv_1.TenantServ, global_1.GLOBAL, resource_pool_1.$$ResourcePool, router_1.ActivatedRoute, router_1.Router])
    ], TenantUsersCpt);
    return TenantUsersCpt;
}());
exports.TenantUsersCpt = TenantUsersCpt;
//# sourceMappingURL=tenant-users.cpt.js.map
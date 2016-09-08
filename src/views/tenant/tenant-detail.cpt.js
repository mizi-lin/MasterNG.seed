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
var tenant_serv_1 = require('./tenant.serv');
var router_1 = require('@angular/router');
var global_1 = require('../common/global');
var resource_pool_1 = require('../common/resource-pool');
var TenantDetailCpt = (function () {
    function TenantDetailCpt(tenantServ, G, $$, route) {
        this.tenantServ = tenantServ;
        this.G = G;
        this.$$ = $$;
        this.route = route;
    }
    TenantDetailCpt.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var tenantId = +params['tenantId'];
            _this.$$.tenants.get({
                tenantId: tenantId
            }).subscribe(function (res) {
                _this.tenant = res.data;
            });
        });
    };
    TenantDetailCpt.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TenantDetailCpt = __decorate([
        core_1.Component({
            selector: 'page.detail',
            templateUrl: 'views/tenant/tenant-detail.html',
            providers: [tenant_serv_1.TenantServ]
        }), 
        __metadata('design:paramtypes', [tenant_serv_1.TenantServ, global_1.GLOBAL, resource_pool_1.$$ResourcePool, router_1.ActivatedRoute])
    ], TenantDetailCpt);
    return TenantDetailCpt;
}());
exports.TenantDetailCpt = TenantDetailCpt;
//# sourceMappingURL=tenant-detail.cpt.js.map
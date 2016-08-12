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
var tenant_model_1 = require('./tenant.model');
var tenant_serv_1 = require('./tenant.serv');
var router_1 = require('@angular/router');
var TenantUpdateCpt = (function () {
    function TenantUpdateCpt(ts, route, router) {
        this.ts = ts;
        this.route = route;
        this.router = router;
        this.fm = new tenant_model_1.Tenant();
    }
    TenantUpdateCpt.prototype.save = function (myform) {
        this.ts.saveTenant(this.fm).subscribe(function (res) {
        });
    };
    TenantUpdateCpt.prototype.ngOnInit = function () {
        var _this = this;
        var tenantId = +this.router.routerState.parent(this.route).snapshot.params['tenantId'];
        if (tenantId) {
            this.sub = this.ts.getTenant(tenantId).subscribe(function (res) {
                _this.fm = res.data;
            });
        }
    };
    TenantUpdateCpt.prototype.ngOnDestroy = function () {
        this.sub && this.sub.unsubscribe();
    };
    TenantUpdateCpt = __decorate([
        core_1.Component({
            selector: 'tenant-form',
            templateUrl: 'views/tenant/tenant-form.html'
        }), 
        __metadata('design:paramtypes', [tenant_serv_1.TenantServ, router_1.ActivatedRoute, router_1.Router])
    ], TenantUpdateCpt);
    return TenantUpdateCpt;
}());
exports.TenantUpdateCpt = TenantUpdateCpt;
//# sourceMappingURL=tenant-form.cpt.js.map
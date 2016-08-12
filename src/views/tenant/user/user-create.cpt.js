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
var const_1 = require('../../common/const');
var tenant_serv_1 = require('../tenant.serv');
var router_1 = require('@angular/router');
var TenantUserCreateCpt = (function () {
    function TenantUserCreateCpt(ts, route, router) {
        this.ts = ts;
        this.route = route;
        this.router = router;
        this.fm = {};
    }
    TenantUserCreateCpt.prototype.ngOnInit = function () {
        this.roots = mu.map(const_1.DICT.ROOT, function (v, k) {
            return {
                val: +k,
                title: v
            };
        }, []);
        this.tenantId = +this.router.routerState.parent(this.route).snapshot.params['tenantId'];
    };
    TenantUserCreateCpt.prototype.save = function () {
        this.fm.tenantId = this.tenantId;
        this.ts.saveTenantUser(this.fm).subscribe();
    };
    TenantUserCreateCpt = __decorate([
        core_1.Component({
            selector: 'page.tenant-create',
            templateUrl: 'views/tenant/user/user-form.html'
        }), 
        __metadata('design:paramtypes', [tenant_serv_1.TenantServ, router_1.ActivatedRoute, router_1.Router])
    ], TenantUserCreateCpt);
    return TenantUserCreateCpt;
}());
exports.TenantUserCreateCpt = TenantUserCreateCpt;
//# sourceMappingURL=user-create.cpt.js.map
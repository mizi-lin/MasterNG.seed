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
var admin_serv_1 = require('./admin.serv');
var router_1 = require('@angular/router');
var AdminDetailCpt = (function () {
    function AdminDetailCpt(adminServ, route) {
        this.adminServ = adminServ;
        this.route = route;
    }
    AdminDetailCpt.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var adminId = +params['adminId'];
            _this.adminServ.getAdmin(adminId).subscribe(function (res) {
                _this.admin = res.data;
            });
        });
    };
    AdminDetailCpt.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    AdminDetailCpt = __decorate([
        core_1.Component({
            selector: 'page.detail',
            templateUrl: 'views/admin/admin-detail.html',
            providers: [admin_serv_1.AdminServ]
        }), 
        __metadata('design:paramtypes', [admin_serv_1.AdminServ, router_1.ActivatedRoute])
    ], AdminDetailCpt);
    return AdminDetailCpt;
}());
exports.AdminDetailCpt = AdminDetailCpt;
//# sourceMappingURL=admin-detail.cpt.js.map
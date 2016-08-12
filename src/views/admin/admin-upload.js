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
var admin_model_1 = require('./admin.model');
var admin_serv_1 = require('./admin.serv');
var router_1 = require('@angular/router');
var AdminUpdateCpt = (function () {
    function AdminUpdateCpt(adminServ, route, router) {
        this.adminServ = adminServ;
        this.route = route;
        this.router = router;
        this.fm = new admin_model_1.Admin();
    }
    AdminUpdateCpt.prototype.save = function (myform) {
        var _this = this;
        this.adminServ.saveAdmin(this.fm).subscribe(function (res) {
            _this.fm = res.data;
        });
    };
    AdminUpdateCpt.prototype.ngOnInit = function () {
        var _this = this;
        var adminId = +this.router.routerState.parent(this.route).snapshot.params['adminId'];
        if (adminId) {
            this.sub = this.adminServ.getAdmin(adminId).subscribe(function (res) {
                _this.fm = res.data;
                _this.admin = res.data;
            });
        }
    };
    AdminUpdateCpt.prototype.ngOnDestroy = function () {
        this.sub && this.sub.unsubscribe();
    };
    AdminUpdateCpt = __decorate([
        core_1.Component({
            selector: 'admin-form',
            templateUrl: 'views/admin/admin.form.html'
        }), 
        __metadata('design:paramtypes', [admin_serv_1.AdminServ, router_1.ActivatedRoute, router_1.Router])
    ], AdminUpdateCpt);
    return AdminUpdateCpt;
}());
exports.AdminUpdateCpt = AdminUpdateCpt;
//# sourceMappingURL=admin-upload.js.map
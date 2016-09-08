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
var login_serv_1 = require('./login.serv');
var router_1 = require('@angular/router');
var global_1 = require('../common/global');
var resource_pool_1 = require('../common/resource-pool');
var const_1 = require('../common/const');
var LoginCpt = (function () {
    function LoginCpt($$, G, router) {
        this.$$ = $$;
        this.G = G;
        this.router = router;
        this.fm = {};
        this.fm = this.G.ENV_CONST.TEST_ACCOUNT || {};
    }
    LoginCpt.prototype.save = function (form) {
        var _this = this;
        this.G.save(form, this, function (form) {
            mu.storage(const_1.CONST.HEADER_TOKEN, '');
            _this.$$.login.post(_this.fm).subscribe(function (res) {
                var data = res.data;
                mu.storage(const_1.CONST.HEADER_TOKEN, data.token);
                mu.storage('CURRENT', data);
                _this.G.setCurrent(data);
                _this.router.navigate([const_1.CONST.BE_INDEX_PAGE]);
            });
        });
    };
    LoginCpt = __decorate([
        core_1.Component({
            selector: 'fe.login',
            templateUrl: 'views/fe/login.html',
            providers: [login_serv_1.LoginServ]
        }), 
        __metadata('design:paramtypes', [resource_pool_1.$$ResourcePool, global_1.GLOBAL, router_1.Router])
    ], LoginCpt);
    return LoginCpt;
}());
exports.LoginCpt = LoginCpt;
//# sourceMappingURL=login.cpt.js.map
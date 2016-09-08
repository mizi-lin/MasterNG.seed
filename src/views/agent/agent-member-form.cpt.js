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
var admin_model_1 = require('../admin/admin.model');
var global_1 = require('../common/global');
var admin_serv_1 = require('../admin/admin.serv');
var resource_pool_1 = require('../common/resource-pool');
var const_1 = require('../common/const');
var AgentMemberFormCpt = (function () {
    function AgentMemberFormCpt(adminServ, G, $$, route, router) {
        this.adminServ = adminServ;
        this.G = G;
        this.$$ = $$;
        this.route = route;
        this.router = router;
        this.fm = new admin_model_1.Admin();
        this.CONST = const_1.CONST;
    }
    AgentMemberFormCpt.prototype.save = function (form) {
        var _this = this;
        this.G.save(form, this, function (form) {
            _this.fm.__primary__ = 'adminId';
            _this.$$.admins.save(_this.fm).subscribe(function () {
                _this.router.navigate([
                    'agents',
                    _this.fm.agencyId,
                    'members'
                ]);
            });
        });
    };
    AgentMemberFormCpt.prototype.ngOnInit = function () {
        var _this = this;
        this.fm.agencyId = +this.G.stateParams(this.route)['agencyId'];
        this.adminId = +this.route.snapshot.params['adminId'];
        if (this.adminId) {
            this.$$.admins.get({
                adminId: this.adminId
            }).subscribe(function (res) {
                _this.fm = res.data;
            });
        }
    };
    AgentMemberFormCpt = __decorate([
        core_1.Component({
            selector: 'agent-member-form',
            templateUrl: 'views/agent/agent-member-form.html',
            providers: [admin_serv_1.AdminServ]
        }), 
        __metadata('design:paramtypes', [admin_serv_1.AdminServ, global_1.GLOBAL, resource_pool_1.$$ResourcePool, router_1.ActivatedRoute, router_1.Router])
    ], AgentMemberFormCpt);
    return AgentMemberFormCpt;
}());
exports.AgentMemberFormCpt = AgentMemberFormCpt;
//# sourceMappingURL=agent-member-form.cpt.js.map
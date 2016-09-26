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
var agent_serv_1 = require('./agent.serv');
var global_1 = require('../common/global');
var resource_pool_1 = require('../common/resource-pool');
var AgentMembersCpt = (function () {
    function AgentMembersCpt(agentServ, G, $$, route, router) {
        this.agentServ = agentServ;
        this.G = G;
        this.$$ = $$;
        this.route = route;
        this.router = router;
    }
    AgentMembersCpt.prototype.ngOnInit = function () {
        var _this = this;
        this.agencyId = +this.G.stateParams(this.route)['agencyId'];
        this.sub = this.$$.agencies_members.get({
            agencyId: this.agencyId
        }).subscribe(function (res) {
            _this.members = res.data;
        });
    };
    AgentMembersCpt.prototype.activeness = function (member) {
        member.status = member.status ? 0 : 1;
        this.$$.admins_activeness.patch({
            adminId: member.adminId
        }, {
            status: member.status
        }).subscribe(function (rst) {
            member = mu.extend(member, rst.data);
        });
    };
    AgentMembersCpt.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    AgentMembersCpt = __decorate([
        core_1.Component({
            selector: 'inmain.agent-member',
            templateUrl: 'views/agent/agent-members.html'
        }), 
        __metadata('design:paramtypes', [agent_serv_1.AgentServ, global_1.GLOBAL, resource_pool_1.$$ResourcePool, router_1.ActivatedRoute, router_1.Router])
    ], AgentMembersCpt);
    return AgentMembersCpt;
}());
exports.AgentMembersCpt = AgentMembersCpt;
//# sourceMappingURL=agent-members.cpt.js.map
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
var AgentDetailCpt = (function () {
    function AgentDetailCpt(G, agentServ, $$, route) {
        this.G = G;
        this.agentServ = agentServ;
        this.$$ = $$;
        this.route = route;
    }
    AgentDetailCpt.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var agencyId = +params['agencyId'];
            _this.$$.agencies.get({
                agencyId: agencyId
            }).subscribe(function (res) {
                _this.agent = res.data;
            });
        });
    };
    AgentDetailCpt.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    AgentDetailCpt = __decorate([
        core_1.Component({
            selector: 'page.agent-detail', templateUrl: 'views/agent/agent-detail.html', providers: [agent_serv_1.AgentServ]
        }), 
        __metadata('design:paramtypes', [global_1.GLOBAL, agent_serv_1.AgentServ, resource_pool_1.$$ResourcePool, router_1.ActivatedRoute])
    ], AgentDetailCpt);
    return AgentDetailCpt;
}());
exports.AgentDetailCpt = AgentDetailCpt;
//# sourceMappingURL=agent-detail.cpt.js.map
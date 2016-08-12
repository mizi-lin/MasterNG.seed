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
var agent_1 = require('./agent');
var agent_serv_1 = require('./agent.serv');
var router_1 = require('@angular/router');
var AgentFormCpt = (function () {
    function AgentFormCpt(agentServ, route, router) {
        this.agentServ = agentServ;
        this.route = route;
        this.router = router;
        this.agent = new agent_1.Agent;
        this.fm = new agent_1.Agent;
    }
    AgentFormCpt.prototype.save = function (myForm) {
        this.sub = this.agentServ.saveAgent(this.fm).subscribe(function (res) {
        });
    };
    AgentFormCpt.prototype.ngOnInit = function () {
        var _this = this;
        var agencyId = +this.router.routerState.parent(this.route).snapshot.params['agencyId'];
        if (agencyId) {
            this.sub = this.agentServ.getAgent(agencyId).subscribe(function (res) {
                _this.agent = res.data;
                _this.fm = mu.clone(res.data);
            });
        }
    };
    AgentFormCpt.prototype.ngOnDestroy = function () {
        this.sub && this.sub.unsubscribe();
    };
    AgentFormCpt = __decorate([
        core_1.Component({
            selector: 'agent-form',
            templateUrl: 'views/agent/agent-form.html'
        }), 
        __metadata('design:paramtypes', [agent_serv_1.AgentServ, router_1.ActivatedRoute, router_1.Router])
    ], AgentFormCpt);
    return AgentFormCpt;
}());
exports.AgentFormCpt = AgentFormCpt;
//# sourceMappingURL=agent-form.cpt.js.map
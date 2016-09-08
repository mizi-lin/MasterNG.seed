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
var agent_serv_1 = require('./agent.serv');
var router_1 = require('@angular/router');
var global_1 = require('../common/global');
var resource_pool_1 = require('../common/resource-pool');
var AgentCreateCpt = (function () {
    function AgentCreateCpt(G, $$, router) {
        this.G = G;
        this.$$ = $$;
        this.router = router;
    }
    AgentCreateCpt = __decorate([
        core_1.Component({
            selector: 'page.agent-create.dlg.small',
            templateUrl: 'views/agent/agent-create.html',
            providers: [agent_serv_1.AgentServ]
        }), 
        __metadata('design:paramtypes', [global_1.GLOBAL, resource_pool_1.$$ResourcePool, router_1.Router])
    ], AgentCreateCpt);
    return AgentCreateCpt;
}());
exports.AgentCreateCpt = AgentCreateCpt;
//# sourceMappingURL=agent-create.cpt.js.map
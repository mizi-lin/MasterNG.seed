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
var http_client_1 = require('../http-client');
var const_1 = require('../const');
var AgentServ = (function () {
    function AgentServ(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
    }
    AgentServ.prototype.getAgents = function () {
        return this.httpClient.get(const_1.API.AGENCY);
    };
    AgentServ.prototype.getAgent = function (agencyId) {
        return this.httpClient.get(const_1.API.AGENCY, {
            agencyId: agencyId
        });
    };
    AgentServ.prototype.saveAgent = function (agent) {
        return this.httpClient[agent.agencyId ? 'patch' : 'post'](const_1.API.AGENCY, agent);
    };
    AgentServ.prototype.getAgentMember = function (agencyId) {
        return this.httpClient.get(const_1.API.AGENCY_ADMIN, {
            agencyId: agencyId
        });
    };
    AgentServ.prototype.saveAdmin = function (admin) {
        return this.httpClient.post(const_1.API.ADMIN, admin);
    };
    AgentServ = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_client_1.HttpClient, router_1.Router])
    ], AgentServ);
    return AgentServ;
}());
exports.AgentServ = AgentServ;
//# sourceMappingURL=agent.serv.js.map
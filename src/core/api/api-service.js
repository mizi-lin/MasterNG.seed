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
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var projects = [
    { id: 101, name: 'Project 1' },
    { id: 102, name: 'Project 2' },
    { id: 103, name: 'Project 3' }
];
var ApiService = (function () {
    function ApiService() {
    }
    ApiService.prototype.fetchProjects = function () {
        return Observable_1.Observable.of(projects)
            .delay(1000);
    };
    ApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
//# sourceMappingURL=api-service.js.map
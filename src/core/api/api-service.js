"use strict";
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
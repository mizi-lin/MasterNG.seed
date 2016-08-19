"use strict";
require('rxjs/add/observable/of');
require('rxjs/add/operator/delay');
var core_1 = require('@angular/core');
var api_1 = require('src/core/api');
var ProjectService = (function () {
    function ProjectService(api) {
        this.projects = api.fetchProjects();
    }
    ProjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof api_1.ApiService !== 'undefined' && api_1.ApiService) === 'function' && _a) || Object])
    ], ProjectService);
    return ProjectService;
    var _a;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=project-service.js.map
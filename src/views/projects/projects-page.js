"use strict";
var core_1 = require('@angular/core');
var projects_1 = require('src/core/projects');
var project_list_1 = require('./project-list/project-list');
var ProjectsPage = (function () {
    function ProjectsPage(projectService) {
        this.projectService = projectService;
    }
    ProjectsPage = __decorate([
        core_1.Component({
            directives: [
                project_list_1.ProjectListComponent
            ],
            selector: 'projects',
            template: "\n    <project-list [projects]=\"projectService.projects\"></project-list>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof projects_1.ProjectService !== 'undefined' && projects_1.ProjectService) === 'function' && _a) || Object])
    ], ProjectsPage);
    return ProjectsPage;
    var _a;
}());
exports.ProjectsPage = ProjectsPage;
//# sourceMappingURL=projects-page.js.map
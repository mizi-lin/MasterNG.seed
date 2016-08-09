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
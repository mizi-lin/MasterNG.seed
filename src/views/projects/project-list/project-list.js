"use strict";
var core_1 = require('@angular/core');
var ProjectListComponent = (function () {
    function ProjectListComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ProjectListComponent.prototype, "projects", void 0);
    ProjectListComponent = __decorate([
        core_1.Component({
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            selector: 'project-list',
            styles: [
                require('./project-list.scss')
            ],
            template: require('./project-list.html')
        }), 
        __metadata('design:paramtypes', [])
    ], ProjectListComponent);
    return ProjectListComponent;
}());
exports.ProjectListComponent = ProjectListComponent;
//# sourceMappingURL=project-list.js.map
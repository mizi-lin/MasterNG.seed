"use strict";
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var api_1 = require('src/core/api');
var projects_1 = require('src/core/projects');
var projects_page_1 = require('./projects-page');
testing_1.describe('ProjectsPage', function () {
    var builder;
    testing_1.beforeEachProviders(function () { return [
        api_1.ApiService,
        projects_1.ProjectService
    ]; });
    testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    it('should display a list of projects', function (done) {
        builder.createAsync(projects_page_1.ProjectsPage)
            .then(function (fixture) {
            fixture.detectChanges();
            var compiled = fixture.nativeElement;
            fixture.componentInstance.projectService.projects.subscribe(function () {
                fixture.detectChanges();
                testing_1.expect(compiled.querySelectorAll('li').length).toBe(3);
                done();
            });
        });
    });
});
//# sourceMappingURL=projects-page.spec.js.map
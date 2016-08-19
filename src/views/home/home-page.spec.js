"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/compiler/testing');
var home_page_1 = require('./home-page');
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent = __decorate([
        core_1.Component({
            template: '',
            directives: [home_page_1.HomePage]
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
}());
testing_1.describe('HomePage', function () {
    var builder;
    testing_1.beforeEach(testing_1.inject([testing_2.TestComponentBuilder], function (tcb) {
        builder = tcb;
    }));
    testing_1.it('should display a greeting', testing_1.async(function () {
        builder.createAsync(home_page_1.HomePage)
            .then(function (fixture) {
            fixture.detectChanges();
            var compiled = fixture.nativeElement;
            testing_1.expect(compiled.querySelector('h3')).toHaveText('Hello Angular! :)');
        });
    }));
    testing_1.it('should display a greeting (overrideTemplate)', testing_1.async(function () {
        builder.overrideTemplate(TestComponent, '<home></home>')
            .createAsync(home_page_1.HomePage)
            .then(function (fixture) {
            fixture.detectChanges();
            var compiled = fixture.nativeElement;
            testing_1.expect(compiled.querySelector('h3')).toHaveText('Hello Angular! :)');
        });
    }));
});
//# sourceMappingURL=home-page.spec.js.map
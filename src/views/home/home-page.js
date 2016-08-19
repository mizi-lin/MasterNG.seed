"use strict";
var core_1 = require('@angular/core');
var HomePage = (function () {
    function HomePage() {
        this.greeting = 'Hello World! :)';
    }
    HomePage = __decorate([
        core_1.Component({
            selector: 'home',
            template: "\n    <h2>Home</h2>\n    <h3>{{greeting}}</h3>\n    <img src=\"/assets/images/image.png\" alt=\"Angular\">\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
//# sourceMappingURL=home-page.js.map
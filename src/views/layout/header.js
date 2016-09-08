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
var global_1 = require('../common/global');
var Header = (function () {
    function Header(router, G) {
        this.router = router;
        this.G = G;
    }
    Header.prototype.logout = function () {
        this.G.clearCurrent();
        this.router.navigate(['/login']);
    };
    Header = __decorate([
        core_1.Component({
            selector: 'header',
            templateUrl: 'views/layout/header.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, global_1.GLOBAL])
    ], Header);
    return Header;
}());
exports.Header = Header;
//# sourceMappingURL=header.js.map
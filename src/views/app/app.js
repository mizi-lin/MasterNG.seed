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
var global_1 = require('../common/global');
var AppCpt = (function () {
    function AppCpt(G) {
        this.G = G;
    }
    AppCpt = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'views/layout/layout.html',
            animations: [
                core_1.trigger('mnote', [
                    core_1.state('hide', core_1.style({
                        display: 'none'
                    })),
                    core_1.state('show', core_1.style({
                        display: 'none'
                    })),
                    core_1.transition('hide => show', [
                        core_1.animate('500ms 1500ms ease-in', core_1.style({
                            'background-color': 'rgba(18, 61, 64, .8)',
                            top: '-100px'
                        }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [global_1.GLOBAL])
    ], AppCpt);
    return AppCpt;
}());
exports.AppCpt = AppCpt;
//# sourceMappingURL=app.js.map
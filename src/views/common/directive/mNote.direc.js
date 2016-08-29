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
var global_1 = require('../global');
var MNote = (function () {
    function MNote(G) {
        this.G = G;
    }
    MNote.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    MNote = __decorate([
        core_1.Component({
            selector: 'mNote',
            template: "\n        <div class=\"content\" *ngIf=\"G?.httpStatus >= 400\">\n            <h5>{{G?.httpError?.title}}</h5>\n            <ol>\n                <li *ngFor=\"let err of G.httpError.error.data\">\n                    {{err.message}}\n                </li>\n            </ol>\n        </div>\n    \n        <div class=\"content\" *ngIf=\"G?.httpStatus < 300\">\n            \u64CD\u4F5C\u6210\u529F\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [global_1.GLOBAL])
    ], MNote);
    return MNote;
}());
exports.MNote = MNote;
//# sourceMappingURL=mNote.direc.js.map
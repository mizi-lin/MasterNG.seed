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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var forms_1 = require('@angular/forms');
var core_1 = require('@angular/core');
var MVFollow = (function () {
    function MVFollow(mVFollow) {
        this.mVFollow = mVFollow;
    }
    MVFollow.prototype.validate = function (c) {
        var v = c.value;
        var eq = c.root.get(this.mVFollow).value;
        if (mu.isExist(v)) {
            return eq ? null : {
                mVFollow: '当一个值有值时, 另外一个值也必须有值'
            };
        }
        return null;
    };
    MVFollow = __decorate([
        core_1.Directive({
            selector: '[mVFollow][ngModel]',
            providers: [
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return MVFollow; }),
                    multi: true
                }
            ]
        }),
        __param(0, core_1.Attribute('mVFollow')), 
        __metadata('design:paramtypes', [String])
    ], MVFollow);
    return MVFollow;
}());
exports.MVFollow = MVFollow;
//# sourceMappingURL=mVFollow-validation.direc.js.map
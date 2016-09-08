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
var MVEquals = (function () {
    function MVEquals(mVEquals, mReverse_) {
        this.mVEquals = mVEquals;
        this.mReverse_ = mReverse_;
    }
    Object.defineProperty(MVEquals.prototype, "isReverse", {
        get: function () {
            if (!this.mReverse_)
                return false;
            return this.mReverse_ === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    MVEquals.prototype.validate = function (c) {
        var v = c.value;
        var e = c.root.get(this.mVEquals);
        if (e && v !== e.value && !this.isReverse) {
            return {
                mVEquals: false
            };
        }
        if (e && v === e.value && this.isReverse) {
            delete e.errors['mVEquals'];
            if (!Object.keys(e.errors).length)
                e.setErrors(null);
        }
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({
                mVEquals: false
            });
        }
        return null;
    };
    MVEquals = __decorate([
        core_1.Directive({
            selector: '[mVEquals]',
            providers: [
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return MVEquals; }),
                    multi: true
                }
            ]
        }),
        __param(0, core_1.Attribute('mVEquals')),
        __param(1, core_1.Attribute('mReverse_')), 
        __metadata('design:paramtypes', [String, String])
    ], MVEquals);
    return MVEquals;
}());
exports.MVEquals = MVEquals;
//# sourceMappingURL=mVEquals-validation.direc.js.map
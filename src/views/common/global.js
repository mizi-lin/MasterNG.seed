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
var const_1 = require('./const');
var GLOBAL = (function () {
    function GLOBAL() {
        var _this = this;
        this.httpStatus = 0;
        mu.run(mu.storage('CURRENT'), function (admin) {
            _this.current = admin;
        });
    }
    GLOBAL.prototype.setCurrent = function (current) {
        this.isAdmin = !current.agencyId;
        this.current = current;
        mu.storage(const_1.CONST.CURRENT, current);
    };
    GLOBAL.prototype.clearCurrent = function () {
        this.isAdmin = null;
        this.current = null;
        mu.storage(const_1.CONST.HEADER_TOKEN, '');
        mu.storage(const_1.CONST.CURRENT, '');
    };
    GLOBAL.prototype.save = function (form, vm, fn) {
        if (form.valid) {
            fn.call(vm, form, fn);
            return true;
        }
        return false;
    };
    GLOBAL = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GLOBAL);
    return GLOBAL;
}());
exports.GLOBAL = GLOBAL;
//# sourceMappingURL=global.js.map
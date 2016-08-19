"use strict";
var BaseCpt = (function () {
    function BaseCpt(router) {
        this.router = router;
    }
    BaseCpt.prototype.goback = function () {
        this.router.navigate(['../']);
    };
    return BaseCpt;
}());
exports.BaseCpt = BaseCpt;
//# sourceMappingURL=base.cpt.js.map
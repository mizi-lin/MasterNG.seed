/**
 * 迭代器
 */

define(['./iterator'], function(mu) {

    /**
     * mu.copy(Any any)
     * 浅拷贝
     * @param any
     * @returns {{any}}
     */
    mu.copy = function(/**{any}*/ any) {

        if(typeof any !== 'object'){
            return any;
        }

        return _.isArray(any) ? any.slice() : _.extend({}, any);
    };

    /**
     * mu.clone(Any any)
     * 克隆, 深拷贝
     * @param any
     * @returns {{any}}
     */
    mu.clone = function(/**{any}*/ any) {
        return _.extend(true, {}, any);
    };

    return mu;
});




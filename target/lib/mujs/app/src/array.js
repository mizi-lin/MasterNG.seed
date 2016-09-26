/**
 * 数组
 */

define(function(mu) {

    var array__ = {};

    /**
     * array__.intercept(Array arr, Int n[, Int start, Function fn])
     * 截取数组的一段数据组成新的数组
     * @param arr
     * @param n
     * @param start
     * @param fn
     * @returns {*}
     */
    array__.intercept = function(/**{array}*/ arr, /**{int}*/ n, /**{int}*/ start, /**{function}*/ fn) {
        var rst;

        var args = _.args(true, arguments);

        if(args.__2__ && args.__2__.type !== 'number') {
            fn = start;
            start = 0;
        }

        start = start || 0;

        if(n) {
            rst = arr.slice(start, start + n);
        } else {
            rst = arr.shift();
        }

        return fn ? fn.call(null, rst, arr) : rst;
    };

    /**
     * mu.first(Array arr[, Int n, Function fn]
     * 获取数组前n个元素
     * @param arr
     * @param n 获取数组的个数
     * @param fn(first, l, arr)
     * @returns {*}
     *
     * exp.
     *
     * mu.first(['a', 'b', 'c', 'd'])
     * // -> 'a'
     *
     * mu.first(['a', 'b', 'c', 'd'], 1)
     * // -> ['a']
     *
     * mu.first(['a', 'b', 'c', 'd'], 2, function(arr){
     *     return mu.map(arr, function(v){
     *         return v + '__';
     *     });
     * })
     * // -> ['a__', 'b__']
     *
     */
    mu.first = function(/**{array}*/ arr, /**{int}*/ n, /**{function}*/ fn) {
        return array__.intercept(arr, n, fn);
    };

    /**
     * mu.last(Array arr, Int n, Function fn)
     * 或许数组的后N个元素
     * @param arr
     * @param n
     * @param fn
     * @returns {*}
     */
    mu.last = function(/**{array}*/ arr, /**{int}*/ n, /**{function}*/ fn) {
        var rst;

        if(n) {
            rst = arr.slice(-n);
        } else {
            rst = arr[arr.length - 1];
        }

        return fn ? fn.call(null, rst, arr) : rst;
    };

    /**
     * mu.delete(Array arr, Int i)
     * @param arr
     * @param i
     * @returns {{array}}
     */
    mu.delete = function(/**{array}*/ arr, /**{int}*/ i) {
        delete arr[i];
        return arr;
    };

    /**
     * mu.unique(Array arr)
     * 数组去重
     * @param arr
     */
    mu.unique = function(/**{array}*/ arr) {
        var obj = _.map(arr, function(v, i) {
            return {
                '__key__': _.toStringWithType(v),
                '__val__': i
            };
        }, {});

        return _.map(obj, function(v) {
            return arr[v];
        }, []);
    };

    /**
     * mu.intersect(Array arr...)
     * 获取数组的交集
     * @param arr1
     * @param arr2
     * @returns {Array}
     *
     * PS: 产生交集的数组应该为不重复元素构成的数组
     */
    mu.intersect = function(/**{array}*/ arr1, /**{array...}*/ arr2) {
        var args = _.args(arguments), arr = [];

        if(args.length < 2) {
            return arr;
        }

        arr1 = _.unique(args.shift() || []);
        arr2 = _.unique(args.shift() || []);

        _.each(arr1, function(o){
            if(_.indexOf(arr2, o) > -1){
                arr.push(o);
            }
        });

        if(args.length > 0) {
            args.unshift(arr);
            return _.intersect.apply(null, args);
        } else {
            return arr;
        }
    };

    /**
     * mu.union(Array arr1...)
     * 两个集合的并集
     * @param arr1
     * @param arr2
     * @returns {{array}}
     */
    mu.union = function(/**{array}*/ arr1, /**{array...}*/ arr2){
        var args = _.args(arguments), arr = [];

        _.each(args, function(o){
            arr = arr.concat(o);
        });

        return _.unique(arr);
    };

    /**
     * mu.minus(Array arr...)
     * 两个集合的差集
     * @param arr1
     * @param arr2
     * @returns {{array}}
     *
     * @PS: 记A，B是两个集合，则所有属于A且不属于B的元素构成的集合
     */
    mu.minus = function(/**{array}*/ arr1, /**{array...}*/ arr2){
        var args = _.args(arguments), arr = [];

        if(args.length < 2) {
            return arr;
        }

        arr1 = _.unique(args.shift() || []);
        arr2 = _.unique(args.shift() || []);

        _.each(arr1, function(o){
            if(_.indexOf(arr2, o) === -1){
                arr.push(o);
            }
        });

        if(args.length > 0) {
            args.unshift(arr);
            return _.minus.apply(null, args);
        } else {
            return arr;
        }
    };

    /**
     * mu.complement(Array arr1, Array arr2)
     * 两个集合的余集(模糊余集)
     * @param arr1
     * @param arr2
     * @returns {{array}}
     *
     * @PS: 模糊余集: 两个集合的并集 - 两个集合的交集
     */
    mu.complement = function(/**{array}*/ arr1, /**{array...}*/ arr2){
        var args = _.args(arguments);
        return _.minus(_.union.apply(null, args), _.intersect.apply(null, args));
    };


    /**
     * mu.clean(Array arr, Int level)
     * @param arr
     * @param level
     *      1 -> 清理 undefined
     *      2 -> 清理 undefined, null
     *      3 -> 清理 假值
     *      4 -> 清理 空值
     */
    mu.clean = function(/**{array)*/ arr, /**int*/ level) {
        level = level || 1;

        var fn = {
            1: _.isUndefined,
            2: _.isNotExist,
            3: _.isIf,
            4: _.isEmpty
        };

        return _.map(arr, function(v) {
            if(fn[level](v)) {
                return C.REMOVE_MAP;
            } else {
                return v;
            }
        });
    };

    /**
     * mu.insert(Array arr, Any any, Int index);
     * 在数组插入指定位置(index)
     * @param arr
     * @param val
     * @param index
     * @returns {{array}}
     */
    mu.insert = function(/**{array}*/ arr, /**{any}*/ val, /**{int}*/ index) {
        var l = arr.length;
        index = index > l ? l : index < 0 ? 0 : index || 0;
        arr.splice(index, 0, val);
        return arr;
    };

    /**
     * mu.indexOf(Array array, Any item)
     * 查找 item 所在数组的位置(index 索引值), 若不存在则为 -1;
     * @param arr
     * @param item
     * @returns {{int}}
     */
    mu.indexOf = function(/**{array}*/ arr, /**{any}*/ item) {
        item = _.toStringWithType(item);
        var index = -1;
        _.each(arr, function(v, i) {
            if(item === _.toStringWithType(v)) {
                index = i;
                return false;
            }
        });

        return index;
    };


});
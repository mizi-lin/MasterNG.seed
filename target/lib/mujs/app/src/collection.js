/**
 * 集合
 */

define(function(mu) {
    /**
     * mu.remove(Collection src, Any conditions)
     * 删除集合中的某一项
     * @param collect
     * @param conditions 删除条件, 可以是某个属性或索引值, 也可以是某个方法
     * @returns {*|Array}
     *
     * exp.
     *
     * mu.remove({a:1, b:2, c:3, d:4, e:5}, function(v, k){
     *      return v % 2 === 0
     *  })
     * // -> {a: 1, c: 3, e: 5}
     *
     * mu.remove([1,2,3,4,5], function(v, k){
     *      return v % 2 === 0
     * })
     * // ->[1, 3, 5]
     *
     */
    mu.remove = function(/**{collection}*/ collect, /**{any}*/ conditions){
        var callfn = conditions;
        if(!_.isFunction(conditions)){
            callfn = function(o, key){
                return key === conditions;
            };
        }
        return _.map(collect, function(o, key){
            if(callfn.call(null, o, key, collect)) {
                return C.REMOVE_MAP;
            }else{
                return o;
            }
        });
    };

    /**
     * mu.len(Collection obj)
     * 返回对象的长度(或属性的个数)
     * @param obj
     * @returns {int}
     */
    mu.len = function(/**{collection}*/ obj) {
        if(_.isObject(obj)) {
            return _.keys(obj).length;
        }

        if(_.isArray(obj) || _.isFunction(obj)) {
            return obj.length;
        }

        return String(obj).length;
    };

    /**
     * mu.flat(Object obj)
     * 扁平化呈现数据
     * @param obj
     * @returns {object}
     *
     * exp.
     *
     * mu.flag(['a', 'b', {'c':1}])
     * // -> {[0]: "a", [1]: "b", [2].c: 1}
     *
     * mu.flat({
     *     "data": {
     *         "containerId": 47,
     *         "containerKey": "TM-ZP9KRX",
     *         "containerName": "test 1.4.2",
     *         "createUserId": "10003",
     *         "updateUserId": "10003"
     *     }
     * })
     *
     * // -> {
     *      data.containerId: 47,
     *      data.containerKey: "TM-ZP9KRX",
     *      data.containerName: "test 1.4.2",
     *      data.createUserId: "10003",
     *      data.updateUserId: "10003"
     *  }
     *
     */
    mu.flat = mu.chainToFlat = function(/**{collection}*/ obj) {

        var arrKey = function(index) {
            return '[' + index + ']';
        };

        var rst = {};

        _.each(obj, function(v, k, obj) {
            var key = _.isArray(obj) ? arrKey(k) : k;
            if(typeof v === 'object') {
                _.each(_.flat(v), function(vv, kk) {
                    rst[key + '.' + kk] = vv;
                });
            } else {
                rst[key] = v;
            }
        });

        return rst;
    };

    /**
     * mu.flatWithBracket(Object obj)
     * 将对象扁平化显示, 属性标识全部使用[]
     * @param obj
     * @param isBracket
     * @returns {{}}
     */
    mu.flatWithBracket = function(/**{object}*/ obj, /**{boolean}*/ isBracket){
        var rst = {};
        _.each(obj, function(v, k) {
            var key = isBracket ? '['+ k +']' : k;
            if(typeof v === 'object') {
                _.each(_.flatWithBracket(v, true), function(vv, kk) {
                    rst[key + '' + kk] = vv;
                });
            } else {
                rst[key] = v;
            }
        });
        return rst;
    };

    /**
     * mu.flatToCharin(Object obj)
     * 将扁平化对象转为链型对象
     * @params obj
     */
    mu.flatToChain = function(/**{object}*/ obj) {
        var reg = /^[(\d+)]$/g;
        var rst = {};

        var setVal = function(key, i, l, v) {


            var isArray = reg.test(key);
            if(isArray) {
                key = reg.exec(key)[1];
                if(!_.isArray(rst)) {
                    rst = [];
                }
            }

            rst[key] = {};

            if(i === l) {
                rst[key] = v;
            }
        };

        _.each(obj, function(val, prop) {
            var part = prop.split('.');
            var l = part.length;
            _.each(part, function(key, i) {

                setVal(key, i, l);
            });
        });

        return rst;
    };

    /**
     * mu.find()
     * 查找集合中中符合条件的第一项
     * @param collect
     * @param fn
     * @returns {*}
     */
    mu.find = function(/**{collection}*/ collect, /**{any}*/ fn) {
        var rst;

        _.each(collect, function(v, i, src) {
            if(fn.call(null, v, i, src)) {
                rst = v;
                return false;
            }
        });

        return rst;
    };

    /**
     * mu.find()
     * 查找数组中符合条件的第一项的索引值
     * @param arr
     * @param fn
     * @returns {*}
     */
    mu.findIndex = function(/**{array}*/ arr, /**{any}*/ fn) {
        var rst;

        mu.run(!_.isFunction(fn), function() {
            var val = fn;
            fn = function(v) {
                return val === v;
            };
        });

        _.each(arr, function(v, i, src) {
            if(fn.call(null, v, i, src)) {
                rst = i;
                return false;
            }
        });

        return rst;
    };

    mu.query = function() {

    };

    mu.queryIndex = function() {

    };

    mu.prop = function(/**Object*/ collect, /**String*/ propStr) {

        var args = _.args(arguments), keys;
        var rst = collect || window;

        if(args.length > 2){
            keys = args.slice(1);
        }else{
            keys = propStr.split('.');
        }

        for(var i = 0, key; (key = keys[i++]);) {
            if(!_.isExist(rst[key]) || !rst.hasOwnProperty(key)) {
                return;
            }

            rst = rst[key];
        }

        return rst;
    };


    // mu.get

    function __objPick__ (/**{object}*/ obj, /**{string}...*/ key){
        var args = _.args(arguments);
        var rst = {};
        obj = args.shift();

        _.each(args, function(key){
            if(Object.prototype.hasOwnProperty.call(obj, key)){
                rst[key] = obj[key];
            }
        });

        return rst;
    }

    function __arrPick__ (/**{array}*/ arr, /**{string|number}...*/ key){
        var args = _.args(arguments);
        arr = args.shift();
        key = args[0];


        return _.run(mu.isNumeric(key), function(){
            var rst = [];

            _.each(args, function(k){
                if(_.isNumeric(k)){
                    rst.push(arr[k]);
                }
            });

            return rst;

        }, function(){
            return _.map(arr, function(o){
                var __args__ = _.extend([], args);
                __args__.unshift(o);
                return __objPick__.apply(null, __args__);
            });
        });
    }

    /**
     * mu.pick(Array arr, Int index...)
     * mu.pick(Object obj, String key...)
     * mu.pick(Array arr, String key...)
     *
     * 从原来的集合中, 摘除部分项, 组成新的集合
     *
     * @param o
     * @param key
     * @returns {*}
     */

    /**
     * ex.
     *
     * mu.pick([1,3,4,5,6], 1, 3, 5)
     * //=> [3, 5, undefined]
     *
     * mu.pick([{a:1, b:2, c: 4}, {a:2}, {c:3}], 'a', 'b')
     * //=>[{a:1, b:2}, {a:2}, {}]
     *
     * mu.pick({a:1, b:2, c:3, d:4}, 'c', 'd', 'e')
     * //=> {c:3, d:4}
     */
    mu.pick = function(/**{object|array}*/ o, /**{string|number}...*/ key ){
        if(_.isObject(o)){
            return __objPick__.apply(null, arguments);
        }else{
            return __arrPick__.apply(null, arguments);
        }
    };


    return mu;
});
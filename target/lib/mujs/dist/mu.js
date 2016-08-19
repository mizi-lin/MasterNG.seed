/**
 * mu.js
 * 类似undestore的JS方法库
 *
 * PS: 基本上不考虑 IE6/7
 *
 */

//若要求道（ To follow the path:）
//看着大师（ look to the master,）
//追隨大师（ follow the master,）
//接近大师（ walk with the master,）
//看穿大师（ see through the master,）
//成为大师（ become the master.

(function(window, undefined) {
   // 'use strict';

    // 创建闭包全局
    var root = this;
    var mu, _;

    var arrPro = Array.prototype,
        objPro = Object.prototype,
        fnPro = Function.prototype;


    var slice = arrPro.slice,
        hasOwnProperty = objPro.hasOwnProperty;

    var REG = {
        CHINESE: /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/g,
        TRIM: /(^\s*)|(\s*$)/g,
        TRIM_LEFT: /(^\s*)/g,
        TRIM_RIGHT: /(\s*$)/g
    };

    var C = {
        REMOVE_MAP: '__remove_map__'
    };


    // 创建对象式的调用方式， 返回一个包装器
    // 包装器对象中包含所有的 mu 方法
    // mu 为一个函数对象，实例服从单例模式
    // 模拟 Underscore 的 _(obj)

    mu = _ = function(/**any*/ obj) {
        //如果参数为_对象，说明已经实例化过了，所以直接返回
        if(obj instanceof _) {
            return obj;
        }
        //如果实例化时没有使用new，那么在这里包装一下，使得this指向该实例
        if(!(this instanceof _)) {
            return new _(obj);
        }
        //将obj保存在内部属性__wrapped__中
        this.__wrapped__ = obj;
        //链式访问权限
        this.__chain__ = false;
    };

    mu.is = {};

    mu.verison = '1.7.9';


//})()





    /**
     * ifunction_
     * 如果参数是function, 就允许它, 否则返回原参数
     * @@private method
     * @param {any} fn
     * @param {array} args
     * @param {object} context
     * @protected
     */
    _.iffn =  function (fn, args, context){
        if(typeof fn === 'function'){
            return fn.apply(context, args || []);
        }

        return fn;
    };

    /**
     * mu.run(con, inbox, outbox, judgement)
     * 如果 if con = true -> inbox ::else -> outbox
     * @param {any} con, con 判断的条件遵从运算符 if
     * @param {any} inbox
     * @param {any} outbox
     * @returns {*}
     */

    /**
     * ex.
     *
     *   mu.run(function(){
     *       ...conditon...
     *   })
     *
     *   mu.run(con, function(con){
     *       ...condition...
     *   })
     *
     *   mu.run(con, 'if ture', 'if else')
     */
    mu.run = function (con, inbox, outbox){
        var b = _.iffn(con);

        if(arguments.length ===1){
            return b;
        }
        
        return mu.isNotEmpty(b) ? _.iffn(inbox, [con]) : _.iffn(outbox, [con]);
    };

    /**
     * mu.if(Any con, Function inbox, Function outbox)
     * @param con: con not function
     * @param inbox
     * @param outbox
     * @returns {*}
     */
    mu.if = function(con, inbox, outbox){
        return con ? _.iffn(inbox, [con]) : _.iffn(outbox, [con]);
    };


    /**
     * mu.exist
     * 如果con 存在 -> inbox ::else outbox
     * @param {any} con : not function
     * @param {any} inbox
     * @param {any} outbox
     * @returns {*}
     */
    mu.exist = function(con, inbox, outbox) {
        return _.isExist(con) ? _.iffn(inbox, [con]) : _.iffn(outbox, [con]);
    };

    /**
     * mu.empty
     * 如果con 为空 -> inbox ::else outbox
     * @param {any} con : not function
     * @param {any} inbox
     * @param {any} outbox
     * @returns {*}
     */
    mu.empty = function(con, inbox, outbox){
        return _.isEmpty(con) ? _.iffn(inbox, [con]) : _.iffn(outbox, [con]);
    };

    /**
     * mu.have
     * 如果con 为空 -> inbox ::else outbox
     * @param {any} con : not function
     * @param {any} inbox
     * @param {any} outbox
     * @returns {*}
     */
    mu.have = function(con, inbox, outbox){
        return _.isNotEmpty(con) ? _.iffn(inbox, [con]) : _.iffn(outbox, [con]);
    };

    /**
     * mu.injector(Function fn[, Any any...])
     * 闭包的又一种写法, 向方法中注入参数
     * @params any
     * @return {any} 
     */
    mu.injector = function(/**{fn}*/ fn, /**{any...}*/ any){
        var args = _.args(arguments);
        fn = args.shift();
        return fn.apply(null, args);
    };






    /**
     * mu.noop();
     * 空函数
     */
    mu.noop = function() {
    };


    /**
     * mu.type(Any any[, String type])
     * 获得参数的数据类型 / 判断参数的数据类型
     * @param {any} any
     * @param {type} type: 'string', 'number', 'array', 'date', 'regex', 'function', 'object'
     */
    mu.type = function(any, type) {

        if(type){
            return type === _.type(any);
        }

        // vaild undefined and null
        if(any === null || any === undefined) {
            return String(any);
        }

        // todo element 校验判断
        if(any.nodeType === 1){
            return 'element';
        }

        var reg = /\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/;
        var typeMap = objPro.toString.call(Object(any));
        typeMap = reg.exec(typeMap);

        type = typeMap ? typeMap[1].toLowerCase() : any.callee ? 'arguments' : _.isElement(any) ? 'element' : 'object';

        return type;
        
    };


/**
 * 迭代器
 */



    /**
     * mu.each(Any any, Function fn[, Object context])
     * 遍历数据对象或集合
     * @param any
     * @param fn(val, key, src)
     * @param context
     */
    mu.each = function(/**{any}*/ any, /**{function}*/ fn, /**[Object]*/ context) {
        var i = 0;

        switch(_.type(any)) {
            case 'number':
                while(i < any) {
                    if(fn.call(context, i, i + 1, any) === false) {
                        break;
                    }

                    i++;
                }
                break;
            case 'array':
            case 'string':

                for(var l = any.length; i < l; i++) {
                    if(fn.call(context, any[i], i, any) === false) {
                        break;
                    }
                }

                break;
            case 'object':

                // 兼容IE9 以下, 不能枚举的属性手动重定义的元素 propertyIsEnumerable 不能判断
                // propertyIsEnumerable 判断给定的属性是否可以用 for...in 语句进行枚举
                // hasOwnProperty(property) 判断对象是否有某个特定的属性。必须用字符串指定该属性
                // !!! 不考虑 {toString: null}.propertyIsEnumerable('toString') === false 的情况
                for(i in any) {
                    if(any.hasOwnProperty(i)) {
                        if(fn.call(context, any[i], i, any) === false) {
                            break;
                        }
                    }
                }



                break;
        }

    };

    /**
     * mu.map(Object|Array obj, Function fn[, Object|Array initData, Object context)
     * 映射源头, 生成新的对象或数组
     * 史上最强大的 map
     * @param obj
     * @param fn
     * @param initData
     * @param context
     * @returns {array}
     *
     * exp.
     *
     * mu.map([1,2,3], function(v, i){ return v*2; })
     * // -> [2, 4, 6]
     *
     * mu.map({a: 'Mizi', b: 'Zichu'}, function(v, k){ return v + ' Lin'})
     * // -> {a: 'Mizi Lin', b: 'Zichu Lin'}
     *
     * ## 移除数组中的 undefined, 返回新数组
     * mu.map([1, undefined, undefined, 3], function(v, i){
     *    if(v === undefined){
     *      return '__remove_map__';
     *    }else{
     *      return v;
     *    }
     * })
     *
     * // -> [1, 3]
     *
     * ## 将数组转为对象, 用数组的索引最为对象的key, 值为值
     * mu.map(['mizi', 'zichu', 'xiaoming'], function(v){return v;}, {});
     * // ->  {0: 'mizi', 1: 'zichu', 2: 'xiaoming'}
     *
     * ## 将数组转为对象, 值为key, 索引为值
     * mu.map(['mizi', 'zichu', 'xiaoming'], function(v, i){
     *    return {
     *      '__key__': v,
     *      '__val__': i
     *    };
     * }, {});
     * // -> {mizi: 0, zichu: 1, xiaoming: 2}
     *
     * ## 将对象转为一维数组, 值为数组值
     * mu.map({a:'mizi', b: 'zichu'}, function(v){ return v; }, [])
     * // -> ['mizi', 'zichu']
     *
     */
    mu.map = function(/**{object|array}*/ obj, /**{function}*/ fn, /**[object|array]*/ initData, /**[Object]*/ context) {
        if(!(obj && fn && _.isFunction(fn))) {
            return obj;
        }

        var rst = initData ? initData : _.isArrayLike(obj) ? [] : {};

        _.each(obj, function(v, k) {
            var cb = fn.call(context, v, k, obj);

            if(cb !== C.REMOVE_MAP) {
                if(_.isObject(rst)) {
                    if(cb && cb.__key__) {
                        rst[cb.__key__] = cb.__val__;
                    } else {
                        rst[k] = cb;
                    }
                } else {
                    rst[rst.length] = cb;
                }
            }
        });

        return rst;

    };

    /**
     * mu.extend([Boolean isDeep,] Object src, Object ...target)
     * 将src的属性覆盖到target上，若有相同的属性，会完全覆盖
     * target 从后向前覆盖
     * @param isDeep 是否深层覆盖
     * @param src
     * @param target...
     * @returns {{object}}
     *
     * exp.
     *
     * mu.extend({a:{d: 2}, b:2}, {a:{e:3}, c:4})
     * // -> {a:{e:3}, b:2, c:4}
     *
     * mu.extend(true, {a: {d: 2}, b:2}, {a:{e:3}, c:4})
     * // -> {a:{d:2, e:3}, b:2, c:4}
     *
     * mu.extend({}, {}, {}...)
     */
    mu.extend = function(/**{boolean}*/ isDeep, /**{object}*/ src, /**[object...]*/ target) {
        var args = _.args(arguments);

        if(_.type(isDeep, 'boolean')) {
            isDeep = args.shift();
        } else {
            isDeep = false;
        }

        src = args[0];

        // support object and array
        if(typeof src !== 'object') {
            return src;
        }

        _.each(args, function(target) {
            _.each(target, function(oo, kk) {
                if(isDeep) {
                    src[kk] = typeof oo === 'object' ? _.extend(true, src[kk] || _.reorigin(oo), oo) : oo;
                } else {
                    if(src[kk] !== oo) {
                        src[kk] = oo;
                    }
                }
            });
        });

        return src;
    };


    /**
     * mu.isBaseType(T t)
     * 判断对象是否为基本类型
     * 基本类型： null, undefined, string, number, boolean
     * @param any
     * @returns {boolean}
     */
    mu.isBaseType = function(/**{any}*/ any) {
        return Object(any) !== any;
    };

    /**
     * mu.isNull(Any any)
     * @param any
     * @returns {boolean}
     */
    mu.isNull = function(/**{any}*/ any){
        return any === null;
    };

    /**
     * mu.isUndefined(Any any)
     * @param any
     * @returns {boolean}
     */
    mu.isUndefined = function(/**{any}*/ any){
        return any === undefined;
    };

    /**
     * mu.isNumeric
     * @param any
     * @returns {boolean}
     *
     * // todo
     */
    mu.isNumeric = function(/**{any}**/ any) {
        return !isNaN(parseFloat(any)) && isFinite(any);
    };

    /**
     * mu.isInteger(Any any)
     * 判断是否整数
     * @param any
     * @return {boolean}
     */
    mu.isInteger = function(/**{any}*/ any){
        return _.isNumeric(any) && any === parseInt(any);
    };

    /**
     * mu.isWindow(Object win)
     * 判断一个对象是否是为window对象
     * @param win
     * @returns {*|boolean}
     */
    mu.isWindow = function(/**{object}*/ win) {
        return !!(win && win === win.window);
    };

    /**
     * mu.isElement(Any any)
     * 判断该对象是否 element
     * @param any
     * @returns {boolean}
     */
    mu.isElement = function(/**{any}*/ any) {
        return !!(any && any.nodeType === 1) && !_.isPlainObject(any);
    };

    /**
     * mu.isDate(Any any)
     * @param any
     * @returns {boolean}
     */
    mu.isDate = function(/**{any}*/ any){
        return _.type(any, 'date');
    };

    /**
     * mu.isDateLike(Any any)
     * 一切有效的可以转为日期格式的值(不包括 Invalid Date)
     * @param any
     * @returns {boolean}
     */

    /**
     *  exp.
     *
     *  mu.isDateLike(1457948891718)
     *  //-> true
     *
     *  mu.isDateLike('abdde')
     *  //-> false
     */
    mu.isDateLike = function(/**{any}*/ any){
        var d = new Date(any);
        return d.toString() !== 'Invalid Date';
    };

    /**
     * mu.isArray(Any any)
     * @param any
     * @returns {*}
     */
    mu.isArray = function(/**{Any}*/ any) {
        return _.type(any, 'array');
    };

    /**
     * mu.isObject(Any any)
     * @param any
     * @returns {*}
     */
    mu.isObject = function(/**{Any}*/ any) {
        return _.type(any, 'object');
    };

    /**
     * mu.isFunction(Any any)
     * @param any
     * @returns {boolean}
     */
    mu.isFunction = function(/**{Any}*/ any){
        return typeof any === 'function';
    };

    /**
     * mu.isEmptyObject(Any any)
     * 空对象
     * @param obj
     */
    mu.isEmptyObject = function(/**{Any}*/ obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    };


    /**
     * mu.isPlainObject(Any any)
     * 判断一个any是否是一个纯对象 (通过 new Object 或 {})创建
     * @param obj
     */

    /**
     * exp.
     * 只有纯对象(对象字面量)才为true
     *
     * mu.isPlainObject({})
     * //-> true
     *
     * mu.isPlainObject(window)
     * //-> false
     *
     * mu.isPlainObject(document)
     * //-> false
     *
     * mu.isPlainObject(null)
     * //-> false
     *
     * mu.isPlainObject(undefined)
     * //-> false
     *
     * var cls = new mu();
     * mu.isPlainObject(cls)
     * //-> false
     */
    mu.isPlainObject = function(/**{Any}*/ obj) {
        if(_.isObject(obj)) {
            Object.getPrototypeOf || (Object.getPrototypeOf = function(obj) {
                return obj['__proto__'] || obj.prototype || (obj.constructor && obj.constructor.prototype) || Object.prototype;
            });

            return Object.getPrototypeOf(obj) === Object.prototype;
        }

        return false;
    };

    /**
     * mu.isEmpty(Any any)
     * 判断对象是否为空值
     * @param {any} any
     * @param {boolean} reversal: 反转方法结果
     */

    /**
     * exp.
     * 假值: 使用if或!!运算符得出结果为 false 的值
     * 不纯在的值: null || undefined
     * 空值: 假值, 空数组, 0, 空对象
     *
     * mu.isEmpty({})
     * //-> true
     *
     * mu.isEmpty([])
     * //-> true
     *
     * mu.isEmpty('   ')
     * //-> true
     *
     * mu.isEmpty(0)
     * //-> true
     *
     * mu.isEmpty('0')
     * //-> true
     *
     * mu.isEmpty('00')
     * //-> false !!! 
     *
     * mu.isEmpty(false)
     * //-> true
     *
     * mu.isEmpty(null)
     * //-> true
     *
     * mu.isEmpty(undefined)
     * //-> true
     *
     */
    mu.isEmpty = function(/**{Any}*/ any) {
        var rst = !any;

        if(!rst) {
            switch(_.type(any)) {
                case 'string':
                    var s = any.replace(/(^\s*)|(\s*$)/g, '');
                    rst = s.length === 0 || s === '0';
                    break;
                case 'array':
                    rst = any.length === 0;
                    break;
                case 'object':
                    rst = _.isEmptyObject(any);
                    break;
                case 'date':
                    rst = !_.isDateLike(any);
                    break;
            }
        }

        return rst;
    };

    mu.isNotEmpty = function(){
        var args = _.args(arguments);
        return !_.isEmpty.apply(null, args);
    };

    /**
     * mu.isExist(Any any)
     * 判断对象是否存在
     * @param {any} any
     */

    /**
     * exp.
     * 假值: 使用if或!!运算符得出结果为 false 的值
     * 不纯在的值: null || undefined
     * 空值: 假值, 空数组, 0, 空对象
     *
     * mu.isExist({})
     * //-> true
     *
     * mu.isExist([])
     * //-> true
     *
     * mu.isExist('   ')
     * //-> true
     *
     * mu.isExist(0)
     * //-> true
     *
     * mu.isExist(false)
     * //-> true
     *
     * mu.isExist(null)
     * //-> false
     *
     * mu.isExist(undefined)
     * //-> false
     *
     */
    mu.isExist = function(/**{Any}*/ any) {
        return !(any === null || any === undefined);
    };

    mu.isNotExist = function(){
        var args = _.args(arguments);
        return !_.isExist.apply(null, args);
    };

    /**
     * mu.isIf(Any any)
     * 判断假植
     * @param any
     * @returns {boolean}
     */
    mu.isIf = function(/**{Any}*/ any){
        return !!any;
    };

    mu.isNotIf = function(){
        var args = _.args(arguments);
        return !_.isIf.apply(null, args);
    };

    /**
     * mu.isArrayLike(Any any)
     * 一切看起来像数组的东西(arguments, node 等)
     * @param any
     *
     * PS. copy underscore
     */

    /**
     * exp.
     * 数组 and 伪数组对象
     *
     * mu.isArrayLike({length: 100})
     * //-> false
     *
     * mu.isArrayLike([])
     * //-> true
     *
     * mu.isArrayLike(document.querySelectorAll('div'))
     * //-> true
     *
     * mu.isArrayLike(arguments)
     * //->true
     */

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    mu.isArrayLike = function(/**{Any}*/ any) {
        var length = _.isExist(any) && typeof any === 'object' && !_.isPlainObject(any) && any.length;
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };







    /**
     * mu.ifnvl(Any src, Any target)
     * 如果 src 为 null 或 undefined 则输出 target 否则 输出 src 或 fn 的值
     * @param src
     * @param target
     */

    /**
     * exp.
     *
     * var p;
     *
     * mu.ifnvl(p, 'mu.js')
     * //-> mu.js
     *
     * p = 'MU';
     *
     * mu.ifnvl(p, 'mu.js)
     * //-> MU
     *
     * mu.ifnvl(p, 'mu.js', function(src, target){
     *  return src + '.JS';
     * }
     * //-> MU.JS
     *
     * mu.ifnvl('', 'mu.js')
     * //-> ''
     *
     * mu.ifnvl(false, 'mu.js')
     * //-> false
     *
     * mu.ifnvl([], 'mu.js')
     * //-> []
     *
     */
    mu.ifnvl = function(/**{any}*/ src, /**{any}*/ target, /**{function}*/ fn){
        return _.isExist(src) ? (fn ? fn.call(null, src, target) : src ) : target;
    };

    /**
     * mu.ifempty(Any src, Any target, Function fn)
     * if src === empty ? target : ( fn || src )
     * @param src
     * @param target
     * @param fn
     * @returns {{any}}
     */

    /**
     * exp.
     *
     * var p;
     *
     * mu.ifempty(p, 'mu.js')
     * //-> mu.js
     *
     * p = 'MU';
     *
     * mu.ifempty(p, 'mu.js)
     * //-> MU
     *
     * mu.ifempty(p, 'mu.js', function(src, target){
     *  return src + '.JS';
     * }
     * //-> MU.JS
     *
     * mu.ifempty('', 'mu.js')
     * //-> mu.js
     *
     * mu.ifempty(false, 'mu.js')
     * //-> mu.js
     *
     * mu.ifempty([], 'mu.js')
     * //-> mu.js
     *
     */
    mu.ifempty = function(/**{any}*/ src, /**{any}*/ target, /**{function}*/ fn){
        return !_.isEmpty(src) ? (fn ? fn.call(null, src, target) : src ) : target;
    };

    /**
     * exp.
     *
     * var p;
     *
     * mu.ifif(p, 'mu.js')
     * //-> mu.js
     *
     * p = 'MU';
     *
     * mu.ifif(p, 'mu.js)
     * //-> MU
     *
     * mu.ifif(p, 'mu.js', function(src, target){
     *  return src + '.JS';
     * }
     * //-> MU.JS
     *
     * mu.ifif('', 'mu.js')
     * //-> mu.js
     *
     * mu.ifif(false, 'mu.js')
     * //-> mu.js
     *
     * mu.ifif([], 'mu.js')
     * //-> []
     *
     * mu.ifif({}, 'mu.js')
     * //-> {}
     *
     */
    mu.ifif = function(/**{any}*/ src, /**{any}*/ target, /**{function}*/ fn){
        return src ? (fn ? fn.call(null, src, target) : src ) : target;
    };
//mu.has = function(con, inbox, outbox){
//    return _.run(con, inbox, outbox, function(con) {
//        if(typeof con === 'string'){
//            con = con.replace(/(^s*)|(s*$)/g, "");
//        }
//
//        if(typeof con === 'object'){
//
//        }
//
//        con = con || false;
//
//
//
//        return con !== undefined && con !== null;
//    });
//};
/**
 * 暗黑小工具
 */



    //@page base/util.js

    /**
     * mu.args(Arguments args)
     * 将 Arguments 转为一个数组
     * @param args
     * @param expand
     * @param start
     * @returns {Array.<T>}
     *
     * exp.
     *
     * var fn = function(){
     *     console.debug('args1:::->', mu.args(arguments));
     *     console.debug('args2:::->', mu.args(arguments,2));
     *     console.debug('args3:::->', mu.args(true, arguments,2));
     * }
     *
     * // -> args1:::-> [1, 2, 3, 4]
     * // -> args2:::->  [3, 4]
     * // -> args3:::-> [3, 4, __0__: Object, __1__: Object]
     */
    mu.args = function(/**{boolean}*/ expand, /**{arguments}*/ args, /**{int}*/ start){

        if(_.type(arguments[0], 'boolean')){
            expand = arguments[0];
        }else{
            args = arguments[0];
            start = arguments[1];
            expand = false;
        }

        args = slice.call(args, start || 0);

        if(expand){
            _.each(args, function(v, i){
                args['__' + i + '__'] = {
                    type: _.type(v),
                    val: v
                };
            });
        }

        return args;
    };

    /**
     * mu.reorigin(Any any)
     * 根据any的类型,回到any的初始状态
     * @param any
     * @returns {*}
     *
     * mu.reorigin({a:1, b:2, c:3})
     * // -> {}
     *
     * mu.reorigin([1,2,3,4,5,6, 7])
     * // -> []
     *
     */
    mu.reorigin = function(/**{any}*/ any){
        return {
            'string': '',
            'number': 0,
            'date': new Date(0),
            'regex': new RegExp(),
            'object': {},
            'array': [],
            'function': _.noop
        }[_.type(any)];
    };

    /**
     * mu.create(Any val, Any key)
     * 生成一个新的对象|数组
     * @param val
     * @param key
     *
     * mu.create(1, 'a')
     * // -> {a:1}
     *
     * mu.create(1)
     * // -> [1]
     */
    mu.create = function(/**{any}*/ val, /**[any]*/ key){
        return arguments.length === 1 ? [val] : _.run(function(){
            var obj = {};
            obj[key] = val;
            return obj;
        });
    };

    /**
     * mu.or(Any src, Any t1....tn)
     * 比较  等同于  src === t1 || src === t2 || src === t3 ...
     * 只要有一项多true, 则返回true
     * @param src
     * @param target
     * @returns {boolean}
     *
     * exp.
     *
     * mu.or(1, '1', '01', '-1', 1)
     * // ->  true
     */
    mu.or = function(/**{any}*/ src, /**{any...}*/ target){
        var args = _.args(arguments);
        src = args.shift();

        for(var i = 0, l = args.length; i < l; i ++){
            target = args[i];
            if(src === target){
                return true;
            }
        }

        return false;
    };

    mu.compare = mu.or;

    /**
     * mu.and(Any src, Any t1....tn)
     * 比较  等同于  src === t1 && src === t2 && src === t3 ...
     * 只要有一项多false, 则返回false
     * @param src
     * @param target
     * @returns {boolean}
     *
     * exp.
     *
     * mu.or(1, '1', '01', '-1', 1)
     * // ->  false
     */
    mu.and = function(/**{any}*/ src, /**{any...}*/ target){
        var args = _.args(arguments);
        src = args.shift();

        for(var i = 0, l = args.length; i < l; i ++){
            target = args[i];
            if(src !== target){
                return false;
            }
        }
        return true;
    };

    /**
     * mu.toStringWithType(Any any)
     * 黑方法，加上类型值得 toString
     * toString + type
     * @param any
     * @returns {string}
     *
     * exp. 
     *
     * mu.toStringWithType(1)
     * // -> 'number_1'
     *
     * mu.toStringWithType(1)
     * // -> 'string_1'
     */
    mu.toStringWithType = function(/**{any}*/ any){
        return _.type(any) + '__' + any;
    };
/**
 * 迭代器
 */



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

    /**
     * environment
     * 当前客户端环境判断(浏览器, 系统, ECMA)
     * https://github.com/arasatasaygin/is.js/blob/master/is.js
     */

    //@todo isWeixin, 浏览器引擎
    _.run(function(){
        var module = {
            options: [],
            header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
            dataos: [
                {name: 'Windows Phone', value: 'Windows Phone', version: 'OS'},
                {name: 'Windows', value: 'Win', version: 'NT'},
                {name: 'iPhone', value: 'iPhone', version: 'OS'},
                {name: 'iPad', value: 'iPad', version: 'OS'},
                {name: 'Kindle', value: 'Silk', version: 'Silk'},
                {name: 'Android', value: 'Android', version: 'Android'},
                {name: 'PlayBook', value: 'PlayBook', version: 'OS'},
                {name: 'BlackBerry', value: 'BlackBerry', version: '/'},
                {name: 'Mac', value: 'Mac', version: 'OS X'},
                {name: 'Linux', value: 'Linux', version: 'rv'},
                {name: 'Palm', value: 'Palm', version: 'PalmOS'}
            ],
            databrowser: [
                {name: 'Chrome', value: 'Chrome', version: 'Chrome'},
                {name: 'Chromium', value: 'Chromium', version: 'Chromium'},
                {name: 'Firefox', value: 'Firefox', version: 'Firefox'},
                {name: 'Safari', value: 'Safari', version: 'Version'},
                {name: 'IE', value: 'MSIE', version: 'MSIE'},
                {name: 'Opera', value: 'Opera', version: 'Opera'},
                {name: 'BlackBerry', value: 'CLDC', version: 'CLDC'},
                {name: 'Edge', value: 'Edge', version: 'Edge'}
            ],

            datafoctory: [
                {name: 'Mozilla', value: 'Mozilla', version: 'Mozilla'}
            ],

            matchItem: function(string, data) {
                var rst = {name: 'unknown', version: 0, bigVersion: 0};

                _.each(data, function(item){
                    var regex = new RegExp(item.value, 'i');
                    var version = _.run(regex.test(string), function(){
                        var regexv = new RegExp(item.version + '[- /:;]([\\d._]+)', 'i');
                        var matches = string.match(regexv) || [];
                        return _.run(matches[1], function(version){
                            var versions = version.split(/[._]+/);
                            versions.splice(1, 0, '.');
                            return  parseFloat(versions.join(''));
                        });
                    });

                    _.run(version, function(){
                        rst.name = item.name;
                        rst.version = version;
                        rst.bigVersion = parseInt(version);
                    });

                    _.is[item.name.toLowerCase()] = function(){
                        return version;
                    };
                });

                return rst;
            }
        };

        var agent = module.header.join(' '),
            os = module.matchItem(agent, module.dataos),
            browser = module.matchItem(agent, module.databrowser);

        mu.environment = function(/**[string]*/ type){
            var rst = {
                os: os,
                browser: browser
            };

            return type ? rst[type] : rst;
        };
    });

/**
 * 数组
 */



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





    //@page object.js

    /**
     * mu.keys(Object obj)
     * 返回该对象的所有可枚举自身属性的属性名
     * @param obj
     * @returns {Array}
     */
    mu.keys = function(/**{object}*/ obj) {
        return _.if(Object.keys, function(keys) {
            return keys(obj);
        }, function() {

            // 不考虑 propertyIsEnumerable 不能枚举的情况
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
            //  方法 一
            //  if (!Object.keys) Object.keys = function(o) {
            //      if (o !== Object(o))
            //          throw new TypeError('Object.keys called on a non-object');
            //      var k=[],p;
            //      for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
            //      return k;
            //  }
            //
            //
            //  方法 二, 考虑propertyIsEnumerable, IE9以下问题
            //  Object.keys = (function () {
            //      var hasOwnProperty = Object.prototype.hasOwnProperty,
            //          hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
            //          dontEnums = [
            //              'toString',
            //              'toLocaleString',
            //              'valueOf',
            //              'hasOwnProperty',
            //              'isPrototypeOf',
            //              'propertyIsEnumerable',
            //              'constructor'
            //          ],
            //          dontEnumsLength = dontEnums.length;
            //
            //      return function (obj) {
            //          if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
            //
            //          var result = [];
            //
            //          for (var prop in obj) {
            //              if (hasOwnProperty.call(obj, prop)) result.push(prop);
            //          }
            //
            //          if (hasDontEnumBug) {
            //              for (var i=0; i < dontEnumsLength; i++) {
            //                  if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
            //              }
            //          }
            //          return result;
            //      }
            //  })()

            return _.map(obj, function(key){
                return key;
            }, []);
        });
    };

    /**
     * mu.vals(Object obj)
     * 返回该对象的所有可枚举自身属性的值
     * @param obj
     * @returns {Array}
     */
    mu.vals = function(/**{object}*/ obj){
        return _.map(obj, function(key, val){
            return val;
        }, []);
    };
/**
 * 集合
 */


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



    // mu.bind
    // mu.defer
    // mu.throttle

    /**
     * mu.bind(Function fn, Object context, Any any...)
     * 固定fn函数的作用域为context, 不管函数是否变为构造函数或重新赋值,改变作用域
     * @param fn
     * @param context
     * @param any
     */
    mu.bind = function(/**{function}*/ fn, /**{object}*/ context, /**{any...}*/ any) {
        var nativeBind = fnPro.bind, args = _.args(arguments);
        fn = args.shift();
        return _.run(nativeBind && nativeBind === fn.bind, function(){
            return nativeBind.apply(fn, args);
        }, function(){
            context = args.shift();

            var bound =  function(){
                // 绑定参数传递
                args = args.concat(_.args(arguments));

                // 普通function绑定
                if(!(this instanceof  bound)){
                    return fn.apply(context, args);
                }

                var Ctor = _.noop();
                Ctor.prototype = fn.prototype;
                var self = new Ctor();
                Ctor.prototype = null;
                var result = fn.apply(self, args);
                if (_.isObject(result)) return result;
                return self;
            };

            return bound;

        });
    };

    /**
     * mu.bindAll(Object obj[, String keys])
     * 给对象的方法固定作用域
     * @param obj
     * @param keys: if keys == null then keys = Object.keys(keys)
     * @returns {{object}}
     */
    mu.bindAll = function(/**{object}*/ obj, /**{string...}*/ keys){
        var args = _.isUndefined(keys) ? _.keys(obj) : _.args(keys, 1);
        _.each(args, function(k){
            _.run(obj[k], function(fn){
                if(_.isFunction(fn)){
                    obj[k] = _.bind(fn, obj);
                }
            });
        });

        return obj;
    };


    /**
     * mu.debounce(Function fn, Int wait[, Boolean immediate])
     * 弹簧函数
     * @param fn
     * @param wait
     * @param  immediate 决定函数实在弹簧顶部执行还是底部执行
     *         immediate == true 函数立即执行，在弹簧时间内不再执行 (用户双击重复)
     *         immediate == false 在最后一次调用后 wait 时间后执行 （等待执行（懒加载等））
     * @return {function}
     *
     * exp.
     *
     * var b = mu.debounce(fn, 300);
     * // -> 弹簧底部: 若在间隔时间 300ms 内一直执行 b(), 那么函数 fn 一直不会被触发
     *
     * var a = mu.debounce(fn, 300, true)
     * // -> 弹簧顶部: 执行 a(), 函数 fn 立即被触发, 但在 间隔时间 300ms 内再次执行 a(), 则函数fn不再被触发
     *
     */


    mu.debounce = function(/**{function}*/ fn, /**{int}*/ wait, /**{boolean}*/ immediate) {
        var timeout, rst;
        wait = Math.abs(wait);
        return function() {
            var context = this,
                args = arguments;

            var later = function() {
                timeout = null;
                if(!immediate) {
                    run();
                }
            };

            var run = function() {
                rst = fn.apply(context, args);
                context = null;
                args = null;
            };

            var isImmediate = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if(isImmediate) {
                run();
            }

            return rst;
        };
    };

    // mu.once


    /**
     * mu.after(Int n, Function fn[, Object scope])
     * fn 运行 n 次后生效
     * @param n
     * @param fn
     * @param scope
     * @returns {Function}
     */
    mu.after = function(/**Int*/ n, /**Function*/ fn, /**Object*/ context){

        if (!_.isFunction(fn)) {
            throw new TypeError();
        }

        return function() {
            if (--n < 1) {
                return fn.apply(context, arguments);
            }
        };
    };


    var string__ = {};


    /**
     * mu.trim(String str, String position)
     * 去除字符串两端空格符
     * @param str
     * @param postion
     * @returns {*}
     */
    mu.trim = function(/**{string}*/ str, /**{string}*/ postion){
        postion = postion || 'all';

        var reg = {
            'all': REG.TRIM,
            'left': REG.TRIM_LEFT,
            'right': REG.TRIM_RIGHT
        };

        return str.replace(reg[postion] || '', '');
    };

    /**
     * mu.intercept(String str, Int max, Int back, String chart)
     * @param str 需要截取的长度的字符串
     * @param max 字符串最大长度
     * @param adjust 最后显示的调整长度
     * @param symbol 跟随字符串...
     * @returns {{string}}
     */
    mu.intercept = function(/**{string}*/ str, /**{int}*/ max, /**{int}*/ adjust, /**{string}*/ symbol) {
        adjust = adjust || 3;
        symbol = _.ifnvl(symbol, '...');

        var len = str.length;

        if(!max || len >= str) {
            return str;
        }

        return str.substr(0, max - adjust) + symbol;
    };

    /**
     * mu.leftpad(String s, Int l[, String symbol])
     * 左侧补全字符串
     * @param s
     * @param l
     * @param symbol
     * @returns {{string}}
     */
    mu.leftpad = function(/**{string}*/ s, /**{int}*/ l, /**[string]*/ symbol){
        symbol = symbol || '0';
        s = String(s);
        while(s.length < Math.abs(l)){
            s = symbol + s;
        }
        return s;
    }; 

    /**
     * mu.concat(String s1...)
     * 连接字符串
     * @param s1
     * @returns {string|*}
     */
    mu.concat = function(/**{string...}*/ s1){
        var args = _.args(arguments);
        return args.join('');
    };
/**
 * 时间
 */



     /**
     * mu.now()
     * 当前时间
     * @returns {Date}
     */
    mu.now = function(/**Boolean*/ timestamp) {
        return timestamp ? + new Date() : new Date();
    };

    /**
     * mu.timestamp(Date date[, Boolean isShort])
     * 获得当前时间的时间戳, 默认为当前时间
     * @param date
     * @param initType 将某类型的时间设为0 'hhmmssSS'
     * @param short 是否显示短时间戳
     * @returns {number|Date}
     *
     * exp.
     *
     * mu.timestamp(new Date(1458207651074), 'hhssSS')
     * // -> 1458146400000
     *
     * mu.timestamp(new Date(1458207651074), 'SS')
     * // -> 1458207651000
     *
     * mu.timestamp(new Date(1458207651074), 'ssSS')
     * // -> 1458207600000
     *
     * mu.timestamp(new Date(1458207651074), 'mmssSS')
     * // -> 1458205200000
     *
     * mu.timestamp(new Date(1458207651074), 'hhmmssSS')
     * // -> 1458144000000
     *
     * mu.timestamp(new Date(1458207651074), 'ddhhmmssSS')
     * // -> 1456675200000
     *
     * mu.timestamp(new Date(1458207651074), 'MMddhhmmssSS')
     * // -> 1451491200000
     *
     * mu.timestamp(new Date(1458207651074), 'yyyyMMddhhmmssSS')
     * // -> -62167334400000
     *
     */
    mu.timestamp = function(/**{date}*/ date, /**[{string}]*/ initType, /**[boolean]*/ short) {
        date = date || new Date();

        date = _.type(date, 'Date') ? date : new Date(date);

        var typeObj = {
            yyyy: 'setFullYear',
            MM: 'setMonth',
            dd: 'setDate',
            hh: 'setHours',
            mm: 'setMinutes',
            ss: 'setSeconds',
            SS: 'setMilliseconds'
        };

        if(initType){
            _.each(typeObj, function(fn, type){
                if(initType.indexOf(type) > -1){
                    date[fn](0);
                }
            });
        }

        var rst = +date;

        return short ? ( Math.floor(rst / 1000) ) : rst;
    };

    // 时间处理 moment


    /**
     * mu.format()
     * 各种类型的值, 格式化成字符串
     * @param src
     * @returns {*}
     *
     * exp.
     *
     * mu.format('Hello {0}, {1}!', 'Mizi', 'Welcome')
     * // -> "Hello Mizi, Welcome!"
     *
     * mu.format( new Date(1458114893684),  'yyyy年MM月dd日 hh:mm:ss SS 第q季度 星期w')
     * // -> "2016年03月16日 15:54:53 684684 第1季度 星期3"
     *
     * mu.format( new Date(1458114893684),  'yy年M月d日 h:m:s SS 第q季度 星期w')
     * // -> "16年3月16日 15:54:53 684 第1季度 星期3"
     *
     * mu.format(1234567890)
     * // '1,234,567,890'
     *
     * mu.format('1234567890.1234')
     * '1,234,567,890.1234'
     */
    mu.format = function(/**{any}*/ src) {
        var args = _.args(arguments);
        var format;

        src = args.shift();

        var numfomart = function(str){
            return str.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g,',$1');
        };

        switch( _.type(src) ){
            // 字符串替换 String.format
            case 'string':
                if(_.isEmpty(args)){
                    return numfomart(src);
                }else{
                    return src.replace(/\{(\d+)\}/g, function(m, i) {
                        return args[i] || m;
                    });
                }

                break;
            // 日期按既定格式输出字符串 dateformat
            case 'date':

                var y = src.getFullYear(),
                    M = src.getMonth() + 1,
                    q = Math.ceil(M / 3),
                    w = src.getDay(),
                    d = src.getDate(),
                    h = src.getHours(),
                    m = src.getMinutes(),
                    s = src.getSeconds(),
                    S = src.getMilliseconds();

                var dateVals = [
                    {key: 'y{4}',  val: y},
                    {key: 'y{2}',  val: _.leftpad(y % 100, 2)},
                    {key: 'q',  val: q},
                    {key: 'M{2}',  val: _.leftpad(M,2)},
                    {key: 'M',  val: M},
                    {key: 'w',  val: w},
                    {key: 'd{2}',  val: _.leftpad(d,2)},
                    {key: 'd',  val: d},
                    {key: 'h{2}',  val: _.leftpad(h,2)},
                    {key: 'h',  val: h},
                    {key: 'm{2}',  val: _.leftpad(m,2)},
                    {key: 'm',  val: m},
                    {key: 's{2}',  val: _.leftpad(s,2)},
                    {key: 's',  val: s},
                    {key: 'S{2}',  val: S}
                ];

                format = args.shift() || '';

                if(!format){
                    return '';
                }

                _.each(dateVals, function(o){
                    var reg = new RegExp('('+ o.key +')', 'g');
                    format = format.replace(reg, o.val);
                });

                return format;

            // 将数字转为科学计数法, 输出字符串
            case 'number':
                return numfomart(src + '');
        }
    };

	/**
	 * mu.storage(String key, Any val)
	 * Storage 简化操作
     * @param storage
     * @param key
     * @param val
     * @returns {*}
     */

    /**
     * mu.storage('X-TOKEN', '123456')
     * // -> set localStorage
     *
     * mu.storage('X-TOKEN')
     * // -> 123456 ::: get localStorage
     *
     * mu.storage()
     * // -> localStorage.clear()
     *
     * mu.storage( sessionStorage, 'X-TOKEN', '123456')
     * // -> set sessionStorage
     */
    mu.storage = function(/**[object]*/ storage, /**{string}*/ key, /**[any]*/ val){
        var args = _.args(arguments);

        _.run(_.type(storage, 'string'), function(){
            key = args[0];
            val = args[1];
            storage = window.localStorage;
        });

        storage = storage || window.localStorage;

        // 如果key不存在, 则认为是 Storage.clear();
        if(!key){
            var list = _.copy(storage);


            return {
                remove: function(key){
                    return storage.removeItem(key);
                },
                clear: function(){
                    return storage.clear();
                },

                list: function(){
                    return _.map(list, function(o, k){
                        return _.storage(storage, k);
                    });
                },

                keys: function(){
                    return _.keys(list);
                }
            };
        }

        return _.exist(val, function(){
            // Storage.setItem()
            storage.setItem(key, JSON.stringify(val).replace(/^\"(.*)\"$/, '$1'));
        }, function(){
            // Storage.getItem()
            var rst = storage.getItem(key);
            try {
                return JSON.parse(rst);
            } catch (e) {
                return rst || undefined;
            }
        });
    };


	mu.ready = function (handler) {

        var done = false,
            top = true,
            root = document.documentElement,
            modern = document.addEventListener,

            addHandler = modern ? 'addEventListener' : 'attachEvent',
            removeHandler = modern ? 'removeEventListener' : 'detachEvent',
            pre = modern ? '' : 'on',

            readyfn = function (e) {
                var type = e.type;

                // 保证页面加载过程中执行
                if (type === 'readystatechange' && document.readyState !== 'complete') {
                    return;
                }

                // 移除事件监听
                (type === 'load' ? window : document)[removeHandler](pre + type, readyfn, false);

                // 执行事件
                if (!done) {
                    done = true;
                    handler.call(null, type || e);
                }
            },

        // ie6-8 模拟DOMContentLoaded
            doScroll = function () {
                try {
                    root.doScroll('left');
                } catch (e) {
                    setTimeout(doScroll, 50);
                    return;
                }

                readyfn('poll');
            };

        if (document.readyState === 'complete') {
            handler.call(window, 'lazy');
        } else {
            if (!modern && root.doScroll) {

                try {
                    // 判断当前页面是否已经完全载入（有 iframe 的情况））
                    top = !window.frameElement;
                } catch (e) {

                }

                if (top) {
                    doScroll();
                }

            }

            document[addHandler](pre + 'DOMContentLoaded', readyfn, false);
            document[addHandler](pre + 'readystatechange', readyfn, false);
            window[addHandler](pre + 'load', readyfn, false);
        }

    };

/**
 * a (location)
 * 链接, 和链接相关的方法
 *
 * URI 说明图: https://www.sitepoint.com/url-parsing-isomorphic-javascript/
 */



    /**
     * mu.deepDecodeURIComponent(String str)
     * 将不知道多少倍的encode还原
     * @param str
     * @returns {{string}}
     */
    mu.deepDecodeURIComponent = function(/**{string}*/ str){
        _.each(str.split('%'), function(){
            str = decodeURIComponent(str);
        });

        return str;
    };

    /**
     * mu.param(Object obj[, String url, Function fn])
     * 将一个对象扁平化展示成一个GET方法的参数形式 (key=value&key=value)
     * @param obj
     * @param url: url 若存在, 则返回完整的URL路径
     * @param fn: 修正 params, (URL 必须先存在)
     * @returns {string}
     */
    mu.param = function(/**{object}*/ obj, /**[string]*/ url, /**[function]*/ fn){
        if(!_.isObject(obj)){
            return void 0;
        }

        var p = '';
        var params = _.flatWithBracket(obj);
        // 修正参数
        if(url){
            params = fn ? fn.call(null, params, url) : params;
        }
        _.each(params, function(v, k){
            v = mu.ifnvl(v, '') + '';
            p = mu.concat(p, '&', encodeURIComponent(k), '=', encodeURIComponent(v));
        });
        return p.replace(/^\&/, '');
    };

    /**
     * mu.param2Obj(String param)
     * 将URL参数转为对象
     * @param param
     * return obj
     */
    mu.param2Obj = function(/**{string}*/ param){
        var p = param.split('&');
        return mu.map(p, function(kv){
            var __kv__ = kv.split('=');
            return {
                '__key__': __kv__[0],
                '__val__': __kv__[1]
            };
        }, {});
    };

    /**
     * mu.parseURL([String url])
     * 分析URL的各部分组成部分
     * @param url || location.href
     * @returns {*}
     */
    mu.parseURL = function(/**[string]*/url){
        var l = window.location;
        url = url || l.href;
        var parser = document.createElement('a');
        parser.href = url;

        var URI = {
            // 完整的URL地址
            source: parser.href,
            // URL协议(不带:)
            protocol: parser.protocol || l.protocol,
            // 当前作用域
            host: parser.host,
            // 域名
            hostname: parser.hostname || l.hostname,
            // 端口名
            port: parser.port,
            // origin
            origin: l.origin,
            // 资源路径
            pathname: parser.pathname.replace(/^([^\/])/, '/$1'),
            // 资源文件路径
            path: parser.pathname.replace(/^(.*)?\/.*/, '$1'),
            // get 请求参数
            search: parser.search.replace(/^\?/,''),
            // get 请求参数对象
            query: {},
            // 锚点
            hash: parser.hash.replace(/^#/,''),
            // FTP 或其他协议的账号
            username: parser.username,
            // FTP 或其他协议的密码
            password: parser.password,
            // 文件后缀
            ext: null
        };

        // 查询对象
        URI.query = _.param2Obj(URI.search);

        // 文件后缀名
        URI.ext = mu.run(mu.last(URI.pathname.split('/')), function(item){
            var arr = item.split('.');
            if(arr.length > 1){
                return mu.last(arr);
            }else{
                return null;
            }
        });

        // 协议名
        URI.protocolname = URI.protocol.replace(/\:$/, '');

        /**
         * 基于JS的router信息
         */
        var router = {
            // router 地址
            router: URI.hash.split('?')[0],
            // router search
            routerSearch: URI.hash.split('?')[1],
            // router 参数
            routerQuery: {}
        };

        mu.run(router.routerSearch, function(routerSearch){
            router.routerQuery = _.param2Obj(routerSearch);
        });

        URI = _.extend(URI, router);

        /**
         * 按照参数重组URL
         * @param opts
         */
        URI.rebuild = function(opts){
            opts = mu.extend(true, URI, opts);

            mu.run(opts.query, function(query) {
                opts.search = _.param(query);
            });

            var routerSearch = _.run(opts.routerQuery, function(query) {
                return _.param(query);
            });

            routerSearch = routerSearch ? '?' + routerSearch : '';

            opts.hash = _.ifnvl(opts.router, opts.hash) + routerSearch;

            parser = _.extend(parser, opts);

            return parser.href;
        };

        /**
         * 通过回调函数重写URL部分参数
         * @param fn
         */
        URI.reform = function(fn){
            var opts = fn.call(null, URI);

            if(_.isEmptyObject(opts)){
                return console.error('回调函数必须返回对象');
            }

            return URI.rebuild(opts);
        };

        return URI;
    };

    /**
     * mu.rebuildURL
     * 重组一个链接
     * @param oldurl
     * @param opts
     * @returns {string}
     */
    mu.rebuildURL = function(/**{string}*/ oldurl, /**{object}*/ opts){
        return _.parseURL(oldurl).rebuild(opts);
    };



window.mu = mu;
})(window);
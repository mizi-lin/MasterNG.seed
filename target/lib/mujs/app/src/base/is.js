define(['./type'], function(mu, _) {

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




});
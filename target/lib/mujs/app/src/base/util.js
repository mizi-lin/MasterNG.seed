/**
 * 暗黑小工具
 */

define(function(mu) {

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

    return mu;
});




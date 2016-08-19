define(function(mu) {


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

    return mu;
});
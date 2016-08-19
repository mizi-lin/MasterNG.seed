/**
 * 迭代器
 */

define([], function(mu) {

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

    return mu;
});




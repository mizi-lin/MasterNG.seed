define(['./is'], function(mu, _) {

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

    return mu;
});
define(function(mu) {

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


    return mu;
});
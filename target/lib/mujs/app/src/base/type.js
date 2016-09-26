define(['./run'], function(mu, _) {

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

});



define(function(mu, _){

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




});
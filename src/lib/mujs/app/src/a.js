/**
 * a (location)
 * 链接, 和链接相关的方法
 *
 * URI 说明图: https://www.sitepoint.com/url-parsing-isomorphic-javascript/
 */

define(function(mu) {

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

});
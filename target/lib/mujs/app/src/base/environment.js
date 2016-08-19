define(function(mu) {
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

    return mu;
});
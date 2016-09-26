define(function(mu){
	mu.ready = function (handler) {

        var done = false,
            top = true,
            root = document.documentElement,
            modern = document.addEventListener,

            addHandler = modern ? 'addEventListener' : 'attachEvent',
            removeHandler = modern ? 'removeEventListener' : 'detachEvent',
            pre = modern ? '' : 'on',

            readyfn = function (e) {
                var type = e.type;

                // 保证页面加载过程中执行
                if (type === 'readystatechange' && document.readyState !== 'complete') {
                    return;
                }

                // 移除事件监听
                (type === 'load' ? window : document)[removeHandler](pre + type, readyfn, false);

                // 执行事件
                if (!done) {
                    done = true;
                    handler.call(null, type || e);
                }
            },

        // ie6-8 模拟DOMContentLoaded
            doScroll = function () {
                try {
                    root.doScroll('left');
                } catch (e) {
                    setTimeout(doScroll, 50);
                    return;
                }

                readyfn('poll');
            };

        if (document.readyState === 'complete') {
            handler.call(window, 'lazy');
        } else {
            if (!modern && root.doScroll) {

                try {
                    // 判断当前页面是否已经完全载入（有 iframe 的情况））
                    top = !window.frameElement;
                } catch (e) {

                }

                if (top) {
                    doScroll();
                }

            }

            document[addHandler](pre + 'DOMContentLoaded', readyfn, false);
            document[addHandler](pre + 'readystatechange', readyfn, false);
            window[addHandler](pre + 'load', readyfn, false);
        }

    };

    return mu;
});
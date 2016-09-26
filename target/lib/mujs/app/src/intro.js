/**
 * mu.js
 * 类似undestore的JS方法库
 *
 * PS: 基本上不考虑 IE6/7
 *
 */

//若要求道（ To follow the path:）
//看着大师（ look to the master,）
//追隨大师（ follow the master,）
//接近大师（ walk with the master,）
//看穿大师（ see through the master,）
//成为大师（ become the master.

(function(window, undefined) {
   // 'use strict';

    // 创建闭包全局
    var root = this;
    var mu, _;

    var arrPro = Array.prototype,
        objPro = Object.prototype,
        fnPro = Function.prototype;


    var slice = arrPro.slice,
        hasOwnProperty = objPro.hasOwnProperty;

    var REG = {
        CHINESE: /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/g,
        TRIM: /(^\s*)|(\s*$)/g,
        TRIM_LEFT: /(^\s*)/g,
        TRIM_RIGHT: /(\s*$)/g
    };

    var C = {
        REMOVE_MAP: '__remove_map__'
    };


    // 创建对象式的调用方式， 返回一个包装器
    // 包装器对象中包含所有的 mu 方法
    // mu 为一个函数对象，实例服从单例模式
    // 模拟 Underscore 的 _(obj)

    mu = _ = function(/**any*/ obj) {
        //如果参数为_对象，说明已经实例化过了，所以直接返回
        if(obj instanceof _) {
            return obj;
        }
        //如果实例化时没有使用new，那么在这里包装一下，使得this指向该实例
        if(!(this instanceof _)) {
            return new _(obj);
        }
        //将obj保存在内部属性__wrapped__中
        this.__wrapped__ = obj;
        //链式访问权限
        this.__chain__ = false;
    };

    mu.is = {};

    mu.verison = '1.7.9';


//})()




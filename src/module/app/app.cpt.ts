import {Component} from '@angular/core';
import {GLOBAL} from './../../common/global';

import tpl from './layout/abc.html';
import './layout/abc.scss';

console.debug(tpl);

/**
 * Component 元数据(matadata)
 *
 * selector    string    自定义组件的标签，用于匹配元素
 * inputs    string[]    指定组件的输入属性
 * outputs    string[]    指定组件的输出属性
 * host    {[key: string]: string;}    指定指令/组件的事件、动作和属性等
 * providers    any[]    指定该组件及其所有子组件（含 ContentChildren）可用的服务
 * exportAs    string    给指令分配一个变量，使得可以在模板中调用
 * moduleId    string    包含该组件模块的 id，它被用于解析模版和样式的相对路径
 * queries    {[key: string]: any;}    设置需要被注入到组件的查询
 * viewProviders    any[]    指定该组件及其所有子组件（不含 ContentChildren）可用的服务
 * changeDetection    ChangeDetectionStrategy    指定使用的变化检测策略
 * templateUrl    string    指定组件模板所在的路径
 * template    string    指定组件的内联模板
 * styleUrls    string[]    指定组件引用的样式文件
 * styles    string[]    指定组件使用的内联样式
 * animations    AnimationEntryMetadata[]
 * directives    Array    指定该组件需要依赖的其他指令，或组件
 * pipes    Array    指定该组件需要注入的管道
 * encapsulation    ViewEncapsulation    设置组件的视图包装选项
 * interpolation    [string, string]
 */

@Component({
    selector: 'app',
    template: `<div>ABCDE</div>`
})

export class AppCpt {
    constructor(private G: GLOBAL) {
    }
}

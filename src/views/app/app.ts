import {Component, trigger, style, transition, animate, state} from '@angular/core';
// import {$$NoteDirec} from '../common/directive/mNote.direc';
import {GLOBAL} from '../common/global';

declare var console: any, mu: any;

// import { Header } from '../layout';


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
    templateUrl: 'views/layout/layout.html',
    animations: [
        trigger('mnote', [
            state('hide', style({
                display: 'none'
            })),

            state('show', style({
                display: 'none'
            })),

            transition('hide => show', [
                animate('500ms 1500ms ease-in', style({
                    'background-color': 'rgba(18, 61, 64, .8)',
                    top: '-100px'
                }))
            ])
        ])
    ]
})

export class AppCpt {
    constructor(private G: GLOBAL) {
    }

}

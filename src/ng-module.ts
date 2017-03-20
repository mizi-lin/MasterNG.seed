import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GLOBAL} from './common/global';
import {FormsModule} from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {Router, RouterModule} from '@angular/router';

// import {AuthGuide} from './common/auth-guide';

import {$$ResourcePool} from './common/resource-pool';
import {$$Resource} from './common/resource';
import {$$HttpInterceptor} from './common/http-interceptor';
import {$$ROUTES} from './common/routes';

import {AppCpt} from './module/app/app.cpt';
import {$$CPT_FE} from './module/fe';


@NgModule({
    /**
     * declarations 声明
     * 声明本模块拥有的视图类: component 组件, directive 指令, pipe 管道
     *
     * RC.4 以前需要在每一个 component 中声明 directive 和 pipe ,
     * RC.5 以后只要在根模块中全局声明
     */
    declarations: [
        AppCpt,
        $$CPT_FE
    ],

    /**
     * exports 是 declarations 的子集
     * 它可作用于其他模块中的组件模板
     * 根模块不需要导出任何东西, 它只应用在特性模块中
     */
    // exports: [AppComponent],

    /**
     * imports 导出
     * 本模块组件中需要由其他模块导出的类
     */
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,

        // 系统自带 router
        RouterModule.forRoot($$ROUTES, {useHash: true})
    ],

    /**
     * providers 模块全局服务
     * 可以把部分服务加入到本模块的全局服务列表中
     */
    providers: [
        {
            provide: Http,
            useFactory: (xhrBackend: XHRBackend,
                         requestOptions: RequestOptions,
                         router: Router,
                         G: GLOBAL) => {
                return new $$HttpInterceptor(xhrBackend, requestOptions, G);
            },

            deps: [
                XHRBackend,
                RequestOptions,
                Router,
                GLOBAL
            ]
        },

        GLOBAL,
        // AuthGuide,
        $$Resource,
        $$ResourcePool
    ],

    /**
     * bootstrap 标明主视图 ( 根模块 )
     * 每一个应用只能有一个主视图, 即 只有根模块才能设置 bootstrap
     */
    bootstrap: [AppCpt]
})

/**
 * 根模块
 * 每个应用支持多模块(特性模块), but 一般小应用只有一个根模块
 */
export class AppModule {
}

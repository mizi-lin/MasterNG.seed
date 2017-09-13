import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {InitializeService} from './common/initialize.service';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {InitializeFactory} from './common/initialize.factory';

import {MasterNgModule} from 'masterng';
import {MnI18nServices} from 'masterng/mn-i18n/mn-i18n.services';
import {MnRuleServices} from 'masterng/mn-rule/mn-rule.services';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import {HelloWorldComponent} from './index/hello-world/hello-world.component';
import {BaseRoutes} from './common/base.route';
import * as mu from 'mzmu';
import {BaseServices} from './common/base.services';
import {CanActiveRoute} from './common/can-active.route';

@NgModule({
    declarations: [
        AppComponent,
        HelloWorldComponent
    ],
    imports: [
        BrowserModule,
        NgZorroAntdModule.forRoot(),
        RouterModule.forRoot(BaseRoutes, {useHash: true}),
        MasterNgModule.forRoot()
    ],
    providers: [
        BaseServices,
        InitializeService,
        {
            provide: APP_INITIALIZER,
            // 这里不要用匿名函数, webpack 会报错
            useFactory: InitializeFactory,
            deps: [
                InitializeService,
                MnI18nServices,
                MnRuleServices
            ],
            multi: true
        },
        CanActiveRoute
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

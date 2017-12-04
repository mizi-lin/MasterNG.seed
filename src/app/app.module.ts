import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BeComponent} from './be/be.component';
import {DashboardComponent} from './be/dashboard/dashboard.component';
import {FeComponent} from './fe/fe.component';
import {IndexComponent} from './fe/index/index.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HeatWidgetComponent} from './common/widgets/heat-widget/heat-widget.component';
import {RouterModule} from '@angular/router';
import {BaseRoutes} from './common/base.routes';
import {BaseServices} from './common/base.services';
import {CanActiveRoute} from './common/can-active.route';
import {InitializeService} from './common/initialize.service';
import {InitializeFactory} from './common/initialize.factory';
import {BaseResources} from './common/base.resources';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {MasterNgModule} from 'masterng';
import {MnCommonServices} from 'masterng/mn-common/services/mn-common.services';

const COMPONENTS = [
    FeComponent,
    IndexComponent,
    BeComponent,
    DashboardComponent
];
//
const WIDGETS = [
    HeatWidgetComponent
];
//
const PIPES = [];

@NgModule({
    declarations: [
        AppComponent,
        ...WIDGETS,
        ...PIPES,
        ...COMPONENTS
    ],
    imports: [
        // ng module
        CommonModule,
        FormsModule,
        BrowserModule,
        RouterModule.forRoot(BaseRoutes, {useHash: true}),
        // // third party module

        NgZorroAntdModule.forRoot(),
        // // self module

        MasterNgModule.forRoot()

    ],
    providers: [
        BaseServices,
        BaseResources,
        CanActiveRoute,
        InitializeService,

        {
            provide: APP_INITIALIZER,
            // 这里不要用匿名函数, webpack 会报错
            useFactory: InitializeFactory,
            deps: [
                InitializeService,
                BaseResources,
                MnCommonServices
            ],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {InitializeService} from './common/initialize.service';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {InitializeFactory} from './common/initialize.factory';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HeatWidgetComponent} from './common/widgets/heat-widget/heat-widget.component';
import {MasterNgModule} from 'masterng';
import {MnI18nServices} from 'masterng/mn-i18n/mn-i18n.services';
import {MnRuleServices} from 'masterng/mn-rule/mn-rule.services';
import {MnReqService} from 'masterng/mn-req/mn-req.service';
import {MnEchartsService} from 'masterng/mn-echarts/mn-echarts.service';
import {DateRangePickerModule} from 'mizi-ngx-daterangepicker';
import {TreeviewModule} from 'mizi-ngx-treeview';
import {MonthPickerModule} from 'ngx-month-picker';
import {BaseRoutes} from './common/base.routes';
import {BaseResources} from './common/base.resources';
import {BeComponent} from './be/be.component';
import {DashboardComponent} from './be/dashboard/dashboard.component';
import {FeComponent} from './fe/fe.component';
import {IndexComponent} from './fe/index/index.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CanActiveRoute} from './common/can-active.route';
import {BaseServices} from './common/base.services';

const COMPONENTS = [
    FeComponent,
    IndexComponent,
    BeComponent,
    DashboardComponent
];

const WIDGETS = [
    HeatWidgetComponent
];

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
        // third party module
        NgZorroAntdModule.forRoot(),
        // self module
        MasterNgModule.forRoot(),
        DateRangePickerModule.forRoot(),
        TreeviewModule.forRoot(),
        MonthPickerModule.forRoot()

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
                MnI18nServices,
                MnRuleServices,
                MnReqService,
                BaseResources,
                MnEchartsService
            ],
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

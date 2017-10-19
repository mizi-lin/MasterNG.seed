import {AppComponent} from './app.component';
import {DemoPanelComponent} from './demo-panel/demo-panel.component';
import {DemoReqComponent} from './demo-req/demo-req.component';
import {DemoEchartsComponent} from './demo-echarts/demo-echarts.component';
import {DemoI18nComponent} from './demo-i18n/demo-i18n.component';
import {DemoRuleComponent} from './demo-rule/demo-rule.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ResourcePool} from './demo-req/resource-pool';
import {InitializeService} from './common/initialize.service';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {InitializeFactory} from './common/initialize.factory';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {DemoMcComponent} from './demo-mc/demo-mc.component';
import {HeatWidgetComponent} from './common/widgets/heat-widget/heat-widget.component';
import {DemoEchart2Component} from './demo-echart2/demo-echart2.component';
import {MasterNgModule} from 'masterng';
import {MnI18nServices} from 'masterng/mn-i18n/mn-i18n.services';
import {MnRuleServices} from 'masterng/mn-rule/mn-rule.services';
import {MnReqService} from 'masterng/mn-req/mn-req.service';
import {MnEchartsService} from 'masterng/mn-echarts/mn-echarts.service';
import {DateRangePickerModule} from 'mizi-ngx-daterangepicker';
import {TreeviewModule} from 'mizi-ngx-treeview';
import {MonthPickerModule} from 'ngx-month-picker';

@NgModule({
    declarations: [
        AppComponent,
        DemoPanelComponent,
        DemoReqComponent,
        DemoEchartsComponent,
        DemoI18nComponent,
        DemoRuleComponent,
        DemoMcComponent,
        HeatWidgetComponent,
        DemoEchart2Component
    ],
    imports: [
        BrowserModule,
        NgZorroAntdModule.forRoot(),

        RouterModule.forRoot([
            {
                path: 'panel',
                component: DemoPanelComponent
            },
            {
                path: 'req',
                component: DemoReqComponent
            },
            {
                path: 'echarts',
                component: DemoEchartsComponent
            },

            {
                path: 'echarts2',
                component: DemoEchart2Component
            },

            {
                path: 'i18n',
                component: DemoI18nComponent
            },

            {
                path: 'rule',
                component: DemoRuleComponent
            },

            {
                path: 'mc',
                component: DemoMcComponent
            }
        ], {useHash: true}),

        MasterNgModule.forRoot(),

        NgZorroAntdModule.forRoot(),
        DateRangePickerModule.forRoot(),
        TreeviewModule.forRoot(),
        MonthPickerModule.forRoot()

    ],
    providers: [
        ResourcePool,
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
                ResourcePool,
                MnEchartsService
            ],
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

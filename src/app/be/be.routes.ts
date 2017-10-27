import {Routes} from '@angular/router';
import {BeComponent} from './be.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CanActiveRoute} from '../common/can-active.route';

export const BeRoutes: Routes = [
    {
        path: '-',
        component: BeComponent,
        // 路由守卫，判断用户是否登陆
        canActivate: [CanActiveRoute],
        children: [
            {
                // ng g c be/dashboard
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [CanActiveRoute]
            }
        ]
    }

];

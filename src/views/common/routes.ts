import {Routes} from '@angular/router';
import {$$ROUTES_FE} from '../fe/router';
import {$$ROUTES_TENANT} from '../tenant/tenant.route';
import {$$ROUTE_AGENT} from '../agent/router';
import {$$ROUTES_ADMIN} from '../admin/admin-route';

export const $$ROUTES: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    ...$$ROUTES_FE,
    ...$$ROUTES_TENANT,
    ...$$ROUTE_AGENT,
    ...$$ROUTES_ADMIN
];






// export const ROUTER_PROVIDERS = [
//     provideRouter(routes),
//     AuthGuide,
//     {
//         provide: PLATFORM_DIRECTIVES, useValue: ROUTER_DIRECTIVES, multi: true
//     }
// ];

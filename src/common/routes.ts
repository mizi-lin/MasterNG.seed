import {Routes} from '@angular/router';
import {$$ROUTER_FE} from '../module/fe/fe.router';

export const $$ROUTES: Routes = [
    {
        path: '', redirectTo: '/!/index', pathMatch: 'full'
    },

    ...$$ROUTER_FE
];

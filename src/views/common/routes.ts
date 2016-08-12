import {PLATFORM_DIRECTIVES} from '@angular/core';
import {provideRouter, ROUTER_DIRECTIVES, RouterConfig}  from '@angular/router';

import {AuthGuide} from './auth-guide';

import {feRouter} from '../fe/router';
import {agentRouter} from '../agent/router';
import {tenantRouter} from '../tenant/tenant.route';
import {adminRouter} from '../admin/admin-route';

export const routes: RouterConfig = [
    ...feRouter,
    ...agentRouter,
    ...tenantRouter,
    ...adminRouter
];

export const ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthGuide,
    {
        provide: PLATFORM_DIRECTIVES,
        useValue: ROUTER_DIRECTIVES,
        multi: true
    }
];

import {RouterConfig} from '@angular/router';

import {TenantLayoutCpt, TenantsCpt} from './';


export const tenantRouter: RouterConfig = [
    {path: 'tenants', component: TenantLayoutCpt, children: [
        {path: '', component: TenantsCpt}
    ]}
];


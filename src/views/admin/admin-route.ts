import {RouterConfig} from '@angular/router';

import {AdminLayoutCpt, AdminsCpt, AdminCreateCpt, AdminUpdateCpt, AdminDetailCpt} from './';
import {AuthGuide} from '../common/auth-guide';
import {AdminModifyPwdCpt} from './admin-modifypwd';

export const adminDetailRouter: RouterConfig = [ {
        path: ':adminId', component: AdminDetailCpt, canActivate: [AuthGuide], children: [
            {path: '', component: AdminUpdateCpt, canActivate: [AuthGuide]},
            {path: 'modifypwd', component: AdminModifyPwdCpt, canActivate: [AuthGuide]}
        ]
    }
];

export const adminRouter: RouterConfig = [{
        path: 'admins', component: AdminLayoutCpt, canActivate: [AuthGuide], children: [
            {path: '', component: AdminsCpt, canActivate: [AuthGuide]},
            {path: 'create', component: AdminCreateCpt, canActivate: [AuthGuide]},
            ...adminDetailRouter
        ]
    }
];


import {Routes} from '@angular/router';

import {AdminLayoutCpt, AdminsCpt, AdminCreateCpt, AdminUpdateCpt, AdminDetailCpt} from './';
import {AuthGuide} from '../common/auth-guide';
import {AdminModifyPwdCpt} from './admin-modifypwd.cpt';

export const $$ROUTES_ADMIN_DETAIL: Routes = [ {
        path: ':adminId', component: AdminDetailCpt, canActivate: [AuthGuide], children: [
            {path: '', component: AdminUpdateCpt, canActivate: [AuthGuide]},
            {path: 'current', component: AdminUpdateCpt, canActivate: [AuthGuide]},
            {path: 'modifypwd', component: AdminModifyPwdCpt, canActivate: [AuthGuide]}
        ]
    }
];

export const $$ROUTES_ADMIN: Routes = [{
        path: 'admins', component: AdminLayoutCpt, canActivate: [AuthGuide], children: [
            {path: '', component: AdminsCpt, canActivate: [AuthGuide]},
            {path: 'create', component: AdminCreateCpt, canActivate: [AuthGuide]},
            ...$$ROUTES_ADMIN_DETAIL
        ]
    }
];


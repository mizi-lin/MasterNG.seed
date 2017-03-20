import {Routes} from '@angular/router';
import {IndexCpt} from './index/index.cpt';
import {FeCpt} from '../app/layout/fe/fe.cpt';


export const $$ROUTER_FE: Routes = [
    {
        path: '!',
        component: FeCpt,

        children: [
            {
                path: 'index',
                component: IndexCpt
            }
        ]
    },

];

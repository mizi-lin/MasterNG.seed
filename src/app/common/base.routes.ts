import {Routes} from '@angular/router';
import {BaseConst} from './base.const';
import {FeRoutes} from '../fe/fe.routes';
import {BeRoutes} from '../be/be.routes';


export const BaseRoutes: Routes = [
    {
        path: '',
        redirectTo: BaseConst.BE_INDEX_PAGE,
        pathMatch: 'full'
    },

    ...FeRoutes,
    ...BeRoutes
];

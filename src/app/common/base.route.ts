import {Routes} from '@angular/router';
import {BaseConst} from './base.const';
import {IndexRoutes} from '../index/index.route';

export const BaseRoutes: Routes = [
    {
        path: '', redirectTo: BaseConst.INDEX_PAGE, pathMatch: 'full'
    },

    ...IndexRoutes

];

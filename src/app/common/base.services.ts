import {Injectable, Injector} from '@angular/core';
import {BaseResources} from './base.resources';
import {BaseConst} from './base.const';
import {Router} from '@angular/router';

declare const mu: any;

@Injectable()
export class BaseServices {

    constructor(private _br: BaseResources,
                private _injector: Injector) {
    }

    logout(): void {
        mu.storage(BaseConst.STORAGE_TOKEN, '');
        setTimeout(() => {
            const router = this._injector.get(Router);
            router.navigate([BaseConst.INDEX_PAGE]);
        }, 0);
    }
}

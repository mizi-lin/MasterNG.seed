import {Injectable, Injector} from '@angular/core';
import {MnRuleServices} from 'masterng/mn-rule/mn-rule.services';
import {BaseResources} from './base.resources';
import {BaseConst} from './base.const';
import {Router} from '@angular/router';
import {MnReqService} from 'masterng/mn-req/mn-req.service';

declare const mu: any;

@Injectable()
export class BaseServices {

    constructor(private _rs: MnRuleServices,
                private _mrs: MnReqService,
                private _br: BaseResources,
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

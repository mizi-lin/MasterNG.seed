import {Injectable} from '@angular/core';
import {MnResource} from 'masterng/mn-req/mn-resource';

@Injectable()
export class BaseResources {

    constructor(private _mr: MnResource) {
    }

    bht: any = this._mr.pool('/services/bht');

    login: any = this._mr.pool('/services/login/wukong');

    current: any = this._mr.pool('/services/user');

    query: any = this._mr.pool('/services/social/query');

    select: any = this._mr.pool('/services/select');

    combinedSelect: any = this._mr.pool('/services/combinedSelect');

    select_handle: any = this._mr.pool('/services/select-handle');

    miziselect: any = this._mr.pool('/services/miziselect');
}


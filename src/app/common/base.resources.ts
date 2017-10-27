import {Injectable} from '@angular/core';
import {MnResource} from 'masterng/mn-req/mn-resource';

@Injectable()
export class BaseResources {

    constructor(private _mr: MnResource) {
    }

    login: any = this._mr.pool('./assets/store/login.json');
}


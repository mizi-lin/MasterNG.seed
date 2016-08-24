import {Injectable} from '@angular/core';
import {GLOBAL} from '../common/global';

declare var mu: any, console: any;

@Injectable()
export class TenantServ {

    constructor(private G: GLOBAL) {
    }

}

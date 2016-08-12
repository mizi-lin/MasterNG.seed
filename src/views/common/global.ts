import {Injectable} from '@angular/core';
import {Admin} from '../admin/admin.model';

declare var mu: any, console: any;

@Injectable()
export class GLOBAL {
    current: Admin;

    isAdmin: boolean;

    constructor() {
        console.debug('oOOooOOooOOoo -- 1');
        mu.run(mu.storage('CURRENT'), (admin)=> {
            this.current = admin;
        });
    }

    /**
     * 设置当前登录用户信息
     * @param current
     */
    setCurrent(current: any): void {
        this.isAdmin = !current.agencyId;
        this.current = current;
    }
}
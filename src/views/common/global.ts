import {Injectable} from '@angular/core';
import {Admin} from '../admin/admin.model';

declare var mu: any, console: any;

@Injectable()
export class GLOBAL {
    current: Admin;

    isAdmin: boolean;

    constructor() {
        mu.run(mu.storage('CURRENT'), (admin) => {
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

    /**
     * 保存表单统一处理
     */
    save(form: any, vm: any, fn: any): boolean {
        if (form.valid) {
            fn.call(vm, form, fn);
            return true;
        }

        return false;
    }
}

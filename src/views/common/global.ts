import {Injectable} from '@angular/core';
import {Admin} from '../admin/admin.model';
import {CONST} from './const';
import {ActivatedRoute} from '@angular/router';

declare var mu: any, console: any, ENV_CONST: any;

@Injectable()
export class GLOBAL {
    // 当前用户信息
    current: Admin;

    // 判断用户是否管理员
    isAdmin: boolean;

    ENV_CONST: any = ENV_CONST;

    /**
     * http status 状态
     * @type {number}
     *
     * 0 初始
     * 401 无权限
     * 500 错误 或 API 调用错误
     * 404 无接口
     */
    httpStatus: number = 0;

    httpError: any = {};

    constructor(private route: ActivatedRoute) {
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
        mu.storage(CONST.CURRENT, current);
    }

    /**
     * 清楚用户登录信息
     */
    clearCurrent(): void {
        this.isAdmin = null;
        this.current = null;
        mu.storage(CONST.HEADER_TOKEN, '');
        mu.storage(CONST.CURRENT, '');
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

    stateParams(route: ActivatedRoute, params: any = null): any {
        params = params || {};

        if (!route) {
            return params;
        }

        params = mu.extend(params, route.snapshot.params || {});

        return this.stateParams(route.parent, params);
    }
}

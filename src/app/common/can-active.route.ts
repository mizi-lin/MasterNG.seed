import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {BaseConst} from './base.const';
import {BaseServices} from './base.services';

declare const mu: any;

@Injectable()
export class CanActiveRoute implements CanActivate {

    constructor(private _router: Router,
                private _bs: BaseServices) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        /**
         * token，标明是否为登录状态，
         * 用于区分页面是否在登录状态显示
         */
        const token = mu.storage(BaseConst.STORAGE_TOKEN);

        /**
         * module, 该路由的模块路径
         * 匹配该路由的权限规则
         * -
         * 每一个module匹配唯一的路由地址
         */
        const module = mu.prop(route, 'data.module');
        const must_token = mu.prop(route, 'data.token');

        /**
         * 避免路由配置错误以及其他问题，路由不断跳转，造成浏览器假死
         *
         * 原理：因为当前状态无法获得用户目标路由，所以以访问canActive为一个基准
         * 野蛮暴力的认为连续访问50次（每次间隔500ms）为重复访问
         */
        const repeat_jump = mu.run(() => {
            const nower = +new Date();
            const storage_router = 'STORAGE_ROUTER';

            let [timer, counter] = (mu.storage(storage_router) || [
                0,
                0
            ]);
            if (counter > 50) {
                mu.storage(storage_router, [
                    nower,
                    0
                ]);
                return true;
            } else {
                counter = nower - timer > 500 ? 1 : counter + 1;
                mu.storage(storage_router, [
                    nower,
                    counter
                ]);
                return false;
            }
        });

        if (repeat_jump) {
            new TypeError(`Route repeat jump~`);
            return false;
        }

        /**
         * auth (权限) && token (登录状态)
         * auth > token
         */

        return mu.run(mu.ifnvl(this._bs.auth_rules[module], BaseConst.DEFAULT_RULE), (rule) => {
            if (rule) {
                if (must_token) {
                    if (token) {
                        return true;
                    } else {
                        this._router.navigate([BaseConst.INDEX_PAGE]);
                        return false;
                    }
                }

                return true;
            } else {
                return false;
            }
        });
    }
}

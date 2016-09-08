import {$$Resource} from './resource';
import {Injectable} from '@angular/core';

@Injectable()
export class $$ResourcePool {

    constructor(private R: $$Resource) {
    }

    /**
     * 代理渠道 Agency
     */

        // 代理
    agencies: any = this.R.$$('/services/boss/agency/{agencyId}');

    // 代理下的会员
    agencies_members: any = this.R.$$('/services/boss/agency/{agencyId}/admin');

    /**
     * 租户 Tenant
     * @type {any}
     */
    tenants: any = this.R.$$('/services/boss/tenant/{tenantId}');

    // 租户下的用户
    tenants_users: any = this.R.$$('/services/boss/tenant/{tenantId}/user/{userId}');

    // 租户下的用户模拟登陆
    tenants_user_simulators: any = this.R.$$('/services/boss/tenant/{tenantId}/user/{userId}/simulator');

    // 租户下的活动
    tenants_activities: any = this.R.$$('/services/boss/tenant/{tenantId}/activity/{activityId}');


    /**
     * 管理员 Admin
     */

        // 管理员列表
    admins: any = this.R.$$('/services/boss/admin/{adminId}');

    // 当前用户信息
    current: any = this.R.$$('/services/boss/admin/current');

    // 登录
    login: any = this.R.$$('/services/admin/login');

}

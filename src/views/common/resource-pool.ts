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

    // 代理 -> 状态
    agencies_activeness: any = this.R.$$('/services/boss/agency/{agencyId}/activeness');


    // 代理下的会员
    agencies_members: any = this.R.$$('/services/boss/agency/{agencyId}/admin');



    /**
     * 租户 Tenant
     * @type {any}
     */
    tenants: any = this.R.$$('/services/boss/tenant/{tenantId}');

    // 租户下的用户
    tenants_users: any = this.R.$$('/services/boss/tenant/{tenantId}/user/{userId}');

    // 租户下的活动
    tenants_activities: any = this.R.$$('/services/boss/tenant/{tenantId}/activity/{activityId}');

    // 租户下的会员状态
    tenants_activeness: any = this.R.$$('/services/boss/tenant/{tenantId}/activeness');


    /**
     * User
     */

        // User状态
    users_activeness: any = this.R.$$('/services/boss/user/{userId}/activeness');


    /**
     * 管理员 Admin
     */

        // 管理员列表
    admins: any = this.R.$$('/services/boss/admin/{adminId}');

    // 代理下的会员状态
    admins_activeness: any = this.R.$$('/services/boss/admin/{adminId}/activeness');

    // 当前用户信息
    current: any = this.R.$$('/services/boss/admin/current');

    // 登录
    login: any = this.R.$$('/services/admin/login');

}

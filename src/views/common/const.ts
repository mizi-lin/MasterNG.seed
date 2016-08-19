export const HEADER_TOKEN = 'X-ACCESS-TOKEN-BOSS';

export const CONFIG = {
    HEADER_TOKEN: 'X-ACCESS-TOKEN-BOSS',
    BE_INDEX_PAGE: '/tenants'
};

export const API = {

    /**
     * Agency
     * 代理
     */

    // 代理
    AGENCY: '/services/boss/agency/{agencyId}',

    // 代理下的用户
    AGENCY_ADMIN: '/services/boss/agency/{agencyId}/admin',

    // 代理下的租户
    AGENCY_TENANTS: '/services/boss/agency/{agencyId}/tenant/{tenantId}',

    /**
     * tenants
     * 租户
     */

    // 租户
    TENANTS: '/services/boss/tenant/{tenantId}',

    // 租户下的用户
    TENANTS_USER: '/services/boss/tenant/{tenantId}/user/{userId}',

    // 租户下的用户模拟登陆
    TENANTS_USER_SIMULATOR: '/services/boss/tenant/{tenantId}/user/{userId}/simulator',

    // 租户下的活动
    TENANTS_ACTIVITY: '/services/boss/tenant/{tenantId}/activity/{activityId}',


    /**
     * Admin
     * 管理员
     */

    // 管理员
    ADMINS: '/services/boss/admin/{adminId}'

};

export const DICT = {

    ROOT: {
        '0': '普通用户',
        '1': '管理员用户'
    },

    STATUS: {
        ACTIVITY: {
            '0': '未发布',
            '1': '待审核',
            '2': '已发布',
            '3': '暂停',
            '4': '已过期',
            '-1': '已删除'
        }
    }

};

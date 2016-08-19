"use strict";
exports.HEADER_TOKEN = 'X-ACCESS-TOKEN-BOSS';
exports.CONFIG = {
    HEADER_TOKEN: 'X-ACCESS-TOKEN-BOSS',
    BE_INDEX_PAGE: '/tenants'
};
exports.API = {
    AGENCY: '/services/boss/agency/{agencyId}',
    AGENCY_ADMIN: '/services/boss/agency/{agencyId}/admin',
    AGENCY_TENANTS: '/services/boss/agency/{agencyId}/tenant/{tenantId}',
    TENANTS: '/services/boss/tenant/{tenantId}',
    TENANTS_USER: '/services/boss/tenant/{tenantId}/user/{userId}',
    TENANTS_USER_SIMULATOR: '/services/boss/tenant/{tenantId}/user/{userId}/simulator',
    TENANTS_ACTIVITY: '/services/boss/tenant/{tenantId}/activity/{activityId}',
    ADMINS: '/services/boss/admin/{adminId}'
};
exports.DICT = {
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
//# sourceMappingURL=const.js.map
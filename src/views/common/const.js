"use strict";
exports.CONST = {
    HEADER_TOKEN: 'X-ACCESS-TOKEN-BOSS',
    BE_INDEX_PAGE: '/tenants',
    CURRENT: 'CURRENT',
    REGX: {
        EMAIL: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    }
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
        },
        TENANT: {
            '0': '禁用',
            '1': '正常'
        },
        USER_AUTHORISE: {
            '0': '未授权',
            '1': '已授权'
        }
    }
};
//# sourceMappingURL=const.js.map
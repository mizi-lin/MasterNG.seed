export const CONST = {
    // header token key
    HEADER_TOKEN: 'X-ACCESS-TOKEN-BOSS',

    // 用户登陆后, 默认跳转首页
    BE_INDEX_PAGE: '/tenants',

    // current key
    CURRENT: 'CURRENT',

    // 正则
    REGX: {
        EMAIL: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    }
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


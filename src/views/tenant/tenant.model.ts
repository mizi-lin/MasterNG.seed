export class Tenant {

    tenantId: number;

    // 租户名称
    tenantName: string;

    // 租户公司名称
    companyName: string;

    // 租户余额
    balance: number;

    // 授信额度
    credit: number;

    // logo(非必填)
    logo: string;

    // 所属代理id(只读)
    agencyId: number;

    // 创建者id(只读)
    adminId: number;

    // 所属代理名称(只读)
    agencyName: string;

    // 创建者名称(只读)
    adminName: string;

    // 拥有活动数(只读)
    activityNum: number;

    // 创建时间戳
    createTime: number;

    // 最近更新时间戳
    updateTime: number;

    // 状态
    status: number;

    __primary__: string;

    constructor() {
    }
}

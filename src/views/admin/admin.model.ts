export class Admin {
    // 管理员ID
    adminId: number;

    // 所属代理ID
    agencyId: number;

    // 管理员名称
    name: string;

    email: string;

    password: string;

    oldPassword: string;

    // 管理员token
    token: string;

    // 所属代理名称
    agencyName: string;

    // 是否禁用
    status: number;

    // 所属代理公司名称
    companyName: string;

    // 创建时间
    createTime: number;

    __password__: any;

    __primary__: string = 'adminId';

    constructor() {
    }

}

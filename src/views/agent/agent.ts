/**
 *
 */

// export class Agent {
//     agencyId: number;
//     name: string;
//     companyName: string;
//     totalBalance: number;
//     tenantNum: number;
//     creditPerTenant: number;
// }

export class Agent {
    // agencyId: number;
    // name: string;
    // companyName: string;
    // totalBalance: number;
    // tenantNum: number;
    // creditPerTenant: number;

    __primary__: string;

    constructor(
        public agencyId?: number,
        public name?: string,
        public companyName?: string,
        public status?: number,
        public totalBalance?: number,
        public tenantNum?: number,
        public creditPerTenant?: number
    ) {  }
}

// export class  Agents [Agent...]

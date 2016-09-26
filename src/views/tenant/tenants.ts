import {Component, OnInit} from '@angular/core';
import {TenantServ} from './tenant.serv';
import {Tenant} from './tenant.model';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

declare var mu: any, console: any;

@Component({
    selector: 'page.tenants',
    templateUrl: 'views/tenant/tenants.html',
    providers: [TenantServ]
})

export class TenantsCpt implements OnInit {
    tenants: Tenant[];

    constructor(private ts: TenantServ,
                private $$: $$ResourcePool,
                private G: GLOBAL) {
    }

    activeness(tenant: Tenant): void {
        tenant.status =  tenant.status ? 0 : 1;
        this.$$.tenants_activeness.patch({
            tenantId: tenant.tenantId
        }, {
            status: tenant.status
        }).subscribe((rst) => {
            tenant = mu.extend(tenant, rst.data);
        });
    }

    ngOnInit(): void {
        this.$$.tenants.get().subscribe((res) => this.tenants = res.data);
    }

}

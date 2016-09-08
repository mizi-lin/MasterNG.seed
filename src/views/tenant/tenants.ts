import {Component, OnInit} from '@angular/core';
import {TenantServ} from './tenant.serv';
import {Tenant} from './tenant.model';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

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

    ngOnInit(): void {
        this.$$.tenants.get().subscribe((res) => this.tenants = res.data);
    }

}

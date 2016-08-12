import {Component, OnInit} from '@angular/core';
import {TenantServ} from './tenant.serv';
import {Tenant} from './tenant.model';
import {GLOBAL} from '../common/global';

@Component({
    selector: 'page.tenants',
    templateUrl: 'views/tenant/tenants.html',
    providers: [TenantServ]
})

export class TenantsCpt implements OnInit {
    tenants: Tenant[];
    constructor(private ts: TenantServ, private G: GLOBAL){ }
    ngOnInit() {
        this.ts.getTenant().subscribe((res)=> this.tenants = res.data);
    }

}

import {Component, OnInit, OnDestroy} from '@angular/core';
import {Tenant} from './tenant.model';
import {TenantServ} from './tenant.serv';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

declare var mu: any, console: any;

@Component({
    selector: 'tenant-form',
    templateUrl: 'views/tenant/tenant-form.html'
})

export class TenantUpdateCpt implements OnInit, OnDestroy {

    fm: Tenant = new Tenant();
    sub: any;
    tenantId: number;

    constructor(private ts: TenantServ,
                private route: ActivatedRoute,
                private router: Router,
                private $$: $$ResourcePool,
                private G: GLOBAL) {
    }

    save(form: any): void {
        this.G.save(form, this, (form) => {
            this.fm.__primary__ = 'tenantId';
            this.$$.tenants.save(this.fm).subscribe((res) => {
                if (!this.tenantId) {
                    this.router.navigate(['/tenants']);
                }
            });
        });
    }

    ngOnInit(): void {
        let tenantId: number = +this.route.snapshot.params['tenantId'];
        if (tenantId) {
            this.tenantId = tenantId;
            this.sub = this.$$.tenants.get({
                tenantId: tenantId
            }).subscribe((res) => {
                this.fm = res.data;
            });

        }
    }

    ngOnDestroy(): void {
        this.sub && this.sub.unsubscribe();
    }
}

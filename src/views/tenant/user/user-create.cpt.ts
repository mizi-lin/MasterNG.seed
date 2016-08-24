import {Component, OnInit} from '@angular/core';
import {DICT} from '../../common/const';
import {TenantServ} from '../tenant.serv';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../../common/global';
import {ResourcePool} from '../../common/resource-pool';
import {M_VALIDATION} from '../../common/directive/validation/index';

declare var mu: any, console: any;

@Component({
    selector: 'page.tenant-user-create.dlg.small',
    templateUrl: 'views/tenant/user/user-form.html',
    directives: [M_VALIDATION]
})

export class TenantUserCreateCpt implements OnInit {

    roots: any;

    fm: any = {};

    tenantId: number;

    vm: any;

    constructor(private G: GLOBAL,
                private ts: TenantServ,
                private $$: ResourcePool,
                private route: ActivatedRoute,
                private router: Router) {
        this.vm = this;
    }

    ngOnInit(): void {
        this.roots = mu.map(DICT.ROOT, (v, k) => {
            return {
                val: +k,
                title: v
            };
        }, []);

        this.tenantId = +this.router.routerState.parent(this.route).snapshot.params['tenantId'];
    }

    save(form: any): void {
        this.G.save(form, this, (form) => {
            this.fm.tenantId = this.tenantId;
            this.fm.__primary__ = 'userId';
            this.$$.tenants_users.save(this.fm).subscribe(() => {
                this.router.navigate([
                    '/tenants',
                    this.tenantId,
                    'users'
                ]);
            });
        });
    }

}

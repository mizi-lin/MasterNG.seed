import {Component, OnInit} from '@angular/core';
import {DICT} from '../../common/const';
import {TenantServ} from '../tenant.serv';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../../common/global';

declare var mu: any, console: any;

@Component({
    selector: 'page.tenant-user-create.dlg.small', templateUrl: 'views/tenant/user/user-form.html'
})

export class TenantUserCreateCpt implements OnInit {

    roots: any;

    fm: any = {};

    tenantId: number;

    constructor(private G: GLOBAL, private ts: TenantServ, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.roots = mu.map(DICT.ROOT, (v, k) => {
            return {
                val: +k, title: v
            };
        }, []);

        this.tenantId = +this.router.routerState.parent(this.route).snapshot.params['tenantId'];
    }

    save(form: any): void {
        this.G.save(form, this, (form) => {
            this.fm.tenantId = this.tenantId;
            this.ts.saveTenantUser(this.fm).subscribe(() => {
                this.router.navigate(['/tenants', this.tenantId, 'users']);
            });
        });
    }

}

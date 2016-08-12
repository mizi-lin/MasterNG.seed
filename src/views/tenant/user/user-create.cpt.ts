import {Component, OnInit} from '@angular/core';
import {DICT} from '../../common/const';
import {TenantServ} from '../tenant.serv';
import {ActivatedRoute, Router} from '@angular/router';

declare var mu: any, console: any;

@Component({
    selector: 'page.tenant-create',
    templateUrl: 'views/tenant/user/user-form.html'
})

export class TenantUserCreateCpt implements OnInit {

    roots: any;

    fm: any = {};

    tenantId: number;

    constructor(private ts: TenantServ, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.roots = mu.map(DICT.ROOT, (v, k)=> {
            return {
                val: +k,
                title: v
            };
        }, []);

        this.tenantId = +this.router.routerState.parent(this.route).snapshot.params['tenantId'];
    }

    save(): void {
        this.fm.tenantId = this.tenantId;
        this.ts.saveTenantUser(this.fm).subscribe();
    }

}

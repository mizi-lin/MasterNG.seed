import {Component, OnInit, OnDestroy} from '@angular/core';
import {Tenant} from './tenant.model';
import {TenantServ} from './tenant.serv';
import {ActivatedRoute, Router} from '@angular/router';

declare var mu: any, console: any;

@Component({
    selector: 'tenant-form',
    templateUrl: 'views/tenant/tenant-form.html'
})

export class TenantUpdateCpt implements OnInit, OnDestroy {

    fm: Tenant = new Tenant();
    sub: any;

    constructor(private ts: TenantServ, private route: ActivatedRoute, private router: Router) {
    }

    save(myform: any) {
        this.ts.saveTenant(this.fm).subscribe((res)=> {

        });
    }

    ngOnInit() {
        // 获得上级router 参数多艰难呀`~~
        let tenantId: number = +this.router.routerState.parent(this.route).snapshot.params['tenantId'];
        if(tenantId){
            this.sub = this.ts.getTenant(tenantId).subscribe((res)=> {
                this.fm = res.data;
            });
        }
    }

    ngOnDestroy() {
        this.sub && this.sub.unsubscribe();
    }
}
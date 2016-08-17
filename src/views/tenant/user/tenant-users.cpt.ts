import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TenantServ} from '../tenant.serv';
import {Admin} from '../../admin/admin.model';
import {DICT} from '../../common/const';
import {GLOBAL} from '../../common/global';

declare var console: any, mu: any;

@Component({
    selector: 'inmain.tenant-users',
    templateUrl: 'views/tenant/user/tenant-users.html'
})

export class TenantUsersCpt {
    private sub: any;
    private users: Admin[];
    private tenantId: number;
    private roots: any;

    constructor(private tenantServ: TenantServ,
                private G: GLOBAL,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {

        this.roots = mu.map(DICT.ROOT, (v, k)=> {
            return {
                val: + k,
                title: v
            };
        }, []);

        let routeParams: any = this.router.routerState.parent(this.route).snapshot.params;

        // 获得上级router 参数多艰难呀`~~
        this.tenantId = +routeParams.tenantId;

        this.sub = this.tenantServ.getTenantUsers({
            tenantId: this.tenantId
        }).subscribe((res)=> {
            //todo
            this.users = res.data;
        });
    }

    changeUserRoot(user, root) {
        user.root = + root;
        user.tenantId = this.tenantId;
        this.tenantServ.saveTenantUser(user).subscribe();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}

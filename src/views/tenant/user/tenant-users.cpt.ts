import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TenantServ} from '../tenant.serv';
import {DICT} from '../../common/const';
import {GLOBAL} from '../../common/global';
import {$$ResourcePool} from '../../common/resource-pool';

declare var console: any, mu: any;

@Component({
    selector: 'inmain.tenant-users',
    templateUrl: 'views/tenant/user/tenant-users.html'
})

export class TenantUsersCpt {
    private sub: any;
    private users: any[];
    private tenantId: number;
    private roots: any;

    constructor(private tenantServ: TenantServ,
                private G: GLOBAL,
                private $$: $$ResourcePool,
                private route: ActivatedRoute,
                private router: Router) {
    }

    changeUserRoot(user: any, root: number): void {
        user.root = +root;
        user.tenantId = this.tenantId;
        user.__primary__ = 'userId';
        this.$$.tenants_users.save(user).subscribe();
    }

    activeness(user: any): void {
        this.$$.tenants_users_activeness.patch({
            userId: user.userId,
            tenantId: this.tenantId
        }, {
            status: user.status ? 0 : 1
        }).subscribe((rst) => {
            user = mu.extend(user, rst.data);
        });
    }

    ngOnInit(): void {

        this.roots = mu.map(DICT.ROOT, (v, k) => {
            return {
                val: +k,
                title: v
            };
        }, []);

        let routeParams: any = this.G.stateParams(this.route, null);;
        this.tenantId = +routeParams.tenantId;

        this.sub = this.$$.tenants_users.get({
            tenantId: this.tenantId
        }).subscribe((res) => {
            this.users = res.data;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}

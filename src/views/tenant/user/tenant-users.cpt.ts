import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TenantServ} from '../tenant.serv';
import {DICT} from '../../common/const';
import {GLOBAL} from '../../common/global';
import {ResourcePool} from '../../common/resource-pool';
import {NamePipe} from '../../common/pipe/name.pipe';

declare var console: any, mu: any;

@Component({
    selector: 'inmain.tenant-users',
    templateUrl: 'views/tenant/user/tenant-users.html',
    pipes: [NamePipe]
})

export class TenantUsersCpt {
    private sub: any;
    private users: any[];
    private tenantId: number;
    private roots: any;

    constructor(private tenantServ: TenantServ,
                private G: GLOBAL,
                private $$: ResourcePool,
                private route: ActivatedRoute,
                private router: Router) {
    }

    changeUserRoot(user: any, root: number): void {
        user.root = +root;
        user.tenantId = this.tenantId;
        user.__primary__ = 'userId';
        this.$$.tenants_users.save(user).subscribe();
    }


    ngOnInit(): void {

        this.roots = mu.map(DICT.ROOT, (v, k) => {
            return {
                val: +k,
                title: v
            };
        }, []);

        let routeParams: any = this.router.routerState.parent(this.route).snapshot.params;

        // 获得上级router 参数多艰难呀`~~
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

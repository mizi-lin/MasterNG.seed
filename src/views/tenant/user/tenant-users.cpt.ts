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

    changeUserRoot(user: any, root: number): void {
        user.root = +root;
        user.tenantId = this.tenantId;
        this.tenantServ.saveTenantUser(user).subscribe();
    }

    simulator(evt: any, userId: number, user: any, index: number): void {

        this.tenantServ.getTenantUserSimulator({
            userId: userId,
            tenantId: this.tenantId
        }).subscribe((res)=> {
            let token = res.data.token;
            user.href = 'http://test.youce.io/start.html?accessToken=' + token;
        });
    }

    ngOnInit(): void {

        this.roots = mu.map(DICT.ROOT, (v, k)=> {
            return {
                val: +k,
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
            // this.users = res.data;

            this.users = mu.map(res.data, (user)=> {
                this.tenantServ.getTenantUserSimulator({
                    userId: user.userId,
                    tenantId: this.tenantId
                }).subscribe((res)=> {
                    let token = res.data.token;
                    user.href = 'http://test.youce.io/start.html?accessToken=' + token;
                });

                return user;
            });

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}

import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TenantServ} from './tenant.serv';
import {Admin} from '../admin/admin.model';
import {DICT} from '../common/const';
import {NamePipe} from '../common/pipe/name.pipe';
import {GLOBAL} from '../common/global';

declare var console: any, mu: any;

@Component({
    selector: 'inmain.tenant-activities',
    templateUrl: 'views/tenant/tenant-activities.html',
    pipes: [NamePipe]
})

export class TenantActivitiesCpt {
    private sub: any;
    private activities: Admin[];
    private tenantId: number;
    private roots: any;

    constructor(private tenantServ: TenantServ,
                private G: GLOBAL,
                private route: ActivatedRoute,
                private router: Router) {
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

        this.sub = this.tenantServ.getTenantActivities({
            tenantId: this.tenantId
        }).subscribe((res)=> {
            //todo
            this.activities = res.data;
        });
    }

    changeUserStatus(activity: any, status: number): void {
        activity.status = +status;
        activity.tenantId = this.tenantId;
        this.tenantServ.saveTenantActivity(activity).subscribe();
    }

    pending(activity: any): void {
        this.changeUserStatus(activity, 3);
    }

    restore(activity: any): void {
        this.changeUserStatus(activity, 2);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}

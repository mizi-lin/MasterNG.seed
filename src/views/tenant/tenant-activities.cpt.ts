import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TenantServ} from './tenant.serv';
import {Admin} from '../admin/admin.model';
import {DICT} from '../common/const';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

declare var console: any, mu: any;

@Component({
    selector: 'inmain.tenant-activities',
    templateUrl: 'views/tenant/tenant-activities.html'
})

export class TenantActivitiesCpt {
    private sub: any;
    private activities: Admin[];
    private tenantId: number;
    private roots: any;
    private res: any;

    constructor(private tenantServ: TenantServ,
                private G: GLOBAL,
                private $$: $$ResourcePool,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {

        this.roots = mu.map(DICT.ROOT, (v, k) => {
            return {
                val: +k,
                title: v
            };
        }, []);

        let routeParams: any = this.G.stateParams(this.route, null);;

        // 获得上级router 参数多艰难呀`~~
        this.tenantId = +routeParams.tenantId;

        this.sub = this.$$.tenants_activities.get({
            tenantId: this.tenantId
        }).subscribe((res) => {
            this.activities = res.data;
            this.res = res;
        });
    }

    changeUserStatus(activity: any, status: number): void {
        activity.status = +status;
        activity.tenantId = this.tenantId;
        activity.__primary__ = 'activityId';
        this.$$.tenants_activities.save(activity).subscribe();
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

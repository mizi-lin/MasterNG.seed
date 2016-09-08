import {Component, OnInit, OnDestroy} from '@angular/core';
import {AdminServ} from './admin.serv';
import {Admin} from './admin.model';
import {ActivatedRoute} from '@angular/router';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

@Component({
    selector: 'page.detail',
    templateUrl: 'views/admin/admin-detail.html',
    providers: [AdminServ]
})

export class AdminDetailCpt implements OnInit, OnDestroy {

    admin: Admin;
    sub: any;


    constructor(private adminServ: AdminServ,
                private G: GLOBAL,
                private $$: $$ResourcePool,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {

        let adminId: any = this.route.snapshot.params['adminId'];

        if (adminId === 'current') {
            this.admin = this.G.current;
        } else {
            this.sub = this.$$.admins.get({
                adminId: adminId
            }).subscribe((res) => {
                this.admin = res.data;
            });
        }
    }

    ngOnDestroy(): void {
        this.sub && this.sub.unsubscribe();
    }
}



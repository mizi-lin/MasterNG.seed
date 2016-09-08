import {Component, OnInit, OnDestroy} from '@angular/core';
import {Admin} from './admin.model';
import {AdminServ} from './admin.serv';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

declare var mu: any, console: any;

@Component({
    selector: 'admin-form',
    templateUrl: 'views/admin/admin.form.html'
})

export class AdminUpdateCpt implements OnInit, OnDestroy {

    fm: Admin = new Admin();
    admin: Admin;
    sub: any;
    isCurrent: boolean = false;

    constructor(private G: GLOBAL,
                private adminServ: AdminServ,
                private $$: $$ResourcePool,
                private route: ActivatedRoute,
                private router: Router) {
    }

    save(form: any): void {
        this.G.save(form, this, (form) => {
            this.fm.__primary__ = 'adminId';
            if (this.isCurrent) {
                this.$$.current.save(this.fm).subscribe((res) => {
                    this.fm = res.data;
                    this.G.setCurrent(res.data);
                });
            } else {
                this.$$.admins.save(this.fm).subscribe((res) => {
                    this.fm = res.data;
                });
            }
        });
    }

    ngOnInit(): void {
        // 获得上级router 参数多艰难呀`~~
        let adminId = this.G.stateParams(this.route)['adminId'];
        if (adminId === 'current') {
            this.isCurrent = true;
            this.fm = mu.clone(this.G.current);
        } else {
            adminId = +adminId;
            this.sub = this.$$.admins.get({
                adminId: adminId
            }).subscribe((res) => {
                this.fm = res.data;
                this.admin = res.data;
            });
        }
    }

    ngOnDestroy(): void {
        this.sub && this.sub.unsubscribe();
    }
}

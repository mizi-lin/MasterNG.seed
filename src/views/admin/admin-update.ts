import {Component, OnInit, OnDestroy} from '@angular/core';
import {Admin} from './admin.model';
import {AdminServ} from './admin.serv';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../common/global';

declare var mu: any, console: any;

@Component({
    selector: 'admin-form',
    templateUrl: 'views/admin/admin.form.html'
})

export class AdminUpdateCpt implements OnInit, OnDestroy {

    fm: Admin = new Admin();
    admin: Admin;
    sub: any;

    constructor(private G: GLOBAL,
                private adminServ: AdminServ,
                private route: ActivatedRoute,
                private router: Router) {
    }

    save(form): void {
        this.G.save(form, this, (form)=> {
            this.adminServ.saveAdmin(this.fm).subscribe((res)=> {
                this.fm = res.data;
            });
        });
    }

    ngOnInit() {
        // 获得上级router 参数多艰难呀`~~
        let adminId: number = +this.router.routerState.parent(this.route).snapshot.params['adminId'];
        if (adminId) {
            this.sub = this.adminServ.getAdmin(adminId).subscribe((res)=> {
                this.fm = res.data;
                this.admin = res.data;
            });
        }
    }

    ngOnDestroy() {
        this.sub && this.sub.unsubscribe();
    }
}
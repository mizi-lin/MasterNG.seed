import {Component, OnInit} from '@angular/core';
import {Admin} from './admin.model';
import {AdminServ} from './admin.serv';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../common/global';

declare var mu: any, console: any;

@Component({
    selector: 'admin-form',
    templateUrl: 'views/admin/admin-modifypwd.form.html'
})

export class AdminModifyPwdCpt implements OnInit {

    fm: Admin = new Admin();
    adminId: number;
    sub: any;

    constructor(private G: GLOBAL, private adminServ: AdminServ, private route: ActivatedRoute, private router: Router) {
    }


    save(form: any): void {
        this.G.save(form, this, (form) => {
            this.fm.adminId = this.adminId;
            this.adminServ.saveAdmin(this.fm).subscribe((res) => {
                this.fm = res.data;
            });
        });
    }

    ngOnInit(): void {
        this.adminId = +this.router.routerState.parent(this.route).snapshot.params['adminId'];
    }

}

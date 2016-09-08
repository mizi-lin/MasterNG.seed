import {Component, OnInit} from '@angular/core';
import {Admin} from './admin.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

declare var mu: any, console: any;

@Component({
    selector: 'admin-form',
    templateUrl: 'views/admin/admin-modifypwd.form.html'
})

export class AdminModifyPwdCpt implements OnInit {

    fm: Admin = new Admin();
    adminId: any;
    sub: any;

    constructor(private G: GLOBAL,
                private $$: $$ResourcePool,
                private route: ActivatedRoute,
                private router: Router) {
    }


    save(form: any): void {
        this.G.save(form, this, (form) => {
            let rp: string;
            if (this.adminId === 'current') {
                rp = 'current';
                this.fm.adminId = this.G.current.adminId;
            } else {
                rp = 'admins';
                this.fm.adminId = this.adminId;
            }

            this.$$[rp].patch(this.fm).subscribe((res) => {
                form.resetForm();
            });
        });
    }

    ngOnInit(): void {
        this.adminId = this.G.stateParams(this.route)['adminId'];
    }

}

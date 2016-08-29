import {Component, OnInit} from '@angular/core';
import {Admin} from './admin.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../common/global';
import {ResourcePool} from '../common/resource-pool';
import {MVEquals} from '../common/directive/validation/mVEquals-validation.direc';

declare var mu: any, console: any;

@Component({
    selector: 'admin-form',
    templateUrl: 'views/admin/admin-modifypwd.form.html',
    directives: [MVEquals]
})

export class AdminModifyPwdCpt implements OnInit {

    fm: Admin = new Admin();
    adminId: any;
    sub: any;

    constructor(private G: GLOBAL,
                private $$: ResourcePool,
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
                // @todo after update rc.5 or 6 then form.reset
            });
        });
    }

    ngOnInit(): void {
        this.adminId = this.router.routerState.parent(this.route).snapshot.params['adminId'];
    }

}

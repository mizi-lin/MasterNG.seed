import {Component, OnInit, OnDestroy} from '@angular/core';
import {Admin} from './admin.model';
import {AdminServ} from './admin.serv';
import {ActivatedRoute, Router} from '@angular/router';

declare var mu: any, console: any;

@Component({
    selector: 'admin-form',
    templateUrl: 'views/admin/admin-modifypwd.html'
})

export class AdminModifyPwdCpt implements OnInit {

    fm: Admin = new Admin();
    adminId: number;
    sub: any;

    constructor(private adminServ: AdminServ, private route: ActivatedRoute, private router: Router) {
    }

    save(myform: any) {
        this.fm.adminId = this.adminId;
        this.adminServ.saveAdmin(this.fm).subscribe((res)=> {
            this.fm = res.data;
        });
    }

    ngOnInit() {
        this.adminId = +this.router.routerState.parent(this.route).snapshot.params['adminId'];
    }

}
import {Component, OnInit, OnDestroy} from '@angular/core';
import {AdminServ} from './admin.serv';
import {Admin} from './admin.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'page.detail',
    templateUrl: 'views/admin/admin-detail.html',
    providers: [AdminServ]
})

export class AdminDetailCpt implements OnInit, OnDestroy {

    admin: Admin;
    sub: any;


    constructor(private adminServ: AdminServ,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let adminId: number = +params['adminId'];
            this.adminServ.getAdmin(adminId).subscribe((res)=> {
                this.admin = res.data;
            });

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


}
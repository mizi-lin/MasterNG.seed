import {Component, OnInit} from '@angular/core';
import {AdminServ} from './admin.serv';
import {Admin} from './admin.model';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

@Component({
    selector: 'page.admins',
    templateUrl: 'views/admin/admins.html',
    providers: [AdminServ]
})

export class AdminsCpt implements OnInit {
    admins: Admin[];

    constructor(private G: GLOBAL,
                private ts: AdminServ,
                private $$: $$ResourcePool) {
    }

    ngOnInit(): void {
        this.$$.admins.get().subscribe((res) => this.admins = res.data);
    }

}

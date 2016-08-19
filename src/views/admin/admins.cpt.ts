import {Component, OnInit} from '@angular/core';
import {AdminServ} from './admin.serv';
import {Admin} from './admin.model';
import {GLOBAL} from '../common/global';

@Component({
    selector: 'page.admins',
    templateUrl: 'views/admin/admins.html',
    providers: [AdminServ]
})

export class AdminsCpt implements OnInit {
    admins: Admin[];

    constructor(private G: GLOBAL, private ts: AdminServ) {
    }

    ngOnInit(): void {
        this.ts.getAdmin().subscribe((res) => this.admins = res.data);
    }

}

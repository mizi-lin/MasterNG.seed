import {Component, OnInit} from '@angular/core';
import {AdminServ} from './admin.serv';
import {Admin} from './admin.model';

@Component({
    selector: 'page.admins',
    templateUrl: 'views/admin/admins.html',
    providers: [AdminServ]
})

export class AdminsCpt implements OnInit {
    admins: Admin[];
    constructor(private ts: AdminServ){ }

    ngOnInit() {
        this.ts.getAdmin().subscribe((res)=> this.admins = res.data);
    }

}

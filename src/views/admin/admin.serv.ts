import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {HttpClient} from '../common/http-client';
import {Admin} from './admin.model';
import {API} from '../common/const';

declare var mu: any, console: any;

@Injectable()
export class AdminServ {

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    getAdmin(adminId?: number) {
        let search: any = {};
        if(adminId){
            search.adminId = adminId;
        }
        return this.httpClient.get(API.ADMINS, search);
    }

    saveAdmin(admin: Admin) {
        let method = admin.adminId ? 'patch' : 'post';
        return this.httpClient[method](API.ADMINS, admin);
    }



}
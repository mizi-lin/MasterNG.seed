import {Component} from '@angular/core';
import {LoginServ} from './login.serv';
import {Router} from '@angular/router';

import {HEADER_TOKEN} from '../common/const';
import {GLOBAL} from '../common/global';

declare var mu: any;


@Component({
    selector: 'fe.login',
    templateUrl: 'views/fe/login.html',
    providers: [LoginServ]
})

export class LoginCpt {
    fm = {
        'email': 'youce-service@admaster.com.cn',
        'password': 'admaster12345'
    };

    constructor(private loginServ: LoginServ,
                private G: GLOBAL,
                private router: Router) {
    }

    save(form): void {
        this.G.save(form, this, (form)=> {
            mu.storage(HEADER_TOKEN, '');
            this.loginServ.login(this.fm).subscribe((res)=> {
                let data = res.data;
                mu.storage(HEADER_TOKEN, data.token);
                mu.storage('CURRENT', data);
                this.G.setCurrent(data);
                this.router.navigate(['/tenants']);
            });
        });
    }
}

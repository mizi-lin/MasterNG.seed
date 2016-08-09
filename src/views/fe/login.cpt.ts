import {Component} from '@angular/core';
import {LoginServ} from './login.serv';
import {Router} from '@angular/router';

import {HEADER_TOKEN} from '../const';

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

    constructor(private loginServ: LoginServ, private router: Router) {
    }

    save = function (myForm) {
        mu.storage(HEADER_TOKEN, '');
        this.loginServ.login(this.fm).subscribe((data)=> {
            mu.storage(HEADER_TOKEN, data.token);
            this.router.navigate(['/agents']);
        });
    };

}

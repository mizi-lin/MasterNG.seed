import {Component} from '@angular/core';
import {LoginServ} from './login.serv';
import {Router} from '@angular/router';

import {CONST} from '../common/const';
import {GLOBAL} from '../common/global';
import {ResourcePool} from '../common/resource-pool';
import {M_VALIDATION} from '../common/directive/validation/index';

declare var mu: any;


@Component({
    selector: 'fe.login',
    templateUrl: 'views/fe/login.html',
    providers: [LoginServ],
    directives: [M_VALIDATION]
})

export class LoginCpt {
    fm: any;

    constructor(private loginServ: LoginServ,
                private $$: ResourcePool,
                private G: GLOBAL,
                private router: Router) {
        this.fm = this.G.ENV_CONST.TEST_ACCOUNT;
    }

    save(form: any): void {
        this.G.save(form, this, (form) => {
            mu.storage(CONST.HEADER_TOKEN, '');
            this.$$.login.post(this.fm).subscribe((res) => {
                let data = res.data;
                mu.storage(CONST.HEADER_TOKEN, data.token);
                mu.storage('CURRENT', data);
                this.G.setCurrent(data);
                this.router.navigate([CONST.BE_INDEX_PAGE]);
            });
        });
    }
}

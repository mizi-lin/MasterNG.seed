import {Injectable} from '@angular/core';
import {BaseServices} from './base.services';
import {Http} from '@angular/http';
declare const mu: any;
import {Observable} from 'rxjs';

@Injectable()
export class InitializeService {

    constructor(private _bs: BaseServices,
                private _http: Http) {
    }

    initApp(fn: any): any {

        console.debug('ooOooOooOOooo::: init :::::::::::');

        const auth_rules = this._http.get('./assets/store/auth-rule.mock.json').toPromise();

        Promise.all([auth_rules]).then((res: any) => {
            let [auth_rules] = res;

            /**
             * auth_rules
             * @type {{auth_rules}}
             */
            mu.run(() => {
                auth_rules = auth_rules.data;
                this._bs.setAuthRules(auth_rules);
            });

            const rst: any = {
                auth_rules: auth_rules
            };

            fn && fn(rst);
        });
    }
}

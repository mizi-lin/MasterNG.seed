import {Injectable} from '@angular/core';
import {MnRuleServices} from 'masterng/mn-rule/mn-rule.services';

@Injectable()
export class BaseServices {

    constructor(
        private _rs: MnRuleServices
    ) {
    }

    auth_rules: any = {};
    setAuthRules(rules: any) {
        this._rs.setRules(rules);
        this.auth_rules = rules;
    }
}

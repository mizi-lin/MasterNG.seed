import {InitializeService} from './initialize.service';
import {MnI18nServices} from 'masterng/mn-i18n/mn-i18n.services';
import {MnRuleServices} from 'masterng/mn-rule/mn-rule.services';

export function InitializeFactory(_initServ: InitializeService,
                                  _i18nServ: MnI18nServices,
                                  _ruleServ: MnRuleServices) {

    return () => {
        /**
         * 系统初始化，获得相关信息
         */
        _initServ.initApp((resource: any = {}) => {
            /**
             * 规则匹配
             */
            _ruleServ.setRules(resource.auth_rules || {});
        });

        /**
         * 国际化
         */
        _i18nServ.setConfig({
            lang: 'en',
            prefix: './assets/i18n'
        });
    };
}

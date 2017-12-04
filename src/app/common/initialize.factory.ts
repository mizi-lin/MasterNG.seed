import {InitializeService} from './initialize.service';
import {Observable} from 'rxjs/Observable';
import {BaseResources} from './base.resources';
import {BaseConst} from './base.const';
import {MnCommonServices} from 'masterng/mn-common/services/mn-common.services';

declare const mu: any;

export function InitializeFactory(_initService: InitializeService,
                                  _rp: BaseResources,
                                  _mcs: MnCommonServices
) {
    return () => {

        /**
         * 系统初始化，获得相关信息
         */
        _initService.initApp();

        /**
         * 国际化
         */
        _mcs._i18nService.setConfig({
            lang: 'en',
            prefix: 'assets/i18n'
        });

        _mcs._reqService.setHeaders([
            {
                method: 'append',
                key: 'X-TOKEN',
                value: () => mu.storage(BaseConst.STORAGE_TOKEN)
            }
        ]);

        _mcs._reqService.setResources(_rp);

        _mcs._reqService.reqCatch = ((error, caught, url) => {
            if (error.status === 404) {
                return mu.prop(Observable, 'empty')();
            }
        });

        _mcs._reqService.reqError = ((error, url) => {
        });

        /**
         * 规则匹配
         */
        _mcs._ruleService.setRules({
            'aaa.bbb.ccc': true,
            'aaa.bbb.ddd': false,
            'aaa.bbb.eee': false,
            'aaa.bbb.fff': true
        });

        _mcs._echartsService.setConfig({
            toolbars: true,
            show_tools: 'toggle'
        });
    };
}

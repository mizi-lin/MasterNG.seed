import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {BaseServices} from '../../common/base.services';
import {BaseConst} from '../../common/base.const';
import {BaseResources} from '../../common/base.resources';
import {InitializeService} from '../../common/initialize.service';
import {MnReqService} from 'masterng/mn-req/mn-req.service';

declare const mu: any;

@Component({
    selector: 'bht-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IndexComponent {
    myform: any;
    form: any = environment.test_account || {};

    constructor(private _router: Router,
                private _bs: BaseServices,
                private _is: InitializeService,
                private _rs: MnReqService,
                private _rp: BaseResources) {
    }

    login(): void {
        this._rp.login.post(this.form).subscribe((res) => {
            mu.storage(BaseConst.STORAGE_TOKEN, res.data.token);

            this._rs.setHeaders([
                {
                    method: 'set',
                    key: 'X-TOKEN',
                    value: mu.storage(BaseConst.STORAGE_TOKEN)
                },
                {
                    method: 'set',
                    key: 'X-ORIGIN',
                    value: location.host.replace('2', '')
                }
            ]);

            // 登录获取初始值
            // this._is.initValue((o) => {
            //     this.form.error = '';
            //     this._router.navigate([BaseConst.BE_INDEX_PAGE]);
            // });
        }, () => {
            this.form.error = '账号或密码错误';
        });
    }

}

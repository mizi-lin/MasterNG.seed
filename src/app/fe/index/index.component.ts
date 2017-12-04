import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {BaseConst} from '../../common/base.const';
import {BaseResources} from '../../common/base.resources';

declare const mu: any;

@Component({
    selector: 'mns-index.mns-tags',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IndexComponent {
    _form: any = environment.test_account || {};

    constructor(private _router: Router,
                private _rp: BaseResources) {
    }

    login(): void {

        this._rp.login.get(this._form).subscribe((res) => {
            const data = res.data;
            mu.storage(BaseConst.STORAGE_TOKEN, res.data.token);
            this._router.navigate([BaseConst.BE_INDEX_PAGE]);

            // 登录获取初始值
            // this._is.initValue((o) => {
            //     this._form.error = '';
            //     this._router.navigate([BaseConst.BE_INDEX_PAGE]);
            // });
        }, () => {
            this._form.error = '账号或密码错误';
        });
    }

}

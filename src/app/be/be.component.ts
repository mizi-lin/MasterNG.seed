import {Component, OnInit} from '@angular/core';
import {BaseServices} from '../common/base.services';

@Component({
    selector: 'mn-be.mns-tags',
    templateUrl: './be.component.html',
    styleUrls: ['./be.component.scss']
})
export class BeComponent implements OnInit {

    constructor(
        private _bs: BaseServices
    ) {
    }

    ngOnInit() {
    }

    logout() {
        return this._bs.logout();
    }

}

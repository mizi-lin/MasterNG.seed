import {Component} from '@angular/core';
import {GLOBAL} from '../../../common/global';

@Component({
    selector: 'indexCpt',
    templateUrl: './index.tpl'
})

export class IndexCpt {
    constructor(private G: GLOBAL) {
    }
}

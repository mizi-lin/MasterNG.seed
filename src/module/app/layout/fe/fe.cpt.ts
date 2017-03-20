import {Component} from '@angular/core';
import {GLOBAL} from '../../../../common/global';

@Component({
    selector: 'feCpt',
    templateUrl: './fe.tpl'
})

export class FeCpt {
    constructor(private G: GLOBAL) {
    }
}

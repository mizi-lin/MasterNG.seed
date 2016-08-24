import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {GLOBAL} from '../common/global';

declare var mu: any, console: any;

@Component({
    selector: 'header',
    templateUrl: 'views/layout/header.html',
    directives: [ROUTER_DIRECTIVES]
})

export class Header {
    constructor(private router: Router, private G: GLOBAL) {
    }

    logout(): void {
        this.G.clearCurrent();
        this.router.navigate(['/login']);
    }
}

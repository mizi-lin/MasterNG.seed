import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {CONFIG} from '../common/const';
import {GLOBAL} from '../common/global';

declare var mu: any, console: any;

@Component({
    selector: 'header',
    templateUrl: 'views/layout/header.html',
    directives: [ROUTER_DIRECTIVES]
})

export class Header implements OnInit {
    constructor(private router: Router, private G: GLOBAL) {
    }

    // current: any;

    ngOnInit(): void {
        // this.current = this.G.current;
        // console.debug(this.current);
    }

    logout(): void {
        mu.storage(CONFIG.HEADER_TOKEN, '');
        this.router.navigate(['/login']);
    }

}

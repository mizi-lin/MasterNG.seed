import { Component } from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'header',
    templateUrl: 'views/layout/header.html',
    directives: [ROUTER_DIRECTIVES]
})

export class Header {
}

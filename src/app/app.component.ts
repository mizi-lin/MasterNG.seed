import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
declare const mu: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
    title = 'app';

    constructor() {
        this.title = 'AAPPP';
        // console.log($);
        // console.log(mu);
        // console.log(jQuery);

    }

    ngAfterViewInit(): void {
    }
}

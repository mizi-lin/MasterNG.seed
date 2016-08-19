import {Router} from '@angular/router';

declare var mu: any, console: any;

export class BaseCpt {

    constructor(private router: Router) {
    }

    goback(): void {
        this.router.navigate(['../']);
    }
}

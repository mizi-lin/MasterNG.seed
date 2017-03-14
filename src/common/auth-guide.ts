import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {GLOBAL} from './global';
import {CONST} from './const';

declare var mu: any, console: any;

/**
 * 身份校验
 */

@Injectable()
export class AuthGuide implements CanActivate {

    constructor(private router: Router, private G: GLOBAL) {
    }

    canActivate(): boolean {
        if (mu.storage(CONST.HEADER_TOKEN)) {
            mu.empty(this.G.current, () => {
                this.G.setCurrent(mu.storage('CURRENT'));
            });

            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}

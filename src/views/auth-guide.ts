import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {CONFIG} from './const';

declare var mu: any;

/**
 * 身份校验
 */

@Injectable()
export class AuthGuide implements CanActivate {
    constructor(private router: Router) {
    }
    canActivate() {
        if (mu.storage(CONFIG.HEADER_TOKEN)) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
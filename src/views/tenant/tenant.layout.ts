import {Component} from '@angular/core';
import {Header} from '../layout';

@Component({
    selector: 'layout',
    templateUrl: 'views/tenant/tenant.layout.html',
    directives: [Header]
})

export class TenantLayoutCpt {
}

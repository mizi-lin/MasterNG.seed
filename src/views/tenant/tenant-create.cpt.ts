import {Component} from '@angular/core';
import {TenantServ} from './tenant.serv';

@Component({
    selector: 'page.tenant-create.dlg.small',
    templateUrl: 'views/tenant/tenant-create.html',
    providers: [TenantServ]
})

export class TenantCreateCpt {
}

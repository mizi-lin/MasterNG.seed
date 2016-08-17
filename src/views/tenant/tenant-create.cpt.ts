import {Component} from '@angular/core';
import {TenantUpdateCpt} from './tenant-form.cpt';
import {TenantServ} from './tenant.serv';

@Component({
    selector: 'page.tenant-create.dlg.small',
    templateUrl: 'views/tenant/tenant-create.html',
    directives: [TenantUpdateCpt],
    providers: [TenantServ]
})

export class TenantCreateCpt {
}

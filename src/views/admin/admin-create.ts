import {Component} from '@angular/core';
import {AdminUpdateCpt} from './admin-update';
import {AdminServ} from './admin.serv';

@Component({
    selector: 'page.admin-create',
    templateUrl: 'views/admin/admin-create.html',
    directives: [AdminUpdateCpt],
    providers: [AdminServ]
})

export class AdminCreateCpt {
}

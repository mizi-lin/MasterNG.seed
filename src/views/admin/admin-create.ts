import {Component} from '@angular/core';
import {AdminServ} from './admin.serv';

@Component({
    selector: 'page.admin-create',
    templateUrl: 'views/admin/admin-create.html',
    providers: [AdminServ]
})

export class AdminCreateCpt {
}

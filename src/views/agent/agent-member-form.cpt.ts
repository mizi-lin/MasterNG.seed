import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Admin} from '../admin/admin.model';
import {GLOBAL} from '../common/global';
import {AdminServ} from '../admin/admin.serv';
import {$$ResourcePool} from '../common/resource-pool';
import {CONST} from '../common/const';

// import {$$DIREC_VALIDATION} from '../common/directive/validation/index';

declare var console: any;

@Component({
    selector: 'agent-member-form',
    templateUrl: 'views/agent/agent-member-form.html',
    providers: [AdminServ]
    // directives: [$$DIREC_VALIDATION]
})

export class AgentMemberFormCpt {
    fm: Admin = new Admin();
    adminId: number;
    CONST = CONST;

    constructor(private adminServ: AdminServ,
                private G: GLOBAL,
                private $$: $$ResourcePool,
                private route: ActivatedRoute,
                private router: Router) {
    }

    save(form: any): void {
        this.G.save(form, this, (form) => {
            this.fm.__primary__ = 'adminId';
            this.$$.admins.save(this.fm).subscribe(() => {
                this.router.navigate([
                    'agents',
                    this.fm.agencyId,
                    'members'
                ]);
            });
        });
    }

    ngOnInit(): void {

        this.fm.agencyId = +this.G.stateParams(this.route)['agencyId'];

        this.adminId = +this.route.snapshot.params['adminId'];

        if (this.adminId) {
            this.$$.admins.get({
                adminId: this.adminId
            }).subscribe((res) => {
                this.fm = res.data;
            });
        }

    }

}

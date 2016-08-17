import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentServ} from './agent.serv';
import {Admin} from '../admin/admin.model';
import {GLOBAL} from '../common/global';

declare var console: any;

@Component({
    selector: 'page.agent-member-form.dlg.small',
    templateUrl: 'views/agent/agent-member-form.html'
})

export class AgentMemberFormCpt {
    fm: Admin = new Admin;

    constructor(private agentServ: AgentServ,
                private G: GLOBAL,
                private route: ActivatedRoute,
                private router: Router) {
    }

    save(form): void {
        this.G.save(form, this, (form)=> {
            this.agentServ.saveAdmin(this.fm).subscribe();
        });
    }

    ngOnInit() {

        // 获得上级router 参数多艰难呀`~~
        // 而且只能在 ngOnInit 中获取
        this.fm.agencyId = +this.router.routerState.parent(this.route).snapshot.params['agencyId'];
    }

}

import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentServ} from './agent.serv';
import {Admin} from '../admin/admin.model';

declare var console: any;

@Component({
    selector: 'inmain.agent-member',
    templateUrl: 'views/agent/agent-members.html'
})

export class AgentMembersCpt {
    private sub: any;
    private members: Admin[];
    private agencyId: number;

    constructor(private agentServ: AgentServ,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        // 获得上级router 参数多艰难呀`~~
        this.agencyId = +this.router.routerState.parent(this.route).snapshot.params['agencyId'];
        this.sub = this.agentServ.getAgentMember(this.agencyId).subscribe((res)=> {
            this.members = res.data;
        });
    }

    disabled() {
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}

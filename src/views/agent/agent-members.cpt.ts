import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentServ} from './agent.serv';
import {Admin} from '../admin/admin';

@Component({
    selector: 'inmain.agent-member',
    templateUrl: 'views/agent/agent-members.html'
})

export class AgentMembersCpt {
    private sub: any;
    private members: Admin[];

    constructor(private agentServ: AgentServ,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        // 获得上级router 参数多艰难呀`~~
        let agencyId: number = +this.router.routerState.parent(this.route).snapshot.params['agencyId'];
        this.sub = this.agentServ.getAgentMember(agencyId).subscribe((res)=> {
            this.members = res.data;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}

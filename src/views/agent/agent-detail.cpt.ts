import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AgentServ} from './agent.serv';
import {Agent} from './agent';
import {GLOBAL} from '../common/global';

@Component({
    selector: 'page.agent-detail', templateUrl: 'views/agent/agent-detail.html', providers: [AgentServ]

})

export class AgentDetailCpt implements OnInit, OnDestroy {

    agent: Agent;
    sub: any;

    constructor(private G: GLOBAL, private agentServ: AgentServ, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            let agencyId: number = +params['agencyId'];

            this.agentServ.getAgent(agencyId).subscribe((res) => {
                this.agent = res.data;
            });
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}

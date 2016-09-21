import {Component, OnInit} from '@angular/core';
import {AgentServ} from './agent.serv';
import {Agent} from './agent';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';


@Component({
    providers: [AgentServ],
    selector: 'page.agents',
    templateUrl: 'views/agent/agents.html'
})

export class AgentsCpt implements OnInit {
    agents: Agent[];

    constructor(private G: GLOBAL,
                private $$: $$ResourcePool,
                private agentServ: AgentServ) {
    }

    activeness(agent: Agent): void {
        this.$$.agencies_activeness.patch({
            agencyId: agent.agencyId
        }, {
            status: agent.status ? 0 : 1
        }).subscribe((rst) => {
            agent = rst.data;
        });
    }

    ngOnInit(): void {
        this.$$.agencies.get().subscribe((rst) => this.agents = rst.data);
    }
}

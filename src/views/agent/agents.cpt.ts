import {Component, OnInit} from '@angular/core';
import {AgentServ} from './agent.serv';
import {Agent} from './agent';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

declare var mu: any, console: any;

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
            // 擦
            // agent = rst.data 竟然不行`, 页面检测不到 agent 变化
            agent = mu.extend(agent, rst.data);
        });
    }

    ngOnInit(): void {
        this.$$.agencies.get().subscribe((rst) => this.agents = rst.data);
    }
}

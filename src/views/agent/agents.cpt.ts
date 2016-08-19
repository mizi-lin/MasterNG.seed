import {Component, OnInit} from '@angular/core';

import {AgentServ} from './agent.serv';
import {Agent} from './agent';
import {GLOBAL} from '../common/global';


@Component({
    providers: [AgentServ],
    selector: 'page.agents',
    templateUrl: 'views/agent/agents.html'
})

export class AgentsCpt implements OnInit {
    agents: Agent[];

    constructor(private G: GLOBAL,
                private agentServ: AgentServ) {
    }

    ngOnInit(): void {
        this.agentServ.getAgents().subscribe((rst) => this.agents = rst.data);
    }
}

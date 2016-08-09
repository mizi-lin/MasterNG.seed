import {Component, OnInit} from '@angular/core';

import {AgentServ} from './agent.serv';
import {Agent} from './agent';


@Component({
    providers: [AgentServ],
    selector: 'page.agents',
    templateUrl: 'views/agent/agents.html'
})

export class AgentsCpt implements OnInit {
    agents: Agent[];

    constructor(private agentServ: AgentServ) {
    }

    ngOnInit() {
        this.agentServ.getAgents().subscribe((rst)=> this.agents = rst.data);
    }
}

import {Component} from '@angular/core';
import {AgentServ} from './agent.serv';
import {Router} from '@angular/router';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

declare var mu: any, console: any;

@Component({
    selector: 'page.agent-create.dlg.small',
    templateUrl: 'views/agent/agent-create.html',
    providers: [AgentServ]
})

export class AgentCreateCpt {

    constructor(private G: GLOBAL,
                private $$: $$ResourcePool,
                private router: Router) {
    }
}

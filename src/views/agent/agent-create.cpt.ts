import {Component} from '@angular/core';
import {AgentFormCpt} from './agent-form.cpt';
import {AgentServ} from './agent.serv';
import {Router} from '@angular/router';
import {GLOBAL} from '../common/global';

declare var mu: any, console: any;

@Component({
    selector: 'page.agent-create.dlg.small',
    templateUrl: 'views/agent/agent-create.html',
    directives: [AgentFormCpt],
    providers: [AgentServ]
})

export class AgentCreateCpt {

    constructor(private G: GLOBAL, private router: Router) {
    }
}

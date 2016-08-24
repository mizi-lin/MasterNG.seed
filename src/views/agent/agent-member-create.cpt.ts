import {Component} from '@angular/core';
import {AgentMemberFormCpt} from './agent-member-form.cpt';

declare var console: any;

@Component({
    selector: 'page.agent-member-form.dlg.small',
    templateUrl: 'views/agent/agent-member-create.html',
    directives: [AgentMemberFormCpt]
})

export class AgentMemberCreateCpt {
}

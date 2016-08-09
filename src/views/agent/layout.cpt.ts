import { Component } from '@angular/core';

import { Header } from '../layout';

@Component({
    selector: 'layout',
    templateUrl: 'views/agent/layout.html',
    directives: [Header]
})

export class AgentLayoutCpt {
}

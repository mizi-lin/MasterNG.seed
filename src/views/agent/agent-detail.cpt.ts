import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AgentServ} from './agent.serv';
import {Agent} from './agent';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

@Component({
    selector: 'page.agent-detail', templateUrl: 'views/agent/agent-detail.html', providers: [AgentServ]

})

export class AgentDetailCpt implements OnInit, OnDestroy {

    agent: Agent;
    sub: any;

    constructor(private G: GLOBAL,
                private agentServ: AgentServ,
                private $$: $$ResourcePool,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            let agencyId: number = +params['agencyId'];

            this.$$.agencies.get({
                agencyId: agencyId
            }).subscribe((res) => {
                this.agent = res.data;
            });
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}

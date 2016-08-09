import {Component, OnInit, Input} from '@angular/core';
import {Agent} from './agent';
import {AgentServ} from './agent.serv';
import {ActivatedRoute, Router} from '@angular/router';

declare var console: any;
declare var mu: any;

@Component({
    selector: 'agent-form',
    templateUrl: 'views/agent/agent-form.html'
})

export class AgentFormCpt implements OnInit {
    agent: Agent = new Agent;
    fm: Agent = new Agent;
    sub: any;

    @Input() m: string;

    constructor(private agentServ: AgentServ,
                private route: ActivatedRoute,
                private router: Router) {

    }

    save(myForm) {
        this.sub = this.agentServ.saveAgent(this.fm).subscribe((res)=> {
        });
    }

    cancel() {
        this.fm = mu.clone(this.agent);
    }

    ngOnInit() {

        // 获得上级router 参数多艰难呀`~~
        let agencyId: number = +this.router.routerState.parent(this.route).snapshot.params['agencyId'];
        if(agencyId){
            this.sub = this.agentServ.getAgent(agencyId).subscribe((res)=> {
                this.agent = res.data;
                this.fm = mu.clone(res.data);
            });
        }
    }

    ngOnDestroy() {
        this.sub && this.sub.unsubscribe();
    }
}

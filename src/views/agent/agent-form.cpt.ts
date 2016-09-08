import {Component, OnInit, OnDestroy} from '@angular/core';
import {Agent} from './agent';
import {AgentServ} from './agent.serv';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../common/global';
import {$$ResourcePool} from '../common/resource-pool';

declare var console: any;
declare var mu: any;

@Component({
    selector: 'agent-form',
    templateUrl: 'views/agent/agent-form.html'
})

export class AgentFormCpt implements OnInit, OnDestroy {
    // @ViewChild('myForm') myForm: ElementRef;

    agent: Agent = new Agent();
    fm: Agent = new Agent();
    sub: any;
    vm: any;

    agencyId: number;

    constructor(private agentServ: AgentServ,
                private $$: $$ResourcePool,
                private route: ActivatedRoute,
                private router: Router,
                private G: GLOBAL) {
        this.vm = this;
    }

    save(form: any): void {
        this.G.save(form, this, (form) => {
            this.fm.__primary__ = 'agencyId';
            this.sub = this.$$.agencies.save(this.fm).subscribe((res) => {
                if (!this.agencyId) {
                    this.router.navigate(['/agents']);
                }
            });
        });
    }

    ngOnInit(): void {
        // 获得上级router 参数多艰难呀`~~
        let agencyId: number = +this.G.stateParams(this.route)['agencyId'];
        if (agencyId) {
            this.agencyId = agencyId;
            this.sub = this.$$.agencies.get({
                agencyId: agencyId
            }).subscribe((res) => {
                this.agent = res.data;
                this.fm = mu.clone(res.data);
            });
        }
    }

    ngOnDestroy(): void {
        this.sub && this.sub.unsubscribe();
    }
}

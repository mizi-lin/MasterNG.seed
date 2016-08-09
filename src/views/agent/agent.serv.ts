import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {HttpClient} from '../http-client';
import {Agent} from './agent';

import {API} from '../const';
import {Admin} from '../admin/admin';

@Injectable()
export class AgentServ {
    ag: Observable<Agent>;

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    setAg = function(agent: Agent){
        this.ag = new Promise<Agent>((resolve)=>resolve(agent));
    };

    getAg = function(){
        return this.ag;
    };

    /**
     * 获得代理列表
     * @returns {Observable<R>}
     */
    getAgents(): Observable<any> {
        return this.httpClient.get(API.AGENCY);
    }

    /**
     * 获得代理信息
     * @param agencyId
     * @returns {Observable<R>}
     */
    getAgent(agencyId: number) {
        return this.httpClient.get(API.AGENCY, {
            agencyId: agencyId
        });
    }

    /**
     * 保存或修改代理信息
     * @param agent
     * @returns {any}
     */
    saveAgent(agent: Agent) {
        return this.httpClient[agent.agencyId ? 'patch' : 'post'](API.AGENCY, agent);
    }

    /**
     * 获得某个代理下的用户列表
     * @param agencyId
     * @returns {Observable<R>}
     */
    getAgentMember(agencyId: number) {
        return this.httpClient.get(API.AGENCY_ADMIN, {
            agencyId: agencyId
        });
    }

    /**
     * 创建管理员
     * @param admin
     * @returns {Observable<R>}
     */
    saveAdmin(admin: Admin) {
        return this.httpClient.post(API.ADMIN, admin);
    }
}

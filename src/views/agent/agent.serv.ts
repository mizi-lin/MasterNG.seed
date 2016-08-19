import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {HttpClient} from '../common/http-client';
import {Agent} from './agent';

import {API} from '../common/const';
import {Admin} from '../admin/admin.model';

@Injectable()
export class AgentServ {

    constructor(private httpClient: HttpClient, private router: Router) {
    }

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
    getAgent(agencyId: number): Observable<any>  {
        return this.httpClient.get(API.AGENCY, {
            agencyId: agencyId
        });
    }

    /**
     * 保存或修改代理信息
     * @param agent
     * @returns {any}
     */
    saveAgent(agent: Agent): Observable<any>  {
        return this.httpClient[agent.agencyId ? 'patch' : 'post'](API.AGENCY, agent);
    }

    /**
     * 获得某个代理下的用户列表
     * @param agencyId
     * @returns {Observable<R>}
     */
    getAgentMember(agencyId: number): Observable<any>  {
        return this.httpClient.get(API.AGENCY_ADMIN, {
            agencyId: agencyId
        });
    }

    /**
     * 创建管理员
     * @param admin
     * @returns {Observable<R>}
     */
    saveAdmin(admin: Admin): Observable<any>  {
        return this.httpClient.post(API.ADMINS, admin);
    }
}

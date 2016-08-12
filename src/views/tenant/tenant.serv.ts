import {Injectable} from '@angular/core';

import {HttpClient} from '../common/http-client';
import {Tenant} from './tenant.model';
import {API} from '../common/const';
import {GLOBAL} from '../common/global';

declare var mu: any, console: any;

@Injectable()
export class TenantServ {

    constructor(private httpClient: HttpClient, private G: GLOBAL) {
    }

    getTenant(tenantId?: number) {
        let search: any = {};
        let url: string = API.TENANTS;

        if(tenantId){
            search.tenantId = tenantId;
        }
        return this.httpClient.get(url, search);
    }

    saveTenant(tenant: Tenant) {
        let method = tenant.tenantId ? 'patch' : 'post';
        return this.httpClient[method](API.TENANTS, tenant);
    }

    /**
     * 租户下的用户
     */

    getTenantUsers(search) {
        return this.httpClient.get(API.TENANTS_USER, search);
    }

    saveTenantUser(user: any) {
        let method = user.userId ? 'patch' : 'post';
        return this.httpClient[method](API.TENANTS_USER, user);
    }

    /**
     * 租户下的活动
     */

    getTenantActivities(search) {
        return this.httpClient.get(API.TENANTS_ACTIVITY, search);
    }

    saveTenantActivity(activity: any) {
        let method = activity.activityId ? 'patch' : 'post';
        return this.httpClient[method](API.TENANTS_ACTIVITY, activity);
    }



}
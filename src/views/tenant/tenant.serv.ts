import {Injectable} from '@angular/core';
import {HttpClient} from '../common/http-client';
import {Tenant} from './tenant.model';
import {API} from '../common/const';
import {GLOBAL} from '../common/global';
import {Observable} from 'rxjs';

declare var mu: any, console: any;

@Injectable()
export class TenantServ {

    constructor(private httpClient: HttpClient, private G: GLOBAL) {
    }

    getTenant(tenantId?: number): Observable<any> {
        let search: any = {};
        let url: string = API.TENANTS;

        if (tenantId) {
            search.tenantId = tenantId;
        }
        return this.httpClient.get(url, search);
    }

    saveTenant(tenant: Tenant): Observable<any> {
        let method = tenant.tenantId ? 'patch' : 'post';
        return this.httpClient[method](API.TENANTS, tenant);
    }

    /**
     * 租户下的用户
     */

    getTenantUsers(search: any): Observable<any> {
        return this.httpClient.get(API.TENANTS_USER, search);
    }

    saveTenantUser(user: any): Observable<any> {
        let method = user.userId ? 'patch' : 'post';
        return this.httpClient[method](API.TENANTS_USER, user);
    }

    getTenantUserSimulator(search: any): Observable<any> {
        return this.httpClient.get(API.TENANTS_USER_SIMULATOR, search);
    }

    /**
     * 租户下的活动
     */

    getTenantActivities(search: any): Observable<any> {
        return this.httpClient.get(API.TENANTS_ACTIVITY, search);
    }

    saveTenantActivity(activity: any): Observable<any> {
        let method = activity.activityId ? 'patch' : 'post';
        return this.httpClient[method](API.TENANTS_ACTIVITY, activity);
    }
}

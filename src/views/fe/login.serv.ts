import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '../common/http-client';

const API_LOGIN = '/services/admin/login';

@Injectable()
export class LoginServ {

    constructor(private httpClient: HttpClient) {
    }

    login(fm: any): Observable<any> {
        return this.httpClient.post(API_LOGIN, fm);
    }
}
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

const API_LOGIN = '/services/admin/login';

@Injectable()
export class LoginServ {

    constructor(private http: Http) {
    }

    login(fm: any): Observable<any> {
        return this.http.post(API_LOGIN, fm)
            .map(this.extractData);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }



}
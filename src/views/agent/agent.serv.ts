import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';

@Injectable()
export class AgentServ {
    constructor(private http: Http, private router: Router) {
    }
}

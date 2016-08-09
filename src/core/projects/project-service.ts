import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from 'src/core/api';


@Injectable()
export class ProjectService {
  projects: Observable<any[]>;

  constructor(api: ApiService) {
    this.projects = api.fetchProjects();
  }
}

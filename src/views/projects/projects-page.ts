import { Component } from '@angular/core';
import { ProjectService } from 'src/core/projects';
import { ProjectListComponent } from './project-list/project-list';


@Component({
  directives: [
    ProjectListComponent
  ],
  selector: 'projects',
  template: `
    <project-list [projects]="projectService.projects"></project-list>
  `
})

export class ProjectsPage {
  constructor(public projectService: ProjectService) {}
}

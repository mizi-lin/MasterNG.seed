import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'project-list',
  styles: [
    require('./project-list.scss')
  ],
  template: require('./project-list.html')
})

export class ProjectListComponent {
  @Input() projects: any[];
}

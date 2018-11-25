import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../classes/projects';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit {

  public project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const projectId: number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(projectId).subscribe(project => this.project = project);
  }
}

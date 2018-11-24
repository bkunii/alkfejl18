import { NewProjectFormComponent } from './../new-project-form/new-project-form.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { ProjectService } from './../services/project.service';
import { Project } from './../classes/projects';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {

  private projects: Project[];
  private ownProjects: Project[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const userId: number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.projectService.getUserProjects(userId).subscribe(projects => this.projects = projects);
    this.projectService.getUserOwnProjects(userId).subscribe(projects => this.ownProjects = projects);
  }

  private openRegDialog(): void {
    const dialogRef = this.dialog.open(NewProjectFormComponent, {
      width: '350px',
    });
  }
}

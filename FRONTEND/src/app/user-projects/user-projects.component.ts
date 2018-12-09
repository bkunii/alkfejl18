import { DialogCreateProjectComponent } from './../dialogs/dialog-create-project/dialog-create-project.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../services/project.service';
import { Project } from './../classes/projects';
import { User } from '../classes/user';
import { currentUser } from '../globals';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: [
    '../common-styles.scss',
    './user-projects.component.scss'
  ]
})
export class UserProjectsComponent implements OnInit {

  private currentUser: User;
  private projects: Project[];
  private ownProjects: Project[];
  public _project: Project;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.refreshLists();
  }

  private refreshLists(): void {
    this.projectService.getUserProjects(currentUser.id).subscribe(projects => this.projects = projects);
    this.projectService.getUserOwnProjects(currentUser.id).subscribe(projects => this.ownProjects = projects);
  }

  private createProject(): void {
    const dialogRef = this.dialog.open(DialogCreateProjectComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(newProject => {
      if (newProject !== undefined) {
        newProject.leader = this.currentUser.id;
        this.projectService.addNewProject(newProject);
        this.refreshLists();
      }
    });
  }
}

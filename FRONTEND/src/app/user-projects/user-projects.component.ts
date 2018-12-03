import { DialogCreateProjectComponent } from './../dialogs/dialog-create-project/dialog-create-project.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { ProjectService } from './../services/project.service';
import { Project } from './../classes/projects';
import { User } from '../classes/user';

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
    private route: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const userId: number = parseInt(this.route.snapshot.paramMap.get('uid'));
    this.userService.getUser(userId).subscribe(user => this.currentUser = user);
    this.projectService.getUserProjects(userId).subscribe(projects => this.projects = projects);
    this.projectService.getUserOwnProjects(userId).subscribe(projects => this.ownProjects = projects);
  }

  createProject(): void {
    const dialogRef = this.dialog.open(DialogCreateProjectComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(newProject => {
      newProject.leader = this.currentUser.id;
      this.projectService.addProject(newProject);
    });
  }
}

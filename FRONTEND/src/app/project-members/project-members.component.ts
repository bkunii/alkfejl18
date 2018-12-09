import { DialogAddMemberComponent } from './../dialogs/dialog-add-member/dialog-add-member.component';
import { MatDialog } from '@angular/material';
import { ProjectService } from './../services/project.service';
import { User } from './../classes/user';
import { UserService } from './../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../classes/projects';

@Component({
  selector: 'app-project-members',
  templateUrl: './project-members.component.html',
  styleUrls: [
    '../common-styles.scss',
    './project-members.component.scss'
  ]
})
export class ProjectMembersComponent implements OnInit {

  public project: Project;
  private assignedUsers: User[];

  private selectedUser: User;
  private userOwnProjects: Project[];
  private userProjects: Project[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const projectId: number = parseInt(this.route.snapshot.paramMap.get('pid'));
    this.projectService.getProject(projectId).subscribe(project => this.project = project);
    this.userService.getUsersByPID(projectId).subscribe(users => this.assignedUsers = users);
  }

  private openAddMemberDialog(): void {
    const dialogRef = this.dialog.open(DialogAddMemberComponent, {
      width: '350px',
      data: this.project
    });

    dialogRef.afterClosed().subscribe(selectedUser => {
      if (!selectedUser) { return; }
      this.projectService.addMemberToProject(this.project.id, selectedUser);
      this.userService.addMembershipToUser(selectedUser, this.project.id);
      this.userService.getUsersByPID(this.project.id).subscribe(users => this.assignedUsers = users);
    });
  }

  private selectUser(user: User): void {
    this.selectedUser = user;
    this.projectService.getUserProjects(user.id).subscribe(projects => this.userProjects = projects);
    this.projectService.getUserOwnProjects(user.id).subscribe(projects => this.userOwnProjects = projects);
  }

  private removeUser(): void {
    this.projectService.removeUserFromProject(this.selectedUser.id, this.project.id);
    this.userService.removeUserFromProject(this.selectedUser.id, this.project.id);
    this.userService.getUsersByPID(this.project.id).subscribe(users => this.assignedUsers = users);
    this.selectedUser = null;
  }
}

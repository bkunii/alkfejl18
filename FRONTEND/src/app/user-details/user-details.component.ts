import { Project } from './../classes/projects';
import { ProjectService } from './../services/project.service';
import { UserService } from './../services/user.service';
import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('selectedUser') public selectedUser: User;
  // tslint:disable-next-line:no-input-rename
  @Input('currentProject') public currentProject: Project;

  private userProjects: Project[];
  private userOwnProjects: Project[];

  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.projectService.getUserProjects(this.selectedUser.id).subscribe(projects => this.userProjects = projects);
    this.projectService.getUserOwnProjects(this.selectedUser.id).subscribe(projects => this.userOwnProjects = projects);
  }

  removeUser(): void {
    this.userService.removeUserFromProject(this.selectedUser.id, this.currentProject.id);
    this.projectService.removeUserFromProject(this.selectedUser.id, this.currentProject.id);
  }
}

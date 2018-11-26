import { ProjectService } from './../services/project.service';
import { Project } from './../classes/projects';
import { User } from './../classes/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UserService } from './../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { global_vars } from '../globals';

export interface DialogData {
  project: Project;
}

@Component({
  selector: 'app-dialog-add-member',
  templateUrl: './dialog-add-member.component.html',
  styleUrls: ['./dialog-add-member.component.scss']
})
export class DialogAddMemberComponent implements OnInit {

  public users: User[];
  public _user: User;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<DialogAddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    let assignedUsers: number[];
    this.projectService.getProjectMembers(this.data.project.id).subscribe(userIds => assignedUsers = userIds);
    this.userService.getOtherUsers(global_vars.currentUser.id).subscribe(users => this.users = users);
    this.users = this.users.filter(user => !assignedUsers.includes(user.id));
    this._user = this.users[0];
  }
}

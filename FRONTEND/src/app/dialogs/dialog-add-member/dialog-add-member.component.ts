import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from './../../classes/user';
import { Project } from './../../classes/projects';
import { ProjectService } from './../../services/project.service';
import { UserService } from './../../services/user.service';
import { global_vars } from '../../globals';

@Component({
  selector: 'app-dialog-add-member',
  templateUrl: './dialog-add-member.component.html',
  styleUrls: [
    '../common-dialog-styles.scss',
    './dialog-add-member.component.scss'
  ]
})
export class DialogAddMemberComponent implements OnInit {

  public users: User[];
  public result: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) { }

  ngOnInit() {
    const userId: number = parseInt(this.route.snapshot.paramMap.get('pid'));
    console.log(userId);
    return;
    let assignedUsers: number[];
    this.projectService.getProjectMembers(this.data.id).subscribe(userIds => assignedUsers = userIds);
    this.userService.getOtherUsers(global_vars.currentUser.id).subscribe(users => this.users = users);
    this.users = this.users.filter(user => !assignedUsers.includes(user.id));
  }
}

import { DialogRegistrationComponent } from './../dialog-registration/dialog-registration.component';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { global_vars } from '../globals';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUser(1).subscribe(user => global_vars.currentUser = user);  // temp
  }

  private openRegDialog(): void {
    const dialogRef = this.dialog.open(DialogRegistrationComponent, {
      width: '350px',
    });
  }
}

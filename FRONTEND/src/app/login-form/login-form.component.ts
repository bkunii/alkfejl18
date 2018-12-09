import { DialogRegistrationComponent } from './../dialogs/dialog-registration/dialog-registration.component';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  private openRegDialog(): void {
    const dialogRef = this.dialog.open(DialogRegistrationComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(user => console.log(user));
  }
}

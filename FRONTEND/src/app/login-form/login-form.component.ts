import { RegistrationFormComponent } from './../registration-form/registration-form.component';
import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  private openRegDialog(): void {
    const dialogRef = this.dialog.open(RegistrationFormComponent, {
      width: '350px',
    });
  }
}

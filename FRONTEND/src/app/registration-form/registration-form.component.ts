import { LoginFormComponent } from './../login-form/login-form.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface RegistrationData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RegistrationFormComponent>) { }

  ngOnInit() {
  }

  private onRegClick(): void {
    this.dialogRef.close();
  }

  private onCancelClick(): void {
    this.dialogRef.close();
  }
}

import { LoginFormComponent } from '../login-form/login-form.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface RegistrationData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.scss']
})
export class DialogRegistrationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogRegistrationComponent>) { }

  ngOnInit() {
  }

  private onRegClick(): void {
    this.dialogRef.close();
  }

  private onCancelClick(): void {
    this.dialogRef.close();
  }
}

import { FormBuilder, Validators } from '@angular/forms';
import { LoginFormComponent } from '../../login-form/login-form.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/classes/user';

export interface RegistrationData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: [
    '../common-dialog-styles.scss',
    './dialog-registration.component.scss'
  ]
})
export class DialogRegistrationComponent implements OnInit {

  private registrationForm = this.fb.group({
    fullName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<DialogRegistrationComponent>,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  private onSubmit(): void {
    const fullName: string = this.registrationForm.get('fullName').value;
    const userName: string = this.registrationForm.get('userName').value;
    const password: string = this.registrationForm.get('password').value;
    const password2: string = this.registrationForm.get('password2').value;

    if (!this.registrationForm.valid) {
      this.snackBar.open('Minden adatot meg kell adni!', 'HIBA', { duration: 2000 });
      return;
    } else if (password !== password2) {
      this.snackBar.open('A két jelszó nem egyezik meg!', 'HIBA', { duration: 2000 });
      return;
    }

    const newUser: User = {
      fullName: fullName,
      userName: userName,
      projects: [],
      ownedProjects: [],
      assignedTasks: [],
      skills: []
    } as User;

    this.userService.registerUser(newUser);
    this.snackBar.open('Sikeres regisztráció.', '', { duration: 2000 });
    this.dialogRef.close();
  }
}

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRegistrationComponent } from './../dialogs/dialog-registration/dialog-registration.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private loginForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() { }

  async onSubmit() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    await this.authService.login('', '');
    this.router.navigate([`users/${this.authService.currentUser.id}/projects`]);
    return;

    // Autentikáció után megcsinálni
    if (this.loginForm.valid) {
      await this.authService.login(username, password);
      this.router.navigate([`/users/${this.authService.currentUser.id}/projects`]);
    }
  }

  private openRegDialog(): void {
    const dialogRef = this.dialog.open(DialogRegistrationComponent, {
      width: '350px'
    });
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogRegistrationComponent } from './dialogs/dialog-registration/dialog-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule, MatGridListModule, MatAutocompleteModule, MatChipsModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserProjectsComponent } from './user-projects/user-projects.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { ProjectMembersComponent } from './project-members/project-members.component';
import { DialogCreateProjectComponent } from './dialogs/dialog-create-project/dialog-create-project.component';
import { DialogAddMemberComponent } from './dialogs/dialog-add-member/dialog-add-member.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DialogRegistrationComponent,
    UserProfileComponent,
    NavbarComponent,
    UserProjectsComponent,
    ProjectTasksComponent,
    ProjectMembersComponent,
    DialogCreateProjectComponent,
    DialogAddMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogRegistrationComponent, DialogCreateProjectComponent, DialogAddMemberComponent]
})
export class AppModule { }

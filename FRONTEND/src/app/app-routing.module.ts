import { UserProjectsComponent } from './user-projects/user-projects.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: 'users/:id/projects', component: UserProjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

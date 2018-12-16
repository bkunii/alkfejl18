import { User } from 'src/app/classes/user';
import { HttpService } from './http.service';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: User = new User('', '', '');

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  public isUserLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  public async login(username: string, password: string): Promise<User> {
    try {
      const token = btoa(`${username}:${password}`);
      window.localStorage.setItem('token', token);

      // const user = await this.httpService.post<User>('login', {}) as User;
      this.currentUser = await this.httpService.get<User>('users/1');

      return Promise.resolve(this.currentUser);
    } catch (e) {
      console.log(e);
      this.currentUser = null;
      window.localStorage.setItem('token', '');
      return Promise.reject();
    }
  }

  public logout() {
    this.currentUser = null;
    window.localStorage.setItem('token', '');
    this.router.navigate(['']);
  }
}

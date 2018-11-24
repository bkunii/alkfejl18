import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USERS: User[];

  constructor() {
    this.USERS = [
      {
        id: 1,
        userName: 'johnny',
        firstName: 'John',
        lastName: 'Doe',
        projects: [100],
        ownedProjects: [100],
        skills: [11, 12, 13],
        assignedTasks: []
      } as User
    ];
  }

  public getUser(id: number): User {
    return this.USERS.find(user => user.id === id);
  }

  public getUsers(): User[] {
    return this.USERS;
  }

  public addUser(user: User): void {
    this.USERS.push(user);
  }
}

import { Observable, of } from 'rxjs';
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
        ownedProjects: [100],
        projects: [101],
        skills: [12, 13],
        assignedTasks: []
      } as User,
      {
        id: 2,
        userName: 'jane',
        firstName: 'Jane',
        lastName: 'Doe',
        ownedProjects: [101],
        projects: [100],
        skills: [11, 12],
        assignedTasks: []
      } as User,
      {
        id: 3,
        userName: 'doki',
        firstName: 'Doctor',
        lastName: 'Strange',
        ownedProjects: [],
        projects: [],
        skills: [11, 13],
        assignedTasks: []
      } as User
    ];
  }

  public getUser(id: number): Observable<User> {
    return of(this.USERS.find(user => user.id === id));
  }

  public getUsers(): User[] {
    return this.USERS;
  }

  public getUsersByPID(projectId: number): Observable<User[]> {
    return of(this.USERS.filter(user => user.projects.includes(projectId)));
  }

  public getOtherUsers(excludedUserId: number): Observable<User[]> {
    return of(this.USERS.filter(user => user.id !== excludedUserId));
  }

  public removeUserFromProject(userId: number, projectId: number): void {
    // tslint:disable-next-line:max-line-length
    this.USERS.find(user => user.id === userId).projects = this.USERS.find(user => user.id === userId).projects.filter(item => item !== projectId);
  }

  public addMembershipToUser(userId: number, projectId: number): void {
    this.USERS.find(user => user.id === userId).projects.push(projectId);
  }

  public addUser(user: User): void {
    this.USERS.push(user);
  }
}

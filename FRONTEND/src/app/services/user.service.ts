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
        fullName: 'John Doe',
        ownedProjects: [100],
        projects: [101],
        skills: [12, 13],
        assignedTasks: []
      } as User,
      {
        id: 2,
        userName: 'jane',
        fullName: 'Jane Doe',
        ownedProjects: [101],
        projects: [100],
        skills: [11, 12],
        assignedTasks: []
      } as User,
      {
        id: 3,
        userName: 'doki',
        fullName: 'Dr. Strange',
        ownedProjects: [],
        projects: [],
        skills: [11, 13],
        assignedTasks: []
      } as User,
      {
        id: 4,
        userName: 'ironman',
        fullName: 'Tony Stark',
        ownedProjects: [],
        projects: [],
        skills: [11, 12, 13],
        assignedTasks: []
      } as User,
      {
        id: 5,
        userName: 'thunder',
        fullName: 'Thor',
        ownedProjects: [],
        projects: [],
        skills: [11, 12, 13],
        assignedTasks: []
      } as User
    ];
  }

  public registerUser(user: User): void {
    user.id = Math.floor(Math.random() * 10000) + 6;
    this.USERS.push(user);
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
}

import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USERS: User[];

  constructor(private httpServie: HttpService) {
    this.USERS = [
      {
        id: 1,
        userName: 'johnny',
        name: 'John Doe',
        ownedProjects: [100],
        projects: [101],
        skills: [12, 13],
        assignedTasks: []
      } as User,
      {
        id: 2,
        userName: 'jane',
        name: 'Jane Doe',
        ownedProjects: [101],
        projects: [100],
        skills: [11, 12],
        assignedTasks: []
      } as User,
      {
        id: 3,
        userName: 'doki',
        name: 'Dr. Strange',
        ownedProjects: [],
        projects: [],
        skills: [11, 13],
        assignedTasks: []
      } as User,
      {
        id: 4,
        userName: 'ironman',
        name: 'Tony Stark',
        ownedProjects: [],
        projects: [],
        skills: [11, 12, 13],
        assignedTasks: []
      } as User,
      {
        id: 5,
        userName: 'thunder',
        name: 'Thor',
        ownedProjects: [],
        projects: [],
        skills: [11, 12, 13],
        assignedTasks: []
      } as User
    ];
  }

  public registerUser(user: User): void {
    console.log(JSON.stringify(user));

    this.httpServie.post('users/new', JSON.stringify(user)).subscribe(result => console.log(result));
  }

  public getUser(id: number): Observable<User> {
    return of(this.USERS.find(user => user.id === id));
  }

  public getUsers(): User[] {
    return this.USERS;
  }

  public getUsersByUIDs(userIds: number[]): Observable<User[]> {
    return of(this.USERS.filter(user => userIds.includes(user.id)));
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

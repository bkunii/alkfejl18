
import { Injectable } from '@angular/core';
import { Project } from './../classes/projects';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private PROJECTS: Project[];

  constructor() {
    this.PROJECTS = [
      {
        id: 100,
        name: 'Főzés',
        leader: 1,
        members: [2],
        tasks: [],
        deadline: new Date('2018-01-01T14:00')
      } as Project,
      {
        id: 101,
        name: 'Mosogatás',
        leader: 2,
        members: [1],
        tasks: [],
        deadline: new Date('2018-01-01T16:00')
      } as Project
    ];
  }

  public getProjects(): Observable<Project[]> {
    return of(this.PROJECTS);
  }

  public getProject(projectId: number): Observable<Project> {
    return of(this.PROJECTS.find(project => project.id === projectId));
  }

  public getUserProjects(userId: number): Observable<Project[]> {
    // console.log(this.PROJECTS);
    return of(this.PROJECTS.filter(project => project.members.includes(userId)));
  }

  public getUserOwnProjects(userId: number): Observable<Project[]> {
    return of(this.PROJECTS.filter(project => project.leader === userId));
  }

  public getProjectMembers(projectId: number): Observable<number[]> {
    return of(this.PROJECTS.find(project => project.id === projectId).members);
  }

  public removeUserFromProject(userId: number, projectId: number): void {
    // tslint:disable-next-line:max-line-length
    this.PROJECTS.find(project => project.id === projectId).members = this.PROJECTS.find(project => project.id === projectId).members.filter(item => item !== userId);
  }

  public addProject(project: Project): void {
    this.PROJECTS.push(project);
  }

  public addMemberToProject(projectId: number, userId: number): void {
    this.PROJECTS.find(project => project.id === projectId).members.push(userId);
  }
}

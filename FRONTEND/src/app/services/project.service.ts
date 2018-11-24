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
        members: [],
        tasks: [],
        deadline: new Date('2018-01-01T14:00')
      } as Project,
      {
        id: 101,
        name: 'Mosogatás',
        leader: 1,
        members: [],
        tasks: [],
        deadline: new Date('2018-01-01T16:00')
      } as Project
    ];
  }

  public getProjects(): Observable<Project[]> {
    return of(this.PROJECTS);
  }

  public getUserProjects(userId: number): Observable<Project[]> {
    return of(this.PROJECTS.filter(project => project.members.includes(userId)));
  }

  public getUserOwnProjects(userId: number): Observable<Project[]> {
    return of(this.PROJECTS.filter(project => project.leader === userId));
  }

  public addProject(project: Project): void {
    this.PROJECTS.push(project);
  }
}

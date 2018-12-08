import { TaskService } from './task.service';

import { Injectable } from '@angular/core';
import { Project } from './../classes/projects';
import { Observable, of } from 'rxjs';
import { Task } from '../classes/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private PROJECTS: Project[];

  constructor(private taskService: TaskService) {
    this.PROJECTS = [
      {
        id: 100,
        name: 'Főzés',
        leader: 1,
        members: [2],
        tasks: [1000, 1001, 1002, 1003, 1004],
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

  public getTasksOfProject(projectId: number): Observable<Task[]> {
    return of(this.taskService.getTasksByIDs(this.PROJECTS.find(project => project.id === projectId).tasks));
  }

  public removeUserFromProject(userId: number, projectId: number): void {
    // tslint:disable-next-line:max-line-length
    this.PROJECTS.find(project => project.id === projectId).members = this.PROJECTS.find(project => project.id === projectId).members.filter(item => item !== userId);
  }

  public removeTaskFromProject(projectId: number, taskId: number): void {
    const project = this.PROJECTS.find(item => item.id === projectId);
    const idx = project.tasks.indexOf(taskId);
    project.tasks.splice(idx, 1);
  }

  public addProject(project: Project): void {
    this.PROJECTS.push(project);
  }

  public addMemberToProject(projectId: number, userId: number): void {
    this.PROJECTS.find(project => project.id === projectId).members.push(userId);
  }
}

import { TaskService } from './task.service';

import { Injectable } from '@angular/core';
import { Project } from './../classes/projects';
import { Observable, of } from 'rxjs';
import { Task } from '../classes/task';
import { HttpService } from './http.service';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private route = 'projects/';
  private PROJECTS: Project[];

  constructor(private httpService: HttpService) { }

  public getAllProjects(): Promise<Project[]> {
    return this.httpService.get<Project[]>(this.route);
  }

  public addNewProject(project: Project): Promise<Project> {
    const json = JSON.stringify({
      name: project.name,
      leaderId: project.leader.id
    });
    console.log(json);

    return this.httpService.post<Project>(this.route + 'new', json);
  }

  public getProject(projectID: number): Promise<Project> {
    return this.httpService.get<Project>(this.route + projectID);
  }

  public deleteProject(projectID: number): Promise<Project> {
    return this.httpService.delete(this.route + projectID);
  }

  public editProject(project: Project): Promise<Project> {
    const json = JSON.stringify(project);
    return this.httpService.put<Project>(this.route + 'edit/' + project.id, json);
  }

  getMembers(projectID: number): Promise<User[]> {
    return this.httpService.get<User[]>(this.route + projectID + '/members');
  }

  addMember(projectID: number, member: User): Promise<User[]> {
    const json = JSON.stringify(member);
    return this.httpService.post<User[]>(this.route + projectID, json);
  }

  removeMember(projectID: number, memberID: number): Promise<User> {
    return this.httpService.post<User>(this.route + projectID + '/removeMember/' + memberID, '{}');
  }
}

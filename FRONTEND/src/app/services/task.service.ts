import { ProjectService } from 'src/app/services/project.service';
import { Observable, of } from 'rxjs';
import { Task } from './../classes/task';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private TASKS: Task[];

  constructor() {
    this.TASKS = [
      {
        id: 1000,
        name: 'NEM',
        requiredSkills: [11],
        assignees: [],
        prerequisites: [],
        following: [1001, 1002],
        requiredBy: [],
        complete: true,
        startTime: new Date('2018-11-29T15:27:00'),
        endTime: new Date('2018-12-03T11:16:00'),
        completedBy: null,
        project: 100,
        state: 2
      } as Task,
      {
        id: 1001,
        name: 'EGY',
        requiredSkills: [11, 12],
        assignees: [1],
        prerequisites: [1000],
        following: [1003],
        requiredBy: [],
        complete: false,
        startTime: new Date('2018-12-04T08:57:00'),
        endTime: null,
        completedBy: null,
        project: 100,
        state: 1
      } as Task,
      {
        id: 1002,
        name: 'KV-T',
        requiredSkills: [11, 13],
        assignees: [],
        prerequisites: [1000, 1004],
        following: [1003],
        requiredBy: [],
        complete: false,
        startTime: null,
        endTime: null,
        completedBy: null,
        project: 100,
        state: 0
      } as Task,
      {
        id: 1003,
        name: '????',
        requiredSkills: [13],
        assignees: [],
        prerequisites: [1000, 1001, 1002],
        requiredBy: [],
        complete: false,
        startTime: null,
        endTime: null,
        completedBy: null,
        project: 100,
        state: 0
      } as Task,
      {
        id: 1004,
        name: 'ISZUNK',
        requiredSkills: [],
        assignees: [],
        prerequisites: [],
        following: [1002],
        requiredBy: [],
        complete: false,
        startTime: null,
        endTime: null,
        completedBy: null,
        project: 100,
        state: 0
      } as Task,
    ];
  }

  public addNewTask(newTask: Task): void {
    if (newTask.prerequisites) {
      this.TASKS.forEach(task => {
        if (newTask.prerequisites.includes(task.id)) {
          task.following.push(newTask.id);
        }
      });
    }
    this.TASKS.push(newTask);
  }

  public getTasksByIDs(taskIds: number[]): Task[] {
    return this.TASKS.filter(task => taskIds.includes(task.id));
  }

  public deleteTask(taskId: number): void {
    this.TASKS.splice(this.TASKS.find(task => task.id === taskId).id, 1);
  }

  public saveTask(task: Task): void {
    this.TASKS.splice(this.TASKS.findIndex(item => item.id === task.id), 1);
    this.TASKS.push(task);
  }
}

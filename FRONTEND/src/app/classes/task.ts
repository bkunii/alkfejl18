import { User } from './user';

export class Task {
  public id: number;
  public name: string;
  public requiredSkills: number[];
  public assignees: number[];
  public prerequisites: number[];
  public following: number[];
  public requiredBy: number[];
  public complete: boolean;
  public startTime: Date;
  public endTime: Date;
  public completedBy: number;
  public project: number;
  public state: number;

  constructor() {
    this.id = Math.floor(Math.random() * 999999);
    this.requiredSkills = [];
    this.assignees = [];
    this.prerequisites = [];
    this.following = [];
    this.complete = false;
    this.state = 1;
  }

  public beginTask(): void {
    this.state = 2;
    this.startTime = new Date();
  }

  public finishTask(byUser: User): void {
    this.complete = true;
    this.completedBy = byUser.id;
    this.state = 3;
    this.endTime = new Date();
  }
}

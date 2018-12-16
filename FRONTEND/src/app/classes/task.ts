import { Skill } from './skill';
import { Project } from 'src/app/classes/projects';
import { User } from './user';

export class Task {
  public id: number;
  public name: string;
  public requiredSkills;
  public assignees: User[];
  public prerequisites: Task[];
  public requiredBy: Task[];
  public complete: boolean;
  public startTime: Date;
  public endTime: Date;
  public completedBy: string;
  public isOpen: boolean;
  public project: Project;
  public projectId: number;
  public state: number;

  constructor() {
    this.requiredSkills = [];
    this.assignees = [];
    this.prerequisites = [];
    this.requiredBy = [];
    this.complete = false;
    this.isOpen = false;
    this.state = 1;
  }
}

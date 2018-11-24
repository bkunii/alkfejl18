
import { Project } from './projects';
import { Skill } from './skill';
import { Task } from './task';

export class User {
  public id: number;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public projects: number[];
  public ownedProjects: number[];
  public skills: number[];
  public assignedTasks: number[];

  // public projects: Project[];
  // public ownedProjects: Project[];
  // public skills: Skill[];
  // public assignedTasks: Task[];
}

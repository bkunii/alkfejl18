
import { Skill } from './skill';
import { User } from './user';

export class Task {
  public id: number;
  public requiredSkills: number[];
  public assignees: number[];
  public prerequisites: number[];
  public requiredBy: number[];
  public complete: boolean;
  public startTime: Date;
  public completionTime: Date;
  public completedBy: number;
  public project: number;

  // public requiredSkills: Skill[];
  // public assignees: User[];
  // public prerequisites: Task[];
  // public requiredBy: Task[];
  // public completedBy: User;
  // public project: Project;
}

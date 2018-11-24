
import { Task } from './task';
import { User } from './user';

export class Skill {
  public id: number;
  public name: string;
  public owners: number[];
  public requiredBy: number[];

  // public owners: User[];
  // public requiredBy: Task[];
}

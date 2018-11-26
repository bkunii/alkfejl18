
import { Task } from './task';
import { User } from './user';

export class Project {
  public id: number;
  public name: string;
  public leader: number;
  public members: number[];
  public tasks: number[];
  public deadline: Date;

  // public leader: User;
  // public members: User[];
  // public tasks: Task[];
}

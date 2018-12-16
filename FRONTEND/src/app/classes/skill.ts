import { User } from 'src/app/classes/user';
import { Task } from 'src/app/classes/task';

export class Skill {
  public id: number;
  public name: string;
  public owners: User[];
  public requiredBy: Task[];

  constructor(name: string) {
    this.name = name;
    this.owners = [];
    this.requiredBy = [];
  }
}

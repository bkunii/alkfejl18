import { User } from './user';

export class Project {
  public id: number;
  public name: string;
  public leader: User;
  public members: number[];
  public tasks: number[];
  public deadline: Date;

  constructor(name: string, leader: User) {
    this.name = name;
    this.leader = leader;
    this.members = [];
    this.tasks = [];
    // this.deadline = null;
  }
}

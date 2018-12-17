import { User } from './user';

export class Project {
  public id: number;
  public name: string;
  public leader: User;
  public leaderId: number;
  public members: number[];
  public tasks: number[];
  public deadline: Date;

  constructor(name: string, leaderId: number) {
    this.name = name;
    this.leaderId = leaderId;
  }
}

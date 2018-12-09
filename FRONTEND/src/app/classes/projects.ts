
export class Project {
  public id: number;
  public name: string;
  public leader: number;
  public members: number[];
  public tasks: number[];
  public deadline: Date;

  constructor() {
    this.id = Math.floor(Math.random() * 999999);
    this.name = '';
    this.members = [];
    this.tasks = [];
  }
}


export class User {
  public id: number;
  public name: string;
  public userName: string;
  public password: string;
  public projects: number[];
  public ownedProjects: number[];
  public skills: number[];
  public assignedTasks: number[];

  constructor(name: string, userName: string, password: string) {
    this.name = name;
    this.userName = userName;
    this.password = password;
  }
}

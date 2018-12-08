
export class Task {
  public id: number;
  public name: string;
  public requiredSkills: number[];
  public assignees: number[];
  public prerequisites: number[];
  public requiredBy: number[];
  public complete: boolean;
  public startTime: Date;
  public endTime: Date;
  public completedBy: number;
  public project: number;
}

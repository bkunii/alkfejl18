import { Injectable } from '@angular/core';
import { Skill } from './../classes/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private SKILLS: Skill[];

  constructor() {
    this.SKILLS = [
      {
        id: 11,
        name: 'Krumplipucolás',
        owners: [],
        requiredBy: []
      } as Skill,
      {
        id: 12,
        name: 'Zabhegyezés',
        owners: [],
        requiredBy: []
      } as Skill,
      {
        id: 13,
        name: 'Mákhintés',
        owners: [],
        requiredBy: []
      } as Skill
    ];
  }

  public getSkillsOfUser(userId: number): Skill[] {
    return this.SKILLS.filter(skill => skill.owners.includes(userId));
  }

  public getSkills(): Skill[] {
    return this.SKILLS;
  }

  public addSkill(skill: Skill): void {
    this.SKILLS.push(skill);
  }
}

import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Skill } from './../classes/skill';
import { User } from '../classes/user';

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
        owners: [2, 3],
        requiredBy: []
      } as Skill,
      {
        id: 12,
        name: 'Zabhegyezés',
        owners: [1, 2],
        requiredBy: []
      } as Skill,
      {
        id: 13,
        name: 'Mákhintés',
        owners: [1, 3],
        requiredBy: []
      } as Skill
    ];
  }

  public getSkillsOfUser(userId: number): Observable<Skill[]> {
    return of(this.SKILLS.filter(skill => skill.owners.includes(userId)));
  }

  public getAllSkills(): Observable<Skill[]> {
    return of(this.SKILLS);
  }

  public addSkillToUser(skillName: string, user: User): Observable<Skill> {
    let skill: Skill = this.SKILLS.find(skl => skl.name === skillName);

    console.log(skill);


    if (skill === undefined) {
      skill = {
        id: Math.floor(Math.random() * 100000),
        name: skillName,
        owners: [user.id],
        requiredBy: []
      } as Skill;
      this.SKILLS.push(skill);
    } else {
      skill.owners.push(user.id);
    }

    return of(skill);
  }
}

import { SkillService } from './../services/skill.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Skill } from '../classes/skill';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    '../common-styles.scss',
    './user-profile.component.scss'
  ]
})
export class UserProfileComponent implements OnInit {

  private currentUser: User;

  private allSkills: Skill[];
  private userSkills: Skill[];

  private myControl = new FormControl();
  private filteredOptions: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    const userId: number = parseInt(this.route.snapshot.paramMap.get('uid'), 10);
    this.userService.getUser(userId).subscribe(user => this.currentUser = user);

    this.skillService.getSkillsOfUser(this.currentUser.id).subscribe(skills => this.userSkills = skills);
    this.skillService.getAllSkills().subscribe(skills => this.allSkills = skills);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0).map(skill => skill.name);
  }

  public keypress($event: any): void {
    if ($event.keyCode === 13) {
      this.skillService.addSkillToUser($event.target.value, this.currentUser).subscribe(skill => {
        this.currentUser.skills.push(skill.id);
        this.skillService.getSkillsOfUser(this.currentUser.id).subscribe(skills => this.userSkills = skills);
      });
      $event.target.value = '';
    }
  }
}

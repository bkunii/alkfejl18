import { SkillService } from './../services/skill.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Skill } from '../classes/skill';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { global_vars } from '../globals';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private currentUser: User = global_vars.currentUser;

  private allSkills: Skill[];
  private userSkills: Skill[];

  private myControl = new FormControl();
  private filteredOptions: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUser(1).subscribe(user => global_vars.currentUser = user);  // temp

    this.userSkills = this.skillService.getSkillsOfUser(this.currentUser.id);
    this.allSkills = this.skillService.getSkills();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0).map(skill => skill.name);
  }
}

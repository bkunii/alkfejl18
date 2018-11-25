import { SkillService } from './../services/skill.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Skill } from '../classes/skill';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private currentUser: User;
  public skills: Skill[];

  public myControl = new FormControl();
  public filteredOptions: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private skillService: SkillService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // tslint:disable-next-line:radix
    const userId: number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(userId).subscribe(user => this.currentUser = user);
    // this.skills = this.skillService.getSkillsOfUser(userId);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.skills.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0).map(skill => skill.name);
  }
}

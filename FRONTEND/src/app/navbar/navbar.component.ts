import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../classes/projects';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('project') public projectId: Project;

  constructor() { }

  ngOnInit() { }

}

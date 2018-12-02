import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../classes/projects';
import { global_vars } from '../globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private uid: number;
  private pid: number;
  private currentUserId: number = global_vars.currentUser.id;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.pid = parseInt(this.route.snapshot.paramMap.get('pid'), 10);
    this.uid = parseInt(this.route.snapshot.paramMap.get('uid'), 10);
  }
}

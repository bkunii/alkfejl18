import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private uid: number;
  private pid: number;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.pid = parseInt(this.route.snapshot.paramMap.get('pid'), 10);
    this.uid = parseInt(this.route.snapshot.paramMap.get('uid'), 10);
  }
}

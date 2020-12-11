import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'app-nav-settings',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  UserInfo: any = {};

  constructor(private authService: AuthenticationService) {
    this.UserInfo = this.authService.currentUserValue;
  }

  ngOnInit(): void {
  }

}

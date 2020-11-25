import { Component } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  UserInfo: any = {};

  constructor(private userService: UserService, private authService: AuthenticationService) {
      this.UserInfo = this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loadingUserInfo = false;
  userInfo: any;
  AvatarURL: string;

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadingUserInfo = true;

    this.userService.getUser().pipe(first()).subscribe((users: any) => {
      this.loadingUserInfo = false;
      this.userInfo = users.user;
      this.AvatarURL = 'http://localhost:8000/storage/avatars/' + users.user.id + '/' + users.user.avatar;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}

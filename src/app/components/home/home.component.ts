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

  loading = false;
  user: User[];

  constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUser().pipe(first()).subscribe(users => {
      this.loading = false;
      this.user = users;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}

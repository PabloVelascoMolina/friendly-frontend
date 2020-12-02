import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { UserService } from '../../../_services/user.service';
import { CreateComponent } from '../posts/create/create.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  UserInfo: any = {};
  @ViewChild('CreatePostModal', { static: false }) CreatePostModal: CreateComponent;


  constructor(private userService: UserService, private authService: AuthenticationService) {
      this.UserInfo = this.authService.currentUserValue;
  }

  openModal() {
    this.CreatePostModal.open();
  }

  logout() {
    this.authService.logout();
  }
}

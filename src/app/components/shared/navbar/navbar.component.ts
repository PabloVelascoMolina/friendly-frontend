import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { UserService } from '../../../_services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  isAuthenticated = false;
  userInfo: any;
  loadingUserInfo = false;
  AvatarURL: string;

  constructor(private userService: UserService, private authService: AuthenticationService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadingUserInfo = true;
    if (this.isAuthenticated == true) {
      this.userService.getUser().pipe(first()).subscribe((users: any) => {
        this.loadingUserInfo = false;
        this.userInfo = users.user;
        this.AvatarURL = 'http://localhost:8000/storage/avatars/' + users.user.id + '/' + users.user.avatar;
      });
    }
  }

  ngAfterViewChecked(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.cdRef.detectChanges();
  }

  logout() {
    this.authService.logout();
  }
}

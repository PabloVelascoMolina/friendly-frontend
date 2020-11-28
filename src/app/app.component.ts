import { Component, ChangeDetectorRef, AfterViewChecked, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { HttpLoaderService } from './_services/http-loader.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  currentUser: User;
  isAuthenticated = false;
  state = true;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cdRef: ChangeDetectorRef,
    private httpLoaderService: HttpLoaderService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.httpLoaderService.asObservable().subscribe((e) => (this.state = e));
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && this.isAuthenticated) {
        if (this.currentUser.avatar == '' && event.url !== '/register/photo') {
          this.router.navigate(['/register/photo']);
        } else if (event.url == '/register/photo' && this.currentUser.avatar !== '') {
          this.router.navigate(['/home']);
        }
      }
    })
  }


  ngAfterViewChecked(): void {
    this.isAuthenticated = this.authenticationService.isAuthenticated;
    this.cdRef.detectChanges();
  }
}

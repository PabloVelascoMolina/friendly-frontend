import { Component, ChangeDetectorRef, AfterViewChecked, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  }


  ngAfterViewChecked(): void {
    this.isAuthenticated = this.authenticationService.isAuthenticated;
    this.cdRef.detectChanges();
  }
}

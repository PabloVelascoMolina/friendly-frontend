import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: {email: ''};
  userProfileLoading: boolean;

  constructor(private router: ActivatedRoute, private userService: UserService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.router.params.subscribe((params) => {
         const id = params.id;
         this.Profile(id);
      })
  }


  Profile( id: number ) {
    this.userProfileLoading = true;

    this.userService.getUserProfile(id).subscribe((data: any) => {
      this.user = data;
      this.userProfileLoading = false;
    });
  }
}

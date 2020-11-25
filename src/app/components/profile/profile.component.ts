import { Component, ChangeDetectorRef, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';


import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewChecked {

  user: {email: ''};
  userProfileLoading: boolean;

  constructor(private router: ActivatedRoute, private userService: UserService, private cdRef: ChangeDetectorRef) {
    //this.Profile();
  }

  ngOnInit(): void {
    console.log('asd');
    //this.Profile();
  }


  Profile() {
    console.log('repeat');
    this.userProfileLoading = true;

    let id = this.router.snapshot.params['id'];
    this.userService.getUserProfile(id).subscribe((data: any) => {
      this.user = data;
      this.userProfileLoading = false;
    });
  }

  ngAfterViewChecked(): void {

    this.cdRef.detectChanges();
  }

}

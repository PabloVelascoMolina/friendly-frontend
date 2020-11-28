import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';
import { environment } from '../../../environments/environment';
import { User } from '../../_models/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: { id: '', name: '', email: '', avatar: ''};
  userProfileLoading: boolean;
  coverTest: string;
  UserInfo: any = {};
  routeId: number;
  FileData: any;
  currentUser: User;
  public imagePath;
  imgURL: any;
  public message: string;
  disabled: boolean;
  uploadText: string;

  constructor(private http: HttpClient, private router: ActivatedRoute, private userService: UserService, private cdRef: ChangeDetectorRef, private authService: AuthenticationService) {
    this.UserInfo = this.authService.currentUserValue;
  }

  ngOnInit(): void {
      this.router.params.subscribe((params) => {
        const id = params.id;
        this.routeId = params.id;
        this.Profile(id);
        this.coverTest = 'https://images.unsplash.com/photo-1605530681433-b11727bb4476?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

      })
  }


  Profile( id: number ) {
    this.userProfileLoading = true;

    this.userService.getUserProfile(id).subscribe((data: any) => {
      this.user = data;
      this.userProfileLoading = false;
      this.imgURL = this.user.avatar;
    });
  }

  fileEvent(e) {
    this.FileData = e.target.files[0];
  }

  updatedAvatar() {
    var formData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    formData.append('image', this.FileData);

    this.http.post(`${environment.apiUrl}/api/upload-photo`, formData, {
      headers: headers
    }).subscribe((data: any) => {
      this.authService.currentUser.subscribe(x => this.currentUser = x);

      let local = JSON.parse(localStorage.getItem('currentUser')) || {};
      if (!local['avatar']) {
        local['avatar'] += data.url;
      }
      localStorage.setItem('currentUser', JSON.stringify(local));

    });
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    this.uploadText = this.imagePath[0].name;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

}

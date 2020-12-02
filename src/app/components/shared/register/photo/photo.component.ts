import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { User } from '../../../../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  FileData: any;
  currentUser: User;
  public imagePath;
  imgURL: any;
  public message: string;
  disabled: boolean;
  uploadText: string;

  fileEvent(e) {
    this.FileData = e.target.files[0];
  }

  constructor(private http: HttpClient, private route: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.disabled = true;
    this.uploadText = 'Cargar imagen...';
  }

  onSubmit(f: NgForm) {

    var formData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    formData.append('image', this.FileData);

    this.http.post(`${environment.apiUrl}/upload-photo`, formData, {
      headers: headers
    }).subscribe((data: any) => {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.disabled = true;

      let local = JSON.parse(localStorage.getItem('currentUser')) || {};
      if (!local['avatar']) {
        local['avatar'] += data.url;
      }
      localStorage.setItem('currentUser', JSON.stringify(local));

      this.route.navigate(['/home']);
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
      this.disabled = false;
    }
  }

}

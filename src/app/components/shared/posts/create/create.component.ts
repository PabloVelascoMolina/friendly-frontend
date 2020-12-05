import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { PostsService } from '../../../../_services/posts.service';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { NotificationService } from '../../../../_services/notification.service';
import { NotificationType } from '../../../../_models/notification';
import { LocationService } from '../../../../_services/location.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('CreatePostModal', { static: false }) modal: ElementRef;
  @ViewChild("Description") Description: ElementRef;

  postForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  UserInfo: any = {};
  description: '';
  contry: string;
  FileData: any;
  public imagePath;
  imgURL: any;
  public message: string;
  uploadText: string;

  fileEvent(e) {
    this.FileData = e.target.files[0];
  }

  constructor(private formBuilder: FormBuilder, private _postService: PostsService, private router: Router, private route: ActivatedRoute, private authService: AuthenticationService, private _notificationService: NotificationService, private _locationService: LocationService) {
    this.UserInfo = this.authService.currentUserValue;
    this.uploadText = 'Cargar imagen...';
  }

  ngOnInit(): void {
    let ini = document.querySelector('.create-modal');
    ini.classList.add("hideModal");

    this.postForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(350)]]
    });

  }

  open() {
    this.modal.nativeElement.style.display = 'block';
    this.Description.nativeElement.focus();
    this.DetectLocationService(this.UserInfo.ip);
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
    let m = document.querySelector('.create-modal');
    m.classList.remove("showModal");
  }

  get f() { return this.postForm.controls; }

  onSubmit() {

    var formData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    formData.append('image', this.FileData);
    if (this.FileData !== undefined) {
      this.FileData = this.FileData;
    } else {
      this.FileData = null;
    }


    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    this.loading = true;
    this._postService.getAddedPost(this.f.description.value, this.contry, this.FileData, this.UserInfo.id, { headers })
      .pipe(first())
      .subscribe({
        next: (post) => {
          this.onRefresh();
          //this.close();
          this._notificationService.sendMessage({
            message: 'Has creado una nueva publicación.',
            type: NotificationType.success,
          });
          //this.loading = false;
          console.log(post);
        },
        error: error => {
          this.error = error;
          this.loading = false;
          console.log(error);
        }
      });
  }

  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };

    let currentUrl = this.router.url + '?';

    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  DetectLocationService(ip: string) {
    return this._locationService.getLocation(ip).pipe(first()).subscribe({
        next: (data) => {
          this.contry = data.geo.city;
        },
        error: error => {
          console.log(error);
        }
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

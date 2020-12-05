import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/operators';

import { PostsService } from '../../../../_services/posts.service';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { NotificationService } from '../../../../_services/notification.service';
import { NotificationType } from '../../../../_models/notification';
import { LocationService } from '../../../../_services/location.service';
import { TenorService } from '../../../../_services/tenor.service';
import { environment } from '../../../../../environments/environment';


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
  Tenor: any[] = [];
  ViewTenorPanel: boolean;

  fileEvent(e) {
    this.FileData = e.target.files[0];
  }

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private _postService: PostsService, private _tenorService: TenorService, private router: Router, private route: ActivatedRoute, private authService: AuthenticationService, private _notificationService: NotificationService, private _locationService: LocationService) {
    this.UserInfo = this.authService.currentUserValue;
    this.uploadText = 'Cargar imagen...';
  }

  ngOnInit(): void {
    let ini = document.querySelector('.create-modal');
    ini.classList.add("hideModal");

    this.postForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(350)]],
      image: [null]
    });

    this.TenorView();

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

    console.log(this.postForm.value);
    var formData: any = new FormData();
    formData.append("description", this.postForm.get('description').value);
    formData.append("image", this.postForm.get('image').value);
    formData.append("category", this.contry);
    formData.append("user_id", this.UserInfo.id);

    this.http.post(`${environment.apiUrl}/posts`, formData).subscribe(
      (response) => {
        this.close();
        this.onRefresh();
        this._notificationService.sendMessage({
          message: 'Has creado una nueva publicación.',
          type: NotificationType.success,
        });
        this.loading = false;
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    )
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

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({
      image: file
    });
    this.postForm.get('image').updateValueAndValidity()
  }

  TenorView() {
    this._tenorService.getTenorTrending().subscribe((data) => {
      this.Tenor = data.results;
    });
  }
}

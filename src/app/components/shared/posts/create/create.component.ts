import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private _postService: PostsService, private router: Router, private route: ActivatedRoute, private authService: AuthenticationService, private _notificationService: NotificationService, private _locationService: LocationService) {
    this.UserInfo = this.authService.currentUserValue;
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

    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    this.loading = true;
    this._postService.getAddedPost(this.f.description.value, this.contry, '', this.UserInfo.id)
      .pipe(first())
      .subscribe({
        next: (post) => {
          this.onRefresh();
          this.close();
          this._notificationService.sendMessage({
            message: 'Has creado una nueva publicación.',
            type: NotificationType.success,
          });
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

}

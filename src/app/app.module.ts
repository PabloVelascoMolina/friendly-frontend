import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ToastrModule } from 'ngx-toastr';
import { IvyCarouselModule } from 'angular-responsive-carousel';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { ProductsComponent } from './components/shared/products/products.component';
import { InfiniteScrollModule } from '@thisissoon/angular-infinite-scroll';
import { PeopleComponent } from './components/shared/people/people.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { DontputPipe } from './_pipes/dontput.pipe';
import { PostsComponent } from './components/shared/posts/posts.component';
import { PlanComponent } from './components/shared/plan/plan.component';
import { NoimagePipe } from './_pipes/noimage.pipe';
import { PhotoComponent } from './components/shared/register/photo/photo.component';
import { UsernamePipe } from './_pipes/username.pipe';
import { AvatarPipe } from './_pipes/avatar.pipe';
import { PhotosComponent } from './components/shared/photos/photos.component';
import { CreateComponent } from './components/shared/posts/create/create.component';
import { CropperImageModalComponent } from './components/shared/modal/cropper-image-modal/cropper-image-modal.component';
import { LikesComponent } from './components/shared/posts/likes/likes.component';
import { TimePipe } from './_pipes/time.pipe';
import { OptionsComponent } from './components/shared/posts/options/options.component';
import { AppearanceComponent } from './components/settings/appearance/appearance.component';
import { NavComponent } from './components/settings/nav/nav.component';
import { HomeSettingsComponent } from './components/settings/home.component';
import { SettingsSecurityComponent } from './components/settings/security/security.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NavbarComponent,
		FooterComponent,
		LoginComponent,
		RegisterComponent,
		ProductsComponent,
		PeopleComponent,
		ProfileComponent,
		ModalComponent,
		DontputPipe,
		PostsComponent,
		PlanComponent,
		NoimagePipe,
		PhotoComponent,
		UsernamePipe,
		AvatarPipe,
		PhotosComponent,
		CreateComponent,
		CropperImageModalComponent,
		LikesComponent,
		TimePipe,
		OptionsComponent,
		AppearanceComponent,
		NavComponent,
    HomeSettingsComponent,
    SettingsSecurityComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    ImageCropperModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true
    }),
    NgxSkeletonLoaderModule.forRoot(),
    IvyCarouselModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
	bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { PhotoComponent } from './components/shared/register/photo/photo.component';
import { AppearanceComponent } from './components/settings/appearance/appearance.component';
import { ProfileSettingsComponent } from './components/settings/profile/profile.component';
import { HomeSettingsComponent } from './components/settings/home.component';
import { SettingsSecurityComponent } from './components/settings/security/security.component';


import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'register/photo', component: PhotoComponent, canActivate: [AuthGuard] },
  {
    path: 'settings',
    component: HomeSettingsComponent,
    children: [
      { path: 'appearance', component: AppearanceComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileSettingsComponent, canActivate: [AuthGuard] },
      { path: 'security', component: SettingsSecurityComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

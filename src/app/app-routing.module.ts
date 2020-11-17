import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/shared/login/login.component';

import { AuthGuard } from './_helpers/auth.guard';
let userLang = navigator.language.toLowerCase();
console.log(userLang);
const routes: Routes = [
  { path: userLang + '/home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: userLang + '/login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: userLang + '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

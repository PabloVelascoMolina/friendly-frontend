import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private route: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/login`, { email, password })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user.data));
        this.currentUserSubject.next(user.data);
        return user;
      }));
  }

  register(name: string, email:string, password:string, c_password:string) {
    return this.http.post<any>(`${environment.apiUrl}/api/register`, {name, email, password, c_password})
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user.data));
        this.currentUserSubject.next(user.data);
        console.log(user.data);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.route.navigate(['/login']);
  }

  get isAuthenticated(): boolean {
    return !!(this.currentUserValue);
  }

}

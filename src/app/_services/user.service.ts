import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Product } from '../_models/product';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/api/products`);
  }

  getUser() {
    return this.http.get<User[]>(`${environment.apiUrl}/api/user`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenorService {
  constructor(private http: HttpClient) { }

  getTenorTrending() {
    return this.http.get<any>(`https://api.tenor.com/v1/search?q=excited&key=7CWWI9EFSLRR&limit=8`);
  }
}

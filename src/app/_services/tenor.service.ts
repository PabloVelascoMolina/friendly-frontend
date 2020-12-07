import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenorService {
  constructor(private http: HttpClient) { }

  getTenorTrending() {
    return this.http.get<any>(`https://api.giphy.com/v1/gifs/trending?api_key=8Z3ak7URwLr2NJe6sGHlyA7JU91MargL`);
  }
}

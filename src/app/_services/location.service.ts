import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(private http: HttpClient) {}

  getLocation(ip: string) {
    return this.http.get<any>(`https://api.astroip.co/${ip}?api_key=b6c7940d-febe-4191-ac3d-a91b3a375697`);
  }
}

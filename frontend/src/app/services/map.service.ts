import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { forkJoin, Observable,Subject,of, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  authDomain = environment.authAPI;
  ledgerDomain = environment.ledgerAPI;
  geocodingDomain = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  mapAPIkey = 'AIzaSyDzjuXUKgTu4BjnL66oUP0jiGz30zuSuaM';

  constructor(private http: HttpClient) { }

  //Get the lat and long of the provided address
  getGeocode(address) {
    console.log("Inside map service");
    return this.http.get<JSON>(this.geocodingDomain + address + '&key=' + this.mapAPIkey);
  }

  //Get all the users
  getUsers() {
    
  }

}

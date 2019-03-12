import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { forkJoin, Observable,Subject,of, interval } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authDomain = environment.authAPI;
  ledgerDomain = environment.ledgerAPI
  authToken;
  adminReturn
  consumerReturn
  producerReturn
  activeProfile
  activeProfileType

  profileOb$: Observable<any>;
  private profileSubject: Subject<any>;
  loginOb$ : Observable<any>;
  private loginSubject : Subject<any>;

  constructor(private http: HttpClient) { }

  login(user) {
    console.log("inside auth service, trying to login: ", user);
    return this.http.post<JSON>(this.authDomain+'/UserAccounts/login', user);
  }
  
  loggedIn(){
    return true;
  }

  getProfile(email) {
    this.adminReturn= this.http.get<JSON>(this.ledgerDomain +'gridly.admin.Admin'+'?filter[where][email]='+email);
    this.consumerReturn = this.http.get<JSON>(this.ledgerDomain + 'gridly.consumer.Consumer'+'?filter[where][email]='+email);
    this.producerReturn = this.http.get<JSON>(this.ledgerDomain + 'gridly.producer.Producer'+'?filter[where][email]='+email);
    return forkJoin([this.adminReturn,this.consumerReturn,this.producerReturn]);
  }

  storeUserData(token){
    localStorage.setItem('token', token);
    //localStorage.setItem('userAccount', JSON.stringify(userAccount))
    this.authToken = token;
  }

  getActiveProfile(){
    return this.activeProfile;
  }

  setActiveProfile(profile){
    this.activeProfile = profile;
    console.log("auth service set activeProfile is: ", this.activeProfile);
    //this.profileSubject.next(profile);
  }

  getActiveProfileType(){
    return this.activeProfileType;
  }

  setActiveProfileType(profileType){
    this.activeProfileType = profileType;
    console.log("auth service activeProfileType is: ", this.activeProfileType);
  }
}

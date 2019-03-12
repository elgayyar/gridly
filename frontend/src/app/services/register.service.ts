import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { forkJoin, Observable,Subject,of, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  authDomain = environment.authAPI;
  ledgerDomain = environment.ledgerAPI;

  constructor(private http: HttpClient) { }

  //POST a new user account to the AUTHENTICATION server
  registerUserAccount(account) {
    console.log("Inside register service trying to register new user account: ", account);
    return this.http.post<JSON>(this.authDomain+ '/UserAccounts', account);
  }

  //POST a new consumer in HYPERLEDGER
  registerConsumer(consumer) {
    console.log("Inside register service trying to register new consumer: ", consumer);
    return this.http.post<JSON>(this.ledgerDomain+'/gridly.consumer.Consumer', consumer);
  }

  //POST a new producer in HYPERLEDGER
  registerProducer(producer) {
    console.log("Inside register service trying to register new producer: ", producer);
    return this.http.post<JSON>(this.ledgerDomain+'/gridly.producer.Producer', producer);
  }

  //Update a consumers profile
  updateConsumer(consumer, email) {
    return this.http.put<JSON>(this.ledgerDomain+'/gridly.consumer.Consumer/'+ email, consumer);
  }

  //Update a producers profile
  updateProducer(producer, email) {
    return this.http.put<JSON>(this.ledgerDomain+'/gridly.producer.Producer/'+ email, producer);
  }

  //Add a battery to a producers profile
  addBattery(producer, email) {
    return this.http.put<JSON>(this.ledgerDomain+'/gridly.producer.Producer/'+ email, producer);
  }

}

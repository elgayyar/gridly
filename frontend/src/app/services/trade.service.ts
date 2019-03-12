import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { forkJoin, Observable,Subject,of, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TradeService {

  authDomain = environment.authAPI;
  ledgerDomain = environment.ledgerAPI;

  constructor(private http: HttpClient) {

  }

  //GET all consumers
  getAllConsumers() {
    return this.http.get<JSON>(this.ledgerDomain + '/gridly.consumer.Consumer');
  }

}

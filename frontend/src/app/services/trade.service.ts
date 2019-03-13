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

  postTrade(txn) {
    console.log("POST TRADE: ", txn);
    return this.http.post<JSON>(this.ledgerDomain+'gridly.trade.Trade', txn);
  }

  updateProducer(producer){
    console.log("UPDATE PRODUCER: ", producer);
    return this.http.put<JSON>(this.ledgerDomain+'/gridly.producer.Producer/'+ producer.email, producer);
  }

}

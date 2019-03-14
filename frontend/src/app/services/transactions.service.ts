import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { forkJoin, Observable,Subject,of, interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  ledgerDomain = environment.ledgerAPI;
  buyerReturn
  sellerReturn

  constructor(private http: HttpClient) { }
  
  getBuyerTransactions(email){
    let at = /@/gi;
    let newEmail = email.replace(at, "%40");
    console.log(newEmail);
    return this.http.get<JSON>(this.ledgerDomain+'gridly.trade.Trade'+'?filter[where][buyer]=resource%3Agridly.consumer.Consumer%23'+newEmail);
  }
  getSellerTransactions(email){
    let at = /@/gi;
    let newEmail = email.replace(at, "%40");
    console.log(newEmail);
    return this.http.get<JSON>(this.ledgerDomain+'gridly.trade.Trade'+'?filter[where][seller]=resource%3Agridly.producer.Producer%23'+newEmail);
  }
  getBuyerProfile(buyerEmail){
    return this.http.get<JSON>(this.ledgerDomain + 'gridly.consumer.Consumer'+'?filter[where][email]='+buyerEmail);
  }
  getSellerProfile(sellerEmail){
    return this.http.get<JSON>(this.ledgerDomain + 'gridly.producer.Producer'+'?filter[where][email]='+sellerEmail);
  }

}

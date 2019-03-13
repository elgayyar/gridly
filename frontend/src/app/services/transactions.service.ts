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
  getAllTransactions(email){
    this.buyerReturn = this.http.get<JSON>(this.ledgerDomain+'gridly.trade.Trade'+'?filter[where][buyer]='+email);
    this.sellerReturn = this.http.get<JSON>(this.ledgerDomain+'gridly.trade.Trade'+'?filter[where][seller]='+email);
    return forkJoin([this.buyerReturn,this.sellerReturn]);
  }
}

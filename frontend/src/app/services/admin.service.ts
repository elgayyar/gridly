import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  ledgerDomain = environment.ledgerAPI;
  
  constructor(private http: HttpClient) { }

  getAllTransactions(){
    return this.http.get<JSON>(this.ledgerDomain+'/gridly.trade.Trade');
  }
}

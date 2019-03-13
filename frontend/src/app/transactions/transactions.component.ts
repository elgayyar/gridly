import { Component, OnInit } from '@angular/core';
import {TransactionsService} from '../services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private transactionService: TransactionsService) { 
  }
  transactionsList: any[] = [];
  displayedColumns: string[] = ['Time', 'Quantity', 'Unit Price', 'Total Price'];
  userProfile;
  email

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    
    this.email = this. userProfile.email
    console.log ("retrieving all transactions of email: ", this.email);
    
    this.transactionService.getAllTransactions(this.email).subscribe(res => {
      console.log("transaction service, getAllTransactions returned: ", res);
      for (let result of res){
        if (result[0]){
          this.transactionsList = result[0];
          break;
        }
      }
      console.log(this.transactionsList);
      console.log(this.transactionsList[0].timestamp);
    });
  }
}

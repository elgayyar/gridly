import { Component, OnInit, ViewChild } from '@angular/core';
import {TransactionsService} from '../services/transactions.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';




@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  providers: [NgxChartsModule]

})
export class TransactionsComponent implements OnInit {

  constructor(private transactionService: TransactionsService, private authService: AuthService) { }
  isLoading = true;
  transactionsList: any[] = [];
  displayedColumns: string[] = ['timestamp','buyer','electricityQuantity', 'unitElectricityPrice', 'totalPrice'];
  userProfile;
  role
  email
  dataSource
  buyerFirstName;
  buyerLastName;
  sellerFirstName;
  sellerLastName;
  buyerName;
  sellerName;
  isConsumer = true;
  replacedTime: string;

  @ViewChild(MatSort) sort: MatSort;
  
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Quantity';
  timeline = true;
  view: any[] = [500, 500];
  colorScheme = {domain: ['#B00F3B', '#373B46', '#003366']};
  autoScale = true;
  legend = false;
  public multi = [
    {
      "name": "Transaction Record",
      "series": [
      ]
    }
  ]
 

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    this.role= localStorage.getItem("activeProfileType");
    console.log(this.role);
    this.email = this.userProfile.email;
    this.transactionsList= [];
    
    if (this.role ==="consumer"){
    this.transactionService.getBuyerTransactions(this.email,).subscribe(res => {
      console.log("transaction service, getBuyerTransactions returned: ", res);
      this.transactionsList = JSON.parse(JSON.stringify(res));
      this.reformatTimeStamp();

      console.log(this.transactionsList);
      this.dataSource=new MatTableDataSource(this.transactionsList);
      this.dataSource.sort = this.sort;
      this.makeGraph();
      this.isConsumer = true;
      this.getSellerNames();
      this. displayedColumns = ['timestamp', 'seller', 'electricityQuantity', 'unitElectricityPrice', 'totalPrice'];
    });
    } else {
      this.transactionService.getSellerTransactions(this.email,).subscribe(res => {
        console.log("transaction service, getSellerTransactions returned: ", res);
        this.transactionsList = JSON.parse(JSON.stringify(res));
        this.reformatTimeStamp();
  
        console.log(this.transactionsList);
        this.dataSource=new MatTableDataSource(this.transactionsList);
        this.dataSource.sort = this.sort;
        this.makeGraph()
        this.isConsumer = false;
        this.getBuyerNames();
        this. displayedColumns = ['timestamp', 'buyer', 'electricityQuantity', 'unitElectricityPrice', 'totalPrice'];
      })
      };
  }
  makeGraph(){
    console.log("in makeGraph");
    this.transactionsList.forEach(e => {
      let graphData = {
        "name": e.timestamp,
        "value": e.electricityQuantity
      }
      this.multi[0].series.push(graphData);
    });
    console.log(this.multi);
    this.multi = [...this.multi];
  }

  reformatTimeStamp(){
    this.transactionsList.forEach(e => {
      let T = /T/gi;
      this.replacedTime = e.timestamp.replace(T, " ");
      console.log ("replaced Time: ", this.replacedTime);
      let splicedTime = this.replacedTime.slice(0, -8) 
      console.log ("spliced Time: ", splicedTime);
      e.timestamp = splicedTime;
    })
  }

  getBuyerNames(){
      this.transactionsList.forEach(e => {
        let buyerEmail = e.buyer.slice(34);
        console.log("buyerEmail: ", buyerEmail);
        
        this.transactionService.getBuyerProfile(buyerEmail).subscribe(res =>{
          let buyer = JSON.parse(JSON.stringify(res));
          this.buyerFirstName = buyer[0].fname;
          this.buyerLastName = buyer[0].lname;
          this.buyerName = this.buyerFirstName + " " + this.buyerLastName;
          console.log("buyername: ", this.buyerName);
          e.buyer = this.buyerName;
          console.log("e.buyer: ", e.buyer);
        })
        //this.updateDataSource();
      });
      this.isLoading=false;
  }
  
  getSellerNames(){
    this.transactionsList.forEach(e => {
      let sellerEmail = e.seller.slice(34);
      console.log("sellerEmail: ", sellerEmail);
      
      this.transactionService.getSellerProfile(sellerEmail).subscribe(res =>{
        let seller = JSON.parse(JSON.stringify(res));
        this.sellerFirstName = seller[0].fname;
        this.sellerLastName = seller[0].lname;
        this.sellerName = this.sellerFirstName + " " + this.sellerLastName;
        console.log("sellername: ", this.sellerName);
        e.seller = this.sellerName;
      })
      //this.updateDataSource();
    });
    this.isLoading=false;
  }

  updateDataSource(){
    console.log("within update data source");
    this.dataSource=this.transactionsList;
    this.dataSource.sort = this.sort;
    console.log("updated dataSource: ", this.dataSource);
  }
}

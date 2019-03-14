import { AdminService } from '../services/admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {TransactionsService} from '../services/transactions.service';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  constructor(private adminService: AdminService, private transactionService: TransactionsService) { }
  isLoading = true;
  transactionsList: any[] = [];
  displayedColumns: string[] = ['timeStamp','buyer', 'seller', 'electricityQuantity', 'unitElectricityPrice', 'totalPrice'];
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
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  /* showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Quantity (kWh)';
  timeline = true;
  view: any[] = [500, 500];
  colorScheme = {domain: ['#B00F3B', '#373B46', '#003366']};
  autoScale = true;
  legend = false;
  public multi = [
    {
      "name": "Quantity (kWh)",
      "series": [
      ]
    }
  ] */
 

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    this.role= localStorage.getItem("activeProfileType");
    console.log(this.role);
    this.email = this.userProfile.email;
    this.transactionsList= [];


   this.adminService.getAllTransactions().subscribe(res => {
     console.log("admin service, getAllTransactions returned: ", res);
     this.transactionsList = JSON.parse(JSON.stringify(res));
     
     this.reformatTimeStamp();

      //sort it by time 
      this.transactionsList.sort(function(a, b) {
        // convert date object into number to resolve issue in typescript
        return  +new Date(a.timeStamp) - +new Date(b.timeStamp);
      });
      this.getBuyerNames();
      this.getSellerNames();


      this.dataSource=new MatTableDataSource(this.transactionsList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;


      this. displayedColumns = ['timeStamp', 'buyer', 'seller', 'electricityQuantity', 'unitElectricityPrice', 'totalPrice'];



     
   });
  };

  reformatTimeStamp(){
    this.transactionsList.forEach(e => {
      let T = /T/gi;
      this.replacedTime = e.timeStamp.replace(T, " ");
      console.log ("replaced Time: ", this.replacedTime);
      let splicedTime = this.replacedTime.slice(0, -8) 
      console.log ("spliced Time: ", splicedTime);
      e.timeStamp = splicedTime;
    })
    this.transactionsList = [...this.transactionsList];
    console.log("done reformatting time: ", this.transactionsList);
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
  console.log("isloading is now: ", this.isLoading);
}



  

 

  
}

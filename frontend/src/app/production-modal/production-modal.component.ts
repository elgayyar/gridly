import { Component, OnInit, ViewChild} from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-production-modal',
  templateUrl: './production-modal.component.html',
  styleUrls: ['./production-modal.component.css']
})
export class ProductionModalComponent implements OnInit {
  co2Savings = "28 kg";
  dollarSavings = "$15.12";
  userProfile;  
  topBuyers = [];
  rawData
  totalQuantity
  monthHistory = []
  topBuyersData;

  //for recent transactions
  transactionsList = []
  dataSource
  displayedColumns = ['timeStamp','buyer','totalPrice'];
  @ViewChild(MatSort) sort: MatSort;
  replacedTime
  buyerFirstName;
  buyerLastName;
  buyerName;



  
  constructor(private transactionService: TransactionsService) { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    
    //for top 3 buyers
    this.getTransactionData();

    //for recent 5 transactions
    this.transactionService.getSellerTransactions(this.userProfile.email,).subscribe(res => {
      console.log("transaction service, getBuyerTransactions returned: ", res);
      this.transactionsList = JSON.parse(JSON.stringify(res));
      this.reformatTimeStamp();

      this.transactionsList.sort(function(a, b) {
        // convert date object into number to resolve issue in typescript
        return  +new Date(b.timeStamp) - +new Date(a.timeStamp);
      });
      console.log("sorted by time : ", this.transactionsList);

      this.transactionsList=this.transactionsList.slice(0,5);
      console.log("most recent 5 transactions ", this.transactionsList);

      this.dataSource=new MatTableDataSource(this.transactionsList);
      this.dataSource.sort = this.sort;
      this.getBuyerNamesLeo();
      this.displayedColumns = ['timeStamp','buyer','totalPrice'];

    });
  }
  
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
  
  getBuyerNamesLeo(){
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
      })
      //this.updateDataSource();
    });
  }

  getTransactionData(){
    this.transactionService.getBuyerTransactions(this.userProfile.email).subscribe(res => {
      console.log("transaction service, getBuyerTransactions returned: ", res);
      this.rawData = res;
      this.getProductionHistoryByDay();
      this.getBuyerNames();
    });
  }
  
  getBuyerNames(){
    this.rawData.forEach(e => {
      let buyerEmail = e.buyer.slice(34);
      console.log("buyerEmail: ", buyerEmail);
    });
    this.getTopBuyers();
  }

  getTopBuyers(){
    var topBuyersList = [];
    for(let i = 0; i < this.rawData.length; i++){
      var found = false;
      for(let j =0; j < topBuyersList.length; j++)
      {
        if(topBuyersList[j].name == this.rawData[i].buyer.slice(this.rawData[i].buyer.indexOf('#')+1)){
          console.log('ADDING');
          topBuyersList[j].totalProduced += this.rawData[i].electricityQuantity;
          var found = true;
          break;
        }
      }
      if(found){
        continue;
      }
      let s = { name: this.rawData[i].buyer.slice(this.rawData[i].buyer.indexOf('#')+1), totalProduced: this.rawData[i].electricityQuantity }
      topBuyersList.push(s);
      }
    
    this.topBuyersData = topBuyersList
    this.topBuyersData.sort((a,b) => (b.totalProduced - a.totalProduced));
    console.log("TOP BuyerS: ", this.topBuyersData)
    
    this.topBuyersData.forEach(e => {
      console.log(e.name);
      this.transactionService.getBuyerProfile(e.name).subscribe(res =>{
        let buyer = JSON.parse(JSON.stringify(res));
        console.log(buyer);
        var buyerFirstName = buyer[0].fname;
        var buyerLastName = buyer[0].lname;
        var buyerName = buyerFirstName + " " + buyerLastName;
        console.log("buyername: ", buyerName);
        e.name = buyerName;
    });
    })
    this.topBuyersData = [...this.topBuyersData];
  
    console.log("TOP BuyerS: ", this.topBuyersData)
    var context = this;
    setTimeout(function(){
      context.topBuyers = [ 
        {
          "name": context.topBuyersData[0].name,
          "value": context.topBuyersData[0].totalProduced
        },
        {
          "name": context.topBuyersData[1].name,
          "value": context.topBuyersData[1].totalProduced
        },
        {
          "name": "All Others",
          "value": context.totalQuantity
        }
      ];
    }, 1000);
  }

  getProductionHistoryByDay(){
    this.totalQuantity = 0;
    var x = Date.now();
    x = x - (30 * 24 * 60 * 60 * 1000);
    //PUT THIS OUTSIDE
    this.monthHistory = [];
    console.log("MONTH HISTORY: ", this.monthHistory); 
    for(var i =0; i< 30; i++){
      x += 24*60*60*1000;
      var y = new Date(x);
      var day = y.getDate();
      var month = y.getMonth()+1;
      var year = y.getFullYear();
      date = year.toString()+"-"+month.toString()+"-"+day.toString();
      var daySummary = {date: date, quantity: 0 };
      this.monthHistory.push(daySummary);
  }
  for(var k=0; k<this.rawData.length;k++){
      var tempDate = new Date(this.rawData[k].timeStamp);
      var date = tempDate.getFullYear().toString()+'-' + (tempDate.getMonth()+1).toString() + '-'+tempDate.getDate().toString();
      this.totalQuantity += this.rawData[k].electricityQuantity;
      for (var j =0; j < this.monthHistory.length; j++){
          if(date == this.monthHistory[j].date){
            this.monthHistory[j].quantity += this.rawData[k].electricityQuantity;
          }
      }
  }
}
//========================UI and Graph Stuff==================================
// data goes here
/*********************************************** Cards  ***************************************************/
cardview: any[] = [100, 50];
red = {
  domain: ['#B00F3B']
};
grey = {
  domain: ['#373B46']
};

public co2Data = [
  {
    "name": "in CO2 emissions reduction",
    "value": this.co2Savings
  },
];

public dollarData = [
  {
    "name": "in savings",
    "value": this.dollarSavings
  },
];

/*********************************************** Production Pie Chart ************************************/
//Dummy data


/*********************************************** Top Friends Pie Chart  ************************************/
topBuyersView: any[] = [500, 300];

view: any[] = [500, 300];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Consumption (kWh)';
  timeline = true;

  colorScheme = {
    domain: ['#B00F3B', '#373B46', '#003366']
  };

  // line, area
  autoScale = true;
  legend = false;

  //pie
  showLabels = true;
  explodeSlices = false;
  doughnut = true;
  title = "Electricity Provider Breakdown";

}

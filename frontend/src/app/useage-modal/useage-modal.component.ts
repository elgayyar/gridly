import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-useage-modal',
  templateUrl: './useage-modal.component.html',
  styleUrls: ['./useage-modal.component.css']
})
export class UseageModalComponent implements OnInit {

  userProfile;
  rawData;
  topSellers = [];
  monthHistory = [];
  totalQuantity;





  constructor(private transactionService: TransactionsService) { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    this.getTransactionData();
  }

getTransactionData(){
  this.transactionService.getBuyerTransactions(this.userProfile.email,).subscribe(res => {
    console.log("transaction service, getBuyerTransactions returned: ", res);
    this.rawData = res;

  });
}




getTopSellers(){
  this.rawData.forEach(e => {
    let buyerEmail = e.buyer.slice(34);
    console.log("buyerEmail: ", buyerEmail);
    for(let i = 0; i++; i < this.topSellers.length){
      if (this.topSellers[i].email == buyerEmail){
        this.topSellers[i].totalSold += e.electricityQuantity;
      } else {
        let s = { email: buyerEmail, totalSold: e.electricityQuantity }
        this.topSellers.push(s);
      }
    }
  });
  this.topSellers.sort((a,b) => (a.totalSold - b.totalSold));
  console.log("TOP SELLERS: ", this.topSellers)
}

getConsumptionHistoryByDay(){
  this.totalQuantity = 0;
  var x = Date.now();
  x = x - (30 * 24 * 60 * 60 * 1000);
  //PUT THIS OUTSIDE
  this.monthHistory = [];
  for(var i =0; i< 30; i++){
    x += 24*60*60*1000;
    var y = new Date(x);
    var day = y.getDate();
    var month = y.getMonth()+1;
    var year = y.getFullYear();
    date = year.toString()+"-"+month.toString()+"-"+day.toString();
    var daySummary = new Object();
    daySummary.date = date;
    daySummary.quantity = 0;
    console.log(daySummary);
    this.monthHistory.push(daySummary);
}

for(var k=0; k<this.rawData.length;k++){
    var tempDate = new Date(this.rawData[i].timeStamp);
    var date = tempDate.getFullYear().toString()+'-' + (tempDate.getMonth()+1).toString() + '-'+tempDate.getDate().toString();
    this.totalQuantity += this.rawData[i].electricityQuantity;
    for (var j =0; j < this.monthHistory.length; j++){
        if(date == this.monthHistory[j].date){
          this.monthHistory[j].quantity += this.rawData[i].electricityQuantity;
        }
    }
}

}

  //========================UI and Graph Stuff==================================
// data goes here
public pie = [
  {
    "name": "London Hydro",
    "value": 80
  },
  {
    "name": "Gridly Peers",
    "value": 30
  },
];

public card = [
  {
    "name": "Avg. Monthly Useage (kWh)",
    "value": 80
  },
  {
    "name": "Avg Daily Useage (kWh)",
    "value": 2.89
  },
  {
    "name": "Monthly Savings",
    "value": 8.45
  },
];

public consumption = [
  {
    "name": "Consumption",
    "series": [
      {
        "name": "Monday",
        "value": 12.
      },
      {
        "name": "Tuesday",
        "value": 11.7
      },
      {
        "name": "Wednesday",
        "value": 9.8
      },
      {
        "name": "Thursday",
        "value": 10.3
      },
      {
        "name": "Friday",
        "value": 14.5
      },
      {
        "name": "Saturday",
        "value": 10.6
      },
      {
        "name": "Sunday",
        "value": 6.7
      }
    ]
  },
];


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

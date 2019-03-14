import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-useage-modal',
  templateUrl: './useage-modal.component.html',
  styleUrls: ['./useage-modal.component.css']
})
export class UseageModalComponent implements OnInit {
  co2Savings = "23 kg";
  dollarSavings = "$14.32";

  userProfile;
  rawData;
  topSellersData = [];
  monthHistory = [];
  totalQuantity;

  public topSellers = [  ];
  public consumption = [  ];


  constructor(private transactionService: TransactionsService) { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    this.getTransactionData();
  }

getTransactionData(){
  this.transactionService.getBuyerTransactions(this.userProfile.email,).subscribe(res => {
    console.log("transaction service, getBuyerTransactions returned: ", res);
    this.rawData = res;
    this.getConsumptionHistoryByDay();
    this.getSellerNames();
  });
}

getSellerNames(){
  this.rawData.forEach(e => {
    let sellerEmail = e.seller.slice(34);
    console.log("sellerEmail: ", sellerEmail);
  });
  this.getTopSellers();
}

getTopSellers(){
  var topSellersList = [];
  for(let i = 0; i < this.rawData.length; i++){
    var found = false;
    for(let j =0; j < topSellersList.length; j++)
    {
      if(topSellersList[j].name == this.rawData[i].seller.slice(this.rawData[i].seller.indexOf('#')+1)){
        console.log('ADDING');
        topSellersList[j].totalSold += this.rawData[i].electricityQuantity;
        var found = true;
        break;
      }
    }
    if(found){
      continue;
    }
    let s = { name: this.rawData[i].seller.slice(this.rawData[i].seller.indexOf('#')+1), totalSold: this.rawData[i].electricityQuantity }
    topSellersList.push(s);
    }
  
  this.topSellersData = topSellersList
  this.topSellersData.sort((a,b) => (b.totalSold - a.totalSold));
  console.log("TOP SELLERS: ", this.topSellersData)
  
  this.topSellersData.forEach(e => {
    console.log(e.name);
    this.transactionService.getSellerProfile(e.name).subscribe(res =>{
      let seller = JSON.parse(JSON.stringify(res));
      console.log(seller);
      var sellerFirstName = seller[0].fname;
      var sellerLastName = seller[0].lname;
      var sellerName = sellerFirstName + " " + sellerLastName;
      console.log("sellername: ", sellerName);
      e.name = sellerName;
  });
  })
  this.topSellersData = [...this.topSellersData];

  console.log("TOP SELLERS: ", this.topSellersData)
  var context = this;
  setTimeout(function(){
    context.topSellers = [ 
      {
        "name": context.topSellersData[0].name,
        "value": context.topSellersData[0].totalSold
      },
      {
        "name": context.topSellersData[1].name,
        "value": context.topSellersData[1].totalSold
      },
      {
        "name": "All Others",
        "value": context.totalQuantity
      }
    ];
  }, 1000);
}



getConsumptionHistoryByDay(){
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

this.consumption = [
  {
    "name": "Consumption",
    "series": [
      {
        "name": this.monthHistory[24].date,
        "value": this.monthHistory[24].quantity
      },
      {
        "name": this.monthHistory[25].date,
        "value": this.monthHistory[25].quantity
      },
      {
        "name": this.monthHistory[26].date,
        "value": this.monthHistory[26].quantity
      },
      {
        "name": this.monthHistory[27].date,
        "value": this.monthHistory[27].quantity
      },
      {
        "name": this.monthHistory[28].date,
        "value": this.monthHistory[28].quantity
      },
      {
        "name": this.monthHistory[29].date,
        "value": this.monthHistory[29].quantity
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
  }
]

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

/*********************************************** Top Friends Pie Chart  ************************************/
topSellersView: any[] = [500, 300];



/*********************************************** Breakdown Pie Chart  ************************************/
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

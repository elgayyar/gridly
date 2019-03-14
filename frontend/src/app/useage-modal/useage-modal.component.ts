import { Component, OnInit, ViewChild} from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

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

  //for recent transactions
  transactionsList: any[] = [];
  displayedColumns: string[] = ['timeStamp','seller','totalPrice'];
  replacedTime;
  sellerFirstName;
  sellerLastName;
  sellerName;
  @ViewChild(MatSort) sort: MatSort;
  dataSource




  constructor(private transactionService: TransactionsService) { }

  ngOnInit() {
    this.monthHistory = [];
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    
    //for top 3 buyers
    this.getTransactionData();
    
    //for recent 5 transactions
    this.transactionService.getBuyerTransactions(this.userProfile.email,).subscribe(res => {
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
      this.getSellerNamesLeo();
      this.displayedColumns = ['timeStamp','seller','totalPrice'];

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

getSellerNamesLeo(){
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
        "value": context.topSellersData[1].totalSold
      },
      {
        "name": context.topSellersData[1].name,
        "value": context.topSellersData[1].totalSold
      },
      {
        "name": "All Others",
        "value": (context.totalQuantity-context.topSellersData[1].totalSold-context.topSellersData[1].totalSold)
      }
    ];
  }, 1500);
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
        "name": this.monthHistory[0].date,
        "value": this.monthHistory[0].quantity
      },
      {
        "name": this.monthHistory[1].date,
        "value": this.monthHistory[1].quantity
      },
      {
        "name": this.monthHistory[2].date,
        "value": this.monthHistory[2].quantity
      },
      {
        "name": this.monthHistory[3].date,
        "value": this.monthHistory[3].quantity
      },
      {
        "name": this.monthHistory[4].date,
        "value": this.monthHistory[4].quantity
      },
      {
        "name": this.monthHistory[5].date,
        "value": this.monthHistory[5].quantity
      },
      {
        "name": this.monthHistory[6].date,
        "value": this.monthHistory[6].quantity
      },
      {
        "name": this.monthHistory[7].date,
        "value": this.monthHistory[7].quantity
      },
      {
        "name": this.monthHistory[8].date,
        "value": this.monthHistory[8].quantity
      },
      {
        "name": this.monthHistory[9].date,
        "value": this.monthHistory[9].quantity
      },
      {
        "name": this.monthHistory[10].date,
        "value": this.monthHistory[10].quantity
      },
      {
        "name": this.monthHistory[11].date,
        "value": this.monthHistory[11].quantity
      },
      {
        "name": this.monthHistory[12].date,
        "value": this.monthHistory[12].quantity
      },
      {
        "name": this.monthHistory[13].date,
        "value": this.monthHistory[13].quantity
      },
      {
        "name": this.monthHistory[14].date,
        "value": this.monthHistory[14].quantity
      },
      {
        "name": this.monthHistory[15].date,
        "value": this.monthHistory[15].quantity
      },
      {
        "name": this.monthHistory[16].date,
        "value": this.monthHistory[16].quantity
      },
      {
        "name": this.monthHistory[17].date,
        "value": this.monthHistory[17].quantity
      },
      {
        "name": this.monthHistory[18].date,
        "value": this.monthHistory[18].quantity
      },
      {
        "name": this.monthHistory[19].date,
        "value": this.monthHistory[19].quantity
      },
      {
        "name": this.monthHistory[20].date,
        "value": this.monthHistory[20].quantity
      },
      {
        "name": this.monthHistory[21].date,
        "value": this.monthHistory[21].quantity
      },
      {
        "name": this.monthHistory[22].date,
        "value": this.monthHistory[22].quantity
      },
      {
        "name": this.monthHistory[23].date,
        "value": this.monthHistory[23].quantity
      },
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
    "value": 20
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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-production-modal',
  templateUrl: './production-modal.component.html',
  styleUrls: ['./production-modal.component.css']
})
export class ProductionModalComponent implements OnInit {
  co2Savings = "28 kg";
  dollarSavings = "$15.12";
  userProfile;  
  topBuyers = []

  
  constructor() { }

  ngOnInit() {
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

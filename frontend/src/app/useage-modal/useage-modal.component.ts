import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-useage-modal',
  templateUrl: './useage-modal.component.html',
  styleUrls: ['./useage-modal.component.css']
})
export class UseageModalComponent implements OnInit {

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

public multi = [
  {
    "name": "Consumption",
    "series": [
      {
        "name": "January",
        "value": 730
      },
      {
        "name": "February",
        "value": 894
      },
      {
        "name": "March",
        "value": 450
      },
      {
        "name": "April",
        "value": 694
      },
      {
        "name": "May",
        "value": 567
      },
      {
        "name": "June",
        "value": 776
      },
      {
        "name": "July",
        "value": 890
      },
      {
        "name": "August",
        "value": 657
      },
      {
        "name": "September",
        "value": 476
      },
      {
        "name": "October",
        "value": 324
      },
      {
        "name": "November",
        "value": 675
      },
      {
        "name": "December",
        "value": 812
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


  constructor() { }

  ngOnInit() {
  }

}

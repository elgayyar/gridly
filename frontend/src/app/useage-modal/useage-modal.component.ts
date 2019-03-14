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


  constructor() { }

  ngOnInit() {
  }

}

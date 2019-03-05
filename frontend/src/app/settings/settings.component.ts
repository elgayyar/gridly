import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public multi = [
    {
      "name": "London Hydro Prices",
      "series": [
        {
          "name": "12am",
          "value": 10
        },
        {
          "name": "1am",
          "value": 10
        },
        {
          "name": "2am",
          "value": 10
        },
        {
          "name": "3am",
          "value": 10
        },
        {
          "name": "4am",
          "value": 10
        },
        {
          "name": "5am",
          "value": 10
        },
        {
          "name": "6am",
          "value": 18
        },
        {
          "name": "7am",
          "value": 18
        },
        {
          "name": "8am",
          "value": 18
        },
        {
          "name": "9am",
          "value": 18
        },
        {
          "name": "10am",
          "value": 18
        },
        {
          "name": "11am",
          "value": 18
        },
      {
        "name": "12am",
        "value": 10
      },
      {
        "name": "1pm",
        "value": 12
      },
      {
        "name": "2pm",
        "value": 12
      },
      {
        "name": "3pm",
        "value": 12
      },
      {
        "name": "4pm",
        "value": 12
      },
      {
        "name": "5pm",
        "value": 25
      },
      {
        "name": "6pm",
        "value": 25
      },
      {
        "name": "7pm",
        "value": 25
      },
      {
        "name": "8pm",
        "value": 8
      },
      {
        "name": "9pm",
        "value": 8
      },
      {
        "name": "10pm",
        "value": 8
      },
      {
        "name": "11pm",
        "value": 8
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
    xAxisLabel = 'Hour';
    showYAxisLabel = true;
    yAxisLabel = 'Price/(kWh)';
    timeline = true;
  
    colorScheme = {
      domain: ['#B00F3B', '#373B46', '#003366']
    };
  
    // line, area
    autoScale = true;
    legend = false;

  constructor() { }

  ngOnInit() {
  }

}

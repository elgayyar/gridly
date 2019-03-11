import { Component, OnInit } from '@angular/core';

var onPeak = 13.2;
var midPeak = 9.4;
var offPeak = 6.5;

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
          "value": offPeak
        },
        {
          "name": "1am",
          "value": offPeak
        },
        {
          "name": "2am",
          "value": offPeak
        },
        {
          "name": "3am",
          "value": offPeak
        },
        {
          "name": "4am",
          "value": offPeak
        },
        {
          "name": "5am",
          "value": offPeak
        },
        {
          "name": "6am",
          "value": offPeak
        },
        {
          "name": "7am",
          "value": offPeak
        },
        {
          "name": "7am",
          "value": onPeak
        },
        {
          "name": "8am",
          "value": onPeak
        },
        {
          "name": "9am",
          "value": onPeak
        },
        {
          "name": "10am",
          "value": onPeak
        },
        {
          "name": "11am",
          "value": onPeak
        },
        {
          "name": "11am",
          "value": midPeak
        },
      {
        "name": "12pm",
        "value": midPeak
      },
      {
        "name": "1pm",
        "value": midPeak
      },
      {
        "name": "2pm",
        "value": midPeak
      },
      {
        "name": "3pm",
        "value": midPeak
      },
      {
        "name": "4pm",
        "value": midPeak
      },
      {
        "name": "5pm",
        "value": midPeak
      },
      {
        "name": "5pm",
        "value": onPeak
      },
      {
        "name": "6pm",
        "value": onPeak
      },
      {
        "name": "7pm",
        "value": onPeak
      },
      {
        "name": "7pm",
        "value": offPeak
      },
      {
        "name": "8pm",
        "value": offPeak
      },
      {
        "name": "9pm",
        "value": offPeak
      },
      {
        "name": "10pm",
        "value": offPeak
      },
      {
        "name": "11pm",
        "value": offPeak
      }
      ]
    },
  ];
  
  
    view: any[] = [800, 300];
  
    // options for the chart
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Time of Day';
    showYAxisLabel = true;
    yAxisLabel = 'cents/(kWh)';
    timeline = true;
  
    colorScheme = {
      domain: ['#B00F3B', '#373B46', '#003366']
    };
  
    // line, area
    autoScale = false;
    legend = true;

  constructor() { }

  ngOnInit() {
  }

}

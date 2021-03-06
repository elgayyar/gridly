import { Component, OnInit } from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTooltipModule, MatSnackBar}  from '@angular/material';
import { TradeService } from '../services/trade.service';

declare var $: any;


var onPeak = .132;
var midPeak = .094;
var offPeak = .065;

@Component({
  selector: 'app-buyer-settings',
  templateUrl: './buyer-settings.component.html',
  styleUrls: ['./buyer-settings.component.css']
})
export class BuyerSettingsComponent implements OnInit {
  userProfile;
  disabled = true;
  loading = false;
  userOffPeakPrice = 0;
  userMidPeakPrice = 0;
  userPeakPrice = 0;
  //Slider varibles
  autoTicks = true;
  graphDisabled = false;
  invert = false;
  max = 50;
  min = 0;
  showTicks = false;
  step = 0.1;
  thumbLabel = true;
  value = 10;
  vertical = true;

  constructor(private registerService: RegisterService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
    console.log(this.userProfile);
    this.value = this.userProfile.maxPurchasePrice;
  }

   //********************************** London Hydro Pricing Card ********************************* */

   
   get tickInterval(): number | 'auto' {
     return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
   }
   set tickInterval(value) {
     this._tickInterval = coerceNumberProperty(value);
   }
   private _tickInterval = 1;
 
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
     {
       "name": "Your Prices",
       "series": [
         {
           "name": "12am",
           "value": this.userOffPeakPrice
         },
         {
           "name": "1am",
           "value": this.userOffPeakPrice
         },
         {
           "name": "2am",
           "value": this.userOffPeakPrice
         },
         {
           "name": "3am",
           "value": this.userOffPeakPrice
         },
         {
           "name": "4am",
           "value": this.userOffPeakPrice
         },
         {
           "name": "5am",
           "value": this.userOffPeakPrice
         },
         {
           "name": "6am",
           "value": this.userOffPeakPrice
         },
         {
           "name": "7am",
           "value": this.userOffPeakPrice
         },
         {
           "name": "7am",
           "value": this.userPeakPrice
         },
         {
           "name": "8am",
           "value": this.userPeakPrice
         },
         {
           "name": "9am",
           "value": this.userPeakPrice
         },
         {
           "name": "10am",
           "value": this.userPeakPrice
         },
         {
           "name": "11am",
           "value": this.userPeakPrice
         },
         {
           "name": "11am",
           "value": this.userMidPeakPrice
         },
       {
         "name": "12pm",
         "value": this.userMidPeakPrice
       },
       {
         "name": "1pm",
         "value": this.userMidPeakPrice
       },
       {
         "name": "2pm",
         "value": this.userMidPeakPrice
       },
       {
         "name": "3pm",
         "value": this.userMidPeakPrice
       },
       {
         "name": "4pm",
         "value": this.userMidPeakPrice
       },
       {
         "name": "5pm",
         "value": this.userMidPeakPrice
       },
       {
         "name": "5pm",
         "value": this.userPeakPrice
       },
       {
         "name": "6pm",
         "value": this.userPeakPrice
       },
       {
         "name": "7pm",
         "value": this.userPeakPrice
       },
       {
         "name": "7pm",
         "value": this.userOffPeakPrice
       },
       {
         "name": "8pm",
         "value": this.userOffPeakPrice
       },
       {
         "name": "9pm",
         "value": this.userOffPeakPrice
       },
       {
         "name": "10pm",
         "value": this.userOffPeakPrice
       },
       {
         "name": "11pm",
         "value": this.userOffPeakPrice
       }
       ]
     }
   ];
 
     view: any[] = [700, 350];
   
     // options for the chart
     showXAxis = true;
     showYAxis = true;
     gradient = false;
     showLegend = false;
     showXAxisLabel = true;
     xAxisLabel = 'Time of Day';
     showYAxisLabel = true;
     yAxisLabel = '$ / (kWh)';
     timeline = true;
     activeEntries = [{"name": "7pm"}];
     showRefLines = false;
   
     colorScheme = {
       domain: ['#B00F3B', '#373B46', '#003366']
     };
   
     // line, area
     autoScale = false;
     legend = true;


     /******************************************** Buy Settings Card *******************************************************/
       //Make profile fields accesible
  editBuySettings() {
    console.log("Edit buy settings clicked");
    this.disabled = false;
  }

  //Cancel changes to profile
  cancel() {
    this.disabled = true;
    this.loading = false;
  }

  //Save the new new price
  saveBuySettings() {
    console.log("Save buy settings pressed");
    this.disabled = true;
    //Set the max purchase price to the peak price for the demo
    this.userProfile.maxPurchasePrice = this.userPeakPrice;
    console.log("Before", this.userProfile);
    //Update the users profile in HYPERLEDGER
    this.registerService.updateConsumer(this.userProfile, this.userProfile.email).subscribe(
      res => {
        console.log(res);
        this.userProfile = res;
        console.log("After", this.userProfile);
        localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));
        //Display a success notification
        $('#save').modal('hide');
        this.updateGraph();
        this.snackBar.open("Success: Settings updated!");
        setTimeout( () => { 
          this.snackBar.dismiss();
        }, 2000 );
        this.disabled = true;
        this.loading = false;
      },
      error => {
        console.log("Error response from hyperledger");
        //Display a success notification
        $('#save').modal('hide');
        this.snackBar.open("Error: Failed to update! Please try again!");
        setTimeout( () => { 
          this.snackBar.dismiss();
        }, 2000 );
        this.disabled = true;
        this.loading = false;
      });
  }

  //Snackbar for notifications
  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  //Update the graph data
  updateGraph() {
    this.multi = [
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
      {
        "name": "Your Prices",
        "series": [
          {
            "name": "12am",
            "value": this.userOffPeakPrice
          },
          {
            "name": "1am",
            "value": this.userOffPeakPrice
          },
          {
            "name": "2am",
            "value": this.userOffPeakPrice
          },
          {
            "name": "3am",
            "value": this.userOffPeakPrice
          },
          {
            "name": "4am",
            "value": this.userOffPeakPrice
          },
          {
            "name": "5am",
            "value": this.userOffPeakPrice
          },
          {
            "name": "6am",
            "value": this.userOffPeakPrice
          },
          {
            "name": "7am",
            "value": this.userOffPeakPrice
          },
          {
            "name": "7am",
            "value": this.userPeakPrice
          },
          {
            "name": "8am",
            "value": this.userPeakPrice
          },
          {
            "name": "9am",
            "value": this.userPeakPrice
          },
          {
            "name": "10am",
            "value": this.userPeakPrice
          },
          {
            "name": "11am",
            "value": this.userPeakPrice
          },
          {
            "name": "11am",
            "value": this.userMidPeakPrice
          },
        {
          "name": "12pm",
          "value": this.userMidPeakPrice
        },
        {
          "name": "1pm",
          "value": this.userMidPeakPrice
        },
        {
          "name": "2pm",
          "value": this.userMidPeakPrice
        },
        {
          "name": "3pm",
          "value": this.userMidPeakPrice
        },
        {
          "name": "4pm",
          "value": this.userMidPeakPrice
        },
        {
          "name": "5pm",
          "value": this.userMidPeakPrice
        },
        {
          "name": "5pm",
          "value": this.userPeakPrice
        },
        {
          "name": "6pm",
          "value": this.userPeakPrice
        },
        {
          "name": "7pm",
          "value": this.userPeakPrice
        },
        {
          "name": "7pm",
          "value": this.userOffPeakPrice
        },
        {
          "name": "8pm",
          "value": this.userOffPeakPrice
        },
        {
          "name": "9pm",
          "value": this.userOffPeakPrice
        },
        {
          "name": "10pm",
          "value": this.userOffPeakPrice
        },
        {
          "name": "11pm",
          "value": this.userOffPeakPrice
        }
        ]
      }
    ];
  }

}

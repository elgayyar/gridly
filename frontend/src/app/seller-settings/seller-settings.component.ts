import { Component, OnInit } from '@angular/core';
import {coerceNumberProperty} from '@angular/cdk/coercion';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar}  from '@angular/material';
import { TradeService } from '../services/trade.service';


declare var $: any;

var onPeak = 13.2;
var midPeak = 9.4;
var offPeak = 6.5;

@Component({
  selector: 'app-seller-settings',
  templateUrl: './seller-settings.component.html',
  styleUrls: ['./seller-settings.component.css']
})
export class SellerSettingsComponent implements OnInit {
  userProfile;
  loading = false;
  disabled = true;
  findBattery = false;
  serialNumber;
  manufacturer;
  model;
  maxCapacity;
  currentCapacity;
  quantity = 0;
  consumers;
  availableConsumers =[];
  selectedConsumer;

constructor(private authService: AuthService,
    private registerService: RegisterService,
    private tradeService: TradeService,
    private snackBar: MatSnackBar) { }

ngOnInit() {
this.consumers = [];
this.userProfile = JSON.parse(localStorage.getItem("activeProfile"));
if(this.userProfile.battery){
  this.serialNumber = this.userProfile.battery.serialNo;
  this.manufacturer = this.userProfile.battery.manufacturer;
  this.model = this.userProfile.battery.model;
  this.maxCapacity = this.userProfile.battery.maxCapacity;
  this.currentCapacity = this.userProfile.battery.currentCapacity;
}
console.log(this.userProfile);
this.tradeService.getAllConsumers().subscribe(
  res => {
    this.consumers = res;
    console.log('CONSUMERS: ',this.consumers);
    this.sortAvailableConsumers();
  },
  error => {
    console.log("Error response from hyperledger");
  });
}

sortAvailableConsumers(){
  this.availableConsumers = [];
  for(let i = 0; i < this.consumers.length; i++){
    console.log(this.userProfile.minSellingPrice);
    console.log(this.consumers[i].maxPurchasePrice);
    if(this.consumers[i].maxPurchasePrice >= this.userProfile.minSellingPrice){
      console.log('FOUND ONE');
      if(this.userProfile.friends.includes("resource:gridly.user.User#"+this.consumers[i].email)){
        // This could mess stuff up!!!!
        this.consumers[i].isFriend = true;
      }
      this.availableConsumers.push(this.consumers[i]);
    }
  }
  this.availableConsumers.sort(function(x,y){ return x.isFriend == true ? -1 : y.isFriend && !x.isFriend == true ? 1 : 0; });
  console.log('AVAILABLE CONSUMERS:', this.availableConsumers)
}

arrayRemove(arr, value) {
  return arr.filter(function(ele){
      return ele != value;
  });
}

postTrade(){
  //Hide the trade form modal and show the validating trade modal
  $('#sellElectricity').modal('hide');
  //$('#trading').modal('show');
  let date = new Date(Date.now());
  let dateString = date.toISOString();
  if(this.quantity<=0){
    console.log("You cannot have a negative value!");
  }
  else{
    const txn = {
      "$class": "gridly.trade.Trade",
      "unitElectricityPrice": Number(this.userProfile.minSellingPrice),
      "electricityQuantity": Number(this.quantity),
      "totalPrice": Number(this.userProfile.minSellingPrice * this.quantity),
      "buyer": "resource:gridly.consumer.Consumer#" + this.selectedConsumer.email,
      "seller": "resource:gridly.producer.Producer#" + this.userProfile.email,
      "timeStamp": dateString
    }
  
    this.tradeService.postTrade(txn).subscribe(
      res => {
        console.log("Response from fabric:");
        console.log(res);
        //Show the spinner for 1.5 seconds
        /*
        setTimeout( () => { 
          $('#trading').modal('hide');
        }, 1500 );
        */  
        //Show a notifcation
        this.snackBar.open("Success: Sell order complete!");    
        setTimeout( () => { 
          this.snackBar.dismiss();
        }, 1500 );
      },
      error => {
        console.log("Error response from hyperledger: ", error);
        /*
        setTimeout( () => { 
          $('#trading').modal('hide');
        }, 1500 );  
        */
        //Show a notifcation
        this.snackBar.open("Failure: Unable to process! Please try again.");   
        setTimeout( () => { 
          this.snackBar.dismiss();
        }, 1500);   
      });
  }
}

selectBuyer(b){
  console.log("clicked", b)
  this.selectedConsumer = b;
}






  //********************************** London Hydro Pricing Card ********************************* */
  autoTicks = true;
  graphDisabled = false;
  invert = false;
  max = 20;
  min = 0;
  showTicks = false;
  step = 0.1;
  thumbLabel = true;
  value = onPeak;
  vertical = false;
  
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
    } /*,
    {
      "name": "Your Prices",
      "series": [
        {
          "name": "12am",
          "value": offPeak + this.value
        },
        {
          "name": "1am",
          "value": offPeak + this.value
        },
        {
          "name": "2am",
          "value": offPeak + this.value
        },
        {
          "name": "3am",
          "value": offPeak + this.value
        },
        {
          "name": "4am",
          "value": offPeak + this.value
        },
        {
          "name": "5am",
          "value": offPeak + this.value
        },
        {
          "name": "6am",
          "value": offPeak + this.value
        },
        {
          "name": "7am",
          "value": offPeak + this.value
        },
        {
          "name": "7am",
          "value": onPeak + this.value
        },
        {
          "name": "8am",
          "value": onPeak + this.value
        },
        {
          "name": "9am",
          "value": onPeak + this.value
        },
        {
          "name": "10am",
          "value": onPeak + this.value
        },
        {
          "name": "11am",
          "value": onPeak + this.value
        },
        {
          "name": "11am",
          "value": midPeak + this.value
        },
      {
        "name": "12pm",
        "value": midPeak + this.value
      },
      {
        "name": "1pm",
        "value": midPeak + this.value
      },
      {
        "name": "2pm",
        "value": midPeak + this.value
      },
      {
        "name": "3pm",
        "value": midPeak + this.value
      },
      {
        "name": "4pm",
        "value": midPeak + this.value
      },
      {
        "name": "5pm",
        "value": midPeak + this.value
      },
      {
        "name": "5pm",
        "value": onPeak + this.value
      },
      {
        "name": "6pm",
        "value": onPeak + this.value
      },
      {
        "name": "7pm",
        "value": onPeak + this.value
      },
      {
        "name": "7pm",
        "value": offPeak + this.value
      },
      {
        "name": "8pm",
        "value": offPeak + this.value
      },
      {
        "name": "9pm",
        "value": offPeak + this.value
      },
      {
        "name": "10pm",
        "value": offPeak + this.value
      },
      {
        "name": "11pm",
        "value": offPeak + this.value
      }
      ]
    } */
  ];

    view: any[] = [600, 300];
  
    // options for the chart
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
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
    legend = false;

/****************************************************** Battery Card *******************************************************/
  //Brings up modal that seaches for a battery
  searchForBattery() {
    this.findBattery = true;
    setTimeout( () => { 
      $('#batterySearch').modal('hide');
      $('#batteryFound').modal('show');
    }, 2000 );
  }

  //Adds the battery that was selected
  addBattery() {
    $('#batteryFound').modal('hide');
    //Dummy data for UI
    this.serialNumber = "89760593203";
    this.manufacturer = "Tesla";
    this.model ="Powerwall";
    this.maxCapacity = "13.5";
    this.currentCapacity = "10";

    //Dummy data for a batery
    const batteryData = {
      "$class": "gridly.producer.Battery",
      "serialNo": "89760593203",
      "manufacturer": "Tesla",
      "model": "Powerwall",
      "maxCapacity": 150,
      "currentCapacity": 130
    }
    //Add the battery to the users profile
    this.userProfile.battery = batteryData;
    console.log(this.userProfile);    
    this.registerService.addBattery(this.userProfile, this.userProfile.email).subscribe(
      res => {
        console.log(res);
        //this.userProfile = res;
        //localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));
        //this.disabled = true;
        localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));        
        //Add a notification
        this.snackBar.open("Success: Battery added!");    
        setTimeout( () => { 
          this.snackBar.dismiss();
          //Update the battery animation
          this.setBatteryCapacity();
        }, 1500 );     
      },
      error => {
        console.log("Error response from hyperledger", error);
        //Add a notification
        this.snackBar.open("Error: Please try again!");    
        setTimeout( () => { 
          this.snackBar.dismiss();
        }, 1500 );           
      });
    }

    //Removes a battery from the users profile
    deleteBattery() {
      setTimeout( () => { 
        $('#batteryRemove').modal('hide');
      }, 1000 );
      console.log("Remove battery clicked");
      delete this.userProfile.battery;
      //this.userProfile.battery = null;
      console.log("After remove battery", this.userProfile);
      this.registerService.removeBattery(this.userProfile, this.userProfile.email).subscribe(
        res => {
          console.log(res);
          //this.userProfile = res;
          //console.log("Profile returned from HYPERLEDGER", this.userProfile)
          localStorage.setItem("activeProfile", JSON.stringify(this.userProfile));
        //Show a notifcation
        this.snackBar.open("Success: Battery removed!");    
        setTimeout( () => { 
          this.snackBar.dismiss();
        }, 1500 );          
        },
        error => {
          console.log("Error response from hyperledger", error);
          this.snackBar.open("Error: Please try again!");    
          setTimeout( () => { 
            this.snackBar.dismiss();
          }, 1500 );   
        });
    }

  //Snackbar for notifications
  openSnackBar(message: string) {
    this.snackBar.open(message);
  }

  //Update the battery power level
  setBatteryCapacity()
  {
    console.log("Setting the capacity height");
    //Calculate the battery height
    var capacity = (this.userProfile.battery.currentCapacity / this.userProfile.battery.maxCapacity) * 100;
    console.log(capacity);
    var h = 100 - capacity;
    var height = h.toString();
    console.log(height);
    $("#battery").css({
      background: "#B00F3B"
    })
    $("#battery-height").height(height + "%").css({
      background: "#F1F1F1"
    });
  }
}
